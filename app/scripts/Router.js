class Router
{
  constructor()
  {
    this.$ =
    {
      links: document.querySelectorAll('a:not(.external)'), // Not if external link
      content: document.querySelector('.view'),
    }

    this.datas = 
    {
      documentTitle: document.title
    }

    this.initalResponse = 
    {
      DOM: this.$.content.innerHTML,
      title: this.datas.documentTitle
    }

    this.cached = {}

    this.openedProjectIndex = Number

    this._listeners()
    this._checkUrl()
    this._disabledLinks()
    this._runController('/')
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

    if(!validSrc) this._pushState(this.initalResponse, '/')
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

  _runController(_path = '/')
  {
    if(_path.includes('projects/')) _path = '/project'

    switch (_path) {
      case '/':
        console.log('run home controller')
        new ScrollBar()
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

    console.log(this.cached.images)
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
}