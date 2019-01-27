class Router
{
  constructor()
  {
    this.$ =
    {
      // links: document.querySelectorAll('a:not(.external)'), // Not if external link
      links: [],
      content: document.querySelector('.view'),
    }

    this.datas = 
    {
      documentTitle: document.title,
      img: []
    }

    // this.initalResponse = 
    // {
    //   DOM: this.$.content.innerHTML,
    //   title: this.datas.documentTitle
    // }

    this.cached = {}

    this.openedProjectIndex = Number

    this._listeners()
    this._checkUrl()
    // this._disabledLinks()
    // this._runController('/')
  }

  _listeners()
  {
    window.addEventListener('visibilitychange', () => { this._dontLeave() })
    window.addEventListener('popstate', (event) => { this._handlePopState(event) })
  }

  _disabledLinks()
  {
    for(let i = 0; i < this.$.links.length; i++)
    {
      this.$.links[i].addEventListener('click', (event) => { this._handleLinks(event, this.$.links[i]) })
    }
  }

  _handleLinks(_event, _link)
  {
    _event.preventDefault()

    if(_link.dataset.index) this.openedProjectIndex = _link.dataset.index
  
    const path = _link.getAttribute('href')

    this._craftAjaxDOM(path)
  }

  _checkUrl()
  {
    const pathname = window.location.pathname
    let validSrc = false
    
    for(let i = 0; i < this.$.links.length; i++)
    {
      const src = this.$.links[i].getAttribute('href')
      
      if(src == pathname)
      {
        this._craftAjaxDOM(pathname)
        validSrc = true
        
        break
      }
    }
    
    if(!validSrc) // if route go home
    {
      this._httpRequest()
    } 
  }

  _dontLeave()
  {
    document.title == 'ε(´סּ︵סּ`)з' ? document.title = this.datas.documentTitle : document.title = "ε(´סּ︵סּ`)з"
  }

  _handlePopState(_event)
  {
    if(_event.state)
    {
      document.title = _event.state.documentTitle
      document.querySelector(".view").innerHTML = _event.state.DOM

      // Update links
      this.$.links = document.querySelectorAll('a')
      this._disabledLinks()

      // Run current controller
      this._runController(_event.path[0].location.pathname)
    }
  }

  _craftAjaxDOM(_path)
  { 
    let fromPath = _path
    // Ajax request
    if(_path.includes('projects/')) fromPath = '/project'
    // this._getPage('pages' + fromPath + '.html', 'body', 'body', _path)
    this._getPage('pages' + fromPath + '.html', 'body', '.view', _path)
  }

  _pushState(_response, _path)
  {
    window.history.pushState({ DOM: _response.DOM, documentTitle: _response.title },"", _path)
  }

  _getPage(_url, _from = "body", _to = "body", _path)
  {
    let to = {}

    this._waitCursor()

    to.DOM = document.querySelector(_to)
    to.title = document.title

    if(this.cached.DOM && this.cached.url == _url)
    { 
      document.body.style.cursor = 'auto'
      to.title = this.cached.title
      to.DOM.innerHTML = this.cached.DOM 

      this._pushState(this.cached, _path)
      this._runController(_path)
    }
    else
    {
      const XHRt = new XMLHttpRequest // New ajax
  
      XHRt.responseType = 'document'  // Ajax2 context and onload() event
      XHRt.onload = () => 
      { 
        this._waitCursor(false)
  
        this.cached.DOM = to.DOM.innerHTML = XHRt.response.querySelector(_from).innerHTML
        this.cached.title = document.title = XHRt.response.querySelector('title').innerHTML
        this.cached.url = _url

        this._pushState(this.cached, _path)
        this._runController(_path)
        // this._checkUrl()
      }
      XHRt.open("GET", _url, true)
      XHRt.send()
    }
  }

  _httpRequest()
  {
    const requestURL = 'https://raw.githubusercontent.com/vtimsit/portfolio_2019/master/app/assets/datas/projects.json'
    const request = new XMLHttpRequest()

    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
      const data = request.response

      this._craftProjectsDOM(data)

      // new Router()
    }
  }

  _craftProjectsDOM(_data)
  {
    const data = _data.projects

    let count = 0
    let items = []

    const $ = 
    {
      projectsTitles: document.querySelector('.projectsTitles__list'),
      projectsTitlesItems: document.querySelectorAll('.projectsTitles__list li'),
      projectsPreviews: document.querySelector('.projectsPreviews'),
      projectItems: document.querySelectorAll('.projectsPreviews__item'),
    }

    // Remove node model
    // for(let i = 0; i < $.projectItems.length; i++)
    // {
    //   $.projectItems[i].remove()
    // }
    // for(let i = 0; i < $.projectsTitlesItems.length; i++)
    // {
    //   $.projectsTitlesItems[i].remove()
    // }

    for(let i = 0; i < data.length; i++)
    {
      document.body.style.opacity = '1'
      
      const item = {}
      
      item.node = $.projectItems[0].cloneNode(true)
      
      item.category = item.node.querySelector('.projectsPreviews__category')
      item.link = item.node.querySelector('a')
      item.img = item.link.querySelector('img')
      item.title = document.createElement('li')

      this.$.links.push(item.link)
      this.datas.img.push(item.img)

      item.category.innerText = data[i].category
      item.link.setAttribute('href', '/projects/' + this._toCamelCase(data[i].title))
      item.link.setAttribute('data-index', i)
      item.img.setAttribute('src', data[i].thumbnail)
      item.title.innerText = data[i].title

      items.push(item)

      item.img.addEventListener('load', () => 
			{
        console.log(this.datas.img.length)
        console.log('loaded ' + i)
        item.img.classList.add('loaded')
        count++
        if(this.datas.img.length == count) this._initProjects($.projectsPreviews, $.projectsTitles, $.projectItems, $.projectsTitlesItems, items, data)
      })
    }
  }

  _initProjects(_previews, _titles, _projectItems, _projectTitlesItems, _items, _data)
  {
    // Remove node model
    for(let i = 0; i < _projectItems.length; i++)
    {
      _projectItems[i].remove()
    }
    for(let i = 0; i < _projectTitlesItems.length; i++)
    {
      _projectTitlesItems[i].remove()
    }

    for(let i = 0; i < _items.length; i++)
    {
      _previews.appendChild(_items[i].node)
      _titles.appendChild(_items[i].title)
    }

    this.$.content.classList.remove('loading')
    const DOM = document.querySelector('.view').innerHTML
    const documentTitle = document.title
    
    this._disabledLinks()
    this._runController('/')
    this._pushState({ DOM: DOM, title: documentTitle }, '/')
  }

  _runController(_path = '/')
  {
    if(_path.includes('projects/')) _path = '/project'

    switch (_path) {
      case '/':
        console.log('run home controller')
        new HomeController()
        break
      case '/project':
        // console.log('run project1 controller')
        new ProjectController(this.openedProjectIndex)
        break
      case '/project2':
        // console.log('run project2 controller')
        break
      default:
        break;
    }
  }

  _cachedImage()
  {
    const images = document.querySelectorAll('img')

    this.cached.images = []

    for(let i = 0; i < images.length; i++)
    {
      const cachedImage = new Image()
      cachedImage.src = images[i].getAttribute('src')

      this.cached.images.push(cachedImage)
    }
  }

  _pullImage()
  {
    const images = document.querySelectorAll('img')

    for(let i = 0; i < images.length; i++)
    {
      images[i] = this.cached.images[i]
    }
  }

  _waitCursor(_state = true)
  {
    if(_state)
    {
      console.log('cursor wait')
      document.body.style.cursor = 'wait'
  
      for(let i = 0; i < this.$.links.length; i++)
      {
        this.$.links[i].style.cursor = 'wait'
      }
    }
    else
    {
      console.log('cursor')
      document.body.style.cursor = 'auto'
  
      for(let i = 0; i < this.$.links.length; i++)
      {
        this.$.links[i].style.cursor = 'auto'
      }
    }
  }

  _toCamelCase(_string)
  {
    return _string
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase() })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase() })
  }
}