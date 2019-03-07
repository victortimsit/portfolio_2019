class Router
{
  constructor()
  {
    this.$ =
    {
      // links: document.querySelectorAll('a:not(.external)'), // Not if external link
      links: [],
      undeletedLinks: [],
      content: document.querySelector('.container'),
      loader: document.querySelector('.loader'),
      loaderFill: document.querySelector('.loader__fill')
    }

    this.datas = 
    {
      documentTitle: document.title,
      img: []
    }

    this.params = 
    {
      loaderWidth: this.$.loader.offsetWidth,
      loaderHeight: this.$.loader.offsetHeight,
      validProjects: []
    }

    this.once = true

    this.controllers = {}
    
    this.cached = {}

    this.openedProjectIndex = Number

    this._listeners()
    // this._checkUrl()
    this._httpRequest()
  }

  _listeners()
  {
    window.addEventListener('visibilitychange', () => { this._dontLeave() })
    window.addEventListener('popstate', (event) => { this._handlePopState(event) })
    // window.addEventListener('mousemove', (event) => { this._loaderTranslate(event) })
  }

  _loaderTranslate(_event)
  {
    const mouse = { x: _event.clientX, y: _event.clientY }

    // if(this.bool.cursorActive)
    // {
    //   this.$.loader.style.transform = `translate(${mouse.x - 10}px, ${mouse.y - 10}px)`
    // } 
    // else
    // {
      this.$.loader.style.transform = `translate(${mouse.x - (this.params.loaderWidth / 2)}px, ${mouse.y - this.params.loaderHeight * 4}px)`
    // }
  }

  _disabledLinks()
  {
    this.$.links = document.querySelectorAll('a:not(.external):not(.undeleted)')
    this.$.undeletedLinks = document.querySelectorAll('.undeleted')

    console.log('DISABLED LINKS')
    console.log(this.$.links)
    console.log(this.once)

    for(let i = 0; i < this.$.links.length; i++)
    {
        // this.$.links[i].removeEventListener('click', (event) => { this._handleLinks(event, this.$.links[i])  })
        this.$.links[i].addEventListener('click', (event) => 
        { 
          console.log(this.$.links[i])
          this._handleLinks(event, this.$.links[i]) 
        })
        // REMOVE EVENT LISTENER 
    }

    for(let i = 0; i < this.$.undeletedLinks.length; i++) 
    {
      if(this.once) this.$.undeletedLinks[i].addEventListener('click', (event) => 
      { 
        this._handleLinks(event, this.$.undeletedLinks[i]) 
        this.$.undeletedLinks[i].style.transform = 'scale(2)'
      })
    }

    this.once = false
  }

  _handleLinks(_event, _link)
  {
    let once = true
    console.log(_link)
    _event.preventDefault()

    if(_link.dataset.index) this.openedProjectIndex = _link.dataset.index
  
    const path = _link.getAttribute('href')

    if(path === '/about' && once)
    {
      console.log('craft ajax dom from path==about')
      if(once) this._craftAjaxDOM(path)
      once = false
    }
    else
    {
      _link.addEventListener('transitionend', () => 
      { 
        if(once) 
        {
          this._craftAjaxDOM(path)
          console.log('craft ajax dom from transition end & once == true')
        }
        
        once = false
  
      })
    }
  }

  _checkUrl(_data)
  {
    const pathname = window.location.pathname
    let validSrc = false
    console.log(pathname)
    for(let i = 0; i < this.params.validProjects.length; i++)
    {
      const src = '/' + this.params.validProjects[i]

      console.log(src)
      if(src === pathname || pathname === '/about')
      {
        this.openedProjectIndex = i

        this._craftAjaxDOM(pathname)
        console.log('craft ajax dom from check URL')
        validSrc = true

        break
      }
    }
    
    if(!validSrc) // if route go home
    {
      console.log('GO HOME')
      // this._httpRequest()
      // this._craftAjaxDOM('/')
      this._craftProjectsDOM(_data)
    } 
    // this._craftAjaxDOM('/retroAudioPlayer')
  }

  _dontLeave()
  {
    document.title == 'ε(´סּ︵סּ`)з' ? document.title = this.datas.documentTitle : document.title = "ε(´סּ︵סּ`)з"
  }

  _handlePopState(_event)
  {
    if(_event.state)
    {
      // console.log('handlePOP')
      document.title = _event.state.documentTitle
      document.querySelector(".view").innerHTML = _event.state.DOM

      // Update links
      // this.$.links = document.querySelectorAll('a')
      this._disabledLinks()

      // Run current controller
      this._runController(window.location.pathname)
    }
  }

  _craftAjaxDOM(_path)
  { 
    let fromPath = _path

    // Ajax request
    console.log(_path)
    for(let i = 0; i < this.params.validProjects.length; i++)
    {
      if(_path == '/' + this.params.validProjects[i]) { fromPath = '/project' }
    }

    // this._getPage('pages' + fromPath + '.html', 'body', 'body', _path)
    console.log('GET PAGE')
    console.log(fromPath)
    
    this._getPage('pages' + fromPath + '.html', 'body', '.view', _path)


    setTimeout(() => 
    {
      this._disabledLinks()

    }, 300)
  }

  _pushState(_response, _path)
  {
    // this.$.links = document.querySelectorAll('a:not(.external)')

    window.history.pushState({ DOM: _response.DOM, documentTitle: _response.title },"", _path)
  }

  _getPage(_url, _from = "body", _to = "body", _path)
  {
    console.log(_url)
    let to = {}

    this._waitCursor()

    to.DOM = document.querySelector(_to)
    to.title = document.title

    if(this.cached.DOM && this.cached.url == _url)
    { 
      document.body.style.cursor = 'auto'
      
      to.title = this.cached.title
      to.DOM.innerHTML = this.cached.DOM 

      // let images = to.DOM.querySelectorAll('img')
        
      // const catchImages = () => 
      // {
      //   if(images.length < 2)
      //   {
      //     setTimeout(() => {
      //       images = to.DOM.querySelectorAll('img')
      //       catchImages()
      //     }, 10);
      //   }
      //   else
      //   {
      //     // console.log(images)
      //     this._runLoader(images, images.length)
      //   }
      // }
      // catchImages()
      console.log(_path)
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
        
        // let images = to.DOM.querySelectorAll('img')
        
        // const catchImages = () => 
        // {
        //   if(images.length < 2)
        //   {
        //     // console.log('RERUN')
        //     setTimeout(() => {
        //       images = to.DOM.querySelectorAll('img')
        //       catchImages()
        //     }, 10);
        //   }
        //   else
        //   {
        //     // console.log(images)
        //     console.log('runLoader')
        //     this._runLoader(images, images.length)
        //   }
        // }
        // console.log('Launch catchImages')
        // catchImages()
        console.log(_path)
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

      // this._craftProjectsDOM(data)
      
      for(let i = 0; i < data.projects.length; i++)
      {
        this.params.validProjects.push(this._toCamelCase(data.projects[i].title))
      }

      this._checkUrl(data)
      // new Router()
    }
  }

  _craftProjectsDOM(_data)
  {
    const data = _data.projects

    let count = 0
    let items = []
    let images = []

    const $ = 
    {
      projectsTitles: document.querySelector('.projectsTitles__list'),
      projectsTitlesItems: document.querySelectorAll('.projectsTitles__list li'),
      projectsPreviews: document.querySelector('.projectsPreviews'),
      projectItems: document.querySelectorAll('.projectsPreviews__item'),
    }

    for(let i = 0; i < data.length; i++)
    {
      document.body.style.opacity = '1'
      
      const item = {}
      let loaderRatio = 0 
      
      item.node = $.projectItems[0].cloneNode(true)
      
      item.category = item.node.querySelector('.projectsPreviews__category')
      item.link = item.node.querySelector('a')
      item.img = item.link.querySelector('img')
      item.title = document.createElement('li')

      // this.$.links.push(item.link)
      // this.$.links = document.querySelectorAll('a:not(.external)')
      this.datas.img.push(item.img)

      item.category.innerText = data[i].category
      // item.link.setAttribute('href', '/projectsTest/' + this._toCamelCase(data[i].title))
      item.link.setAttribute('href', '/' + this._toCamelCase(data[i].title))
      item.link.setAttribute('data-index', i)
      item.img.setAttribute('src', data[i].thumbnail)
      item.title.innerText = data[i].title

      items.push(item)
      images.push(item.img)

      
      // item.img.addEventListener('load', () => 
			// {
      //   item.img.classList.add('loaded')

      //   count++

      //   loaderRatio = 1 / (this.datas.img.length / count)

      //   // if(this.datas.img.length == count) this._initProjects($.projectsPreviews, $.projectsTitles, $.projectItems, $.projectsTitlesItems, items, data)

      //   if(this.datas.img.length == count) this._removeLoader()

      //   this.$.loaderFill.style.transform = `scaleX(${loaderRatio})`
      // })
    }
    this._runLoader(images, this.datas.img.length)
    this._initProjects($.projectsPreviews, $.projectsTitles, $.projectItems, $.projectsTitlesItems, items, data)
  }

  _runLoader(_images, _numberToLoad)
  {
    // console.log('_runLoader')
    // console.log(_images)
    let count = 0
    let loaderRatio = 0
    let once = true
    // console.log('number to load ' + _numberToLoad)

    for(let i = 0; i < _images.length; i++)
    {
      _images[i].addEventListener('load', () => 
			{
        _images[i].classList.add('loaded')

        count++
        // console.log(_images[i])

        loaderRatio = 1 / (_numberToLoad / count)

        if(Math.floor(_numberToLoad) / 3 <= count && once) 
        {
          this._removeLoader()
          once = false
        } 

        this.$.loaderFill.style.transform = `scaleX(${loaderRatio})`
        // console.log(this.$.loaderFill)
      })
    }
  }

  _removeLoader()
  {
    console.log('remove loader')
    this.$.content.classList.remove('loading')
    this.$.loader.classList.remove('loading')

    const DOM = document.querySelector('.view').innerHTML
    const documentTitle = document.title
    
    this._disabledLinks()

    if(document.body.classList.contains('home')) 
    {
      this.controllers.home._updateScrollBar()
      console.log('pushstate')
      this._pushState({ DOM: DOM, title: documentTitle }, '/')
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

    this._runController('/')
  }

  _runController(_path = '/')
  {
    switch (_path) {
      case '/':
        this.controllers.home = new HomeController()
        break
      case '/' + this.params.validProjects[this.openedProjectIndex]:
        this.controllers.project = new ProjectController(this.openedProjectIndex)
        break
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