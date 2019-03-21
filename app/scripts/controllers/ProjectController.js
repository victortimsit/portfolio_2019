class ProjectController
{
  constructor(_projectIndex)
  {
    this.data

    this.$ = 
    {
      container: document.querySelector('.container'),
      loader: document.querySelector('.loader'),
      footer: document.querySelector('footer'),
      footerGoHome: document.querySelector('footer a'),
      category: document.querySelector('.hero__category'),
      title: document.querySelector('.hero__title'),
      image: document.querySelector('.hero__img'),
      backgroundImage: document.querySelector('.background__image img'),
      description: document.querySelector('.description'),
      descriptionParagraph: document.querySelector('.description__paragraph'),
      content: document.querySelector('.content'),
      humanResources: document.querySelector('.humanResources'),
      links: []
    } 

    this.params = 
    {
      projectIndex: parseInt(_projectIndex),
    }

    this.devices =
    {
      mobile: 
      {
        break: 800,
        status: false
      }
    }

    window.scrollTo(0, 0)
    
    this._sendRequest()
    this._checkDevice()
    this.$.container.classList.remove('loading')
    this.$.loader.classList.remove('loading')
    
    document.body.className = 'project'
  }

  _listeners()
  {
    for(let i = 0; i < this.$.links.length; i++)
    {
      this.$.links[i].addEventListener('click', () => { this._openProject(this.$.links[i]) })
    }
  }

  _checkDevice()
  {
    if(window.innerWidth <= this.devices.mobile.break)
    {
      this.devices.mobile.status = true
    }
  }
  _sendRequest()
  {
    const requestURL = 'https://raw.githubusercontent.com/vtimsit/portfolio_2019/master/app/assets/datas/projects.json'
    const request = new XMLHttpRequest()

    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
      const data = request.response

      this._craftProjectsDOM(data.projects[this.params.projectIndex])

      this._craftOtherProjectsDOM(data.projects, 3)
    
      // this._listeners(data)
      // this._initData(data)
    }
  }

  _openProject(_project)
  {
    _project.style.transform = 'translateY(-50px)'
    setTimeout(() => {
      _project.style.transform = 'translateY(0px)'
    }, 300);
  }

  _craftProjectsDOM(_data)
  {
    // Set hero data
    this.$.category.innerText = _data.category
    this.$.title.innerText = _data.title
    this.$.image.querySelector('img').src = _data.thumbnail
    // this.$.backgroundImage.src = _data.thumbnail
    this.$.descriptionParagraph.innerText = _data.description

    this.$.title.style.backgroundImage = `url(${_data.thumbnail})` // Cette ligne fait tout capote ?????
    // set dynamic dom
    if(_data.url)
    {
      const button = document.createElement('a')
      button.innerText = "Live view"
      button.classList.add('button')
      button.classList.add('external')
      button.setAttribute('href', _data.url)
      button.setAttribute('target', "_blank")
      this.$.description.appendChild(button)
    }

    if(_data.role)
    {
      const div = document.createElement('div')
      const h3 = document.createElement('h3')
      const ul = document.createElement('ul') 

      h3.innerText = "Role"

      div.classList.add('humanResources__role')

      for(let i = 0; i < _data.role.length; i++)
      {
        const li = document.createElement('li')
        li.innerText = _data.role[i]
        ul.appendChild(li)
      }

      div.appendChild(h3)
      div.appendChild(ul)

      this.$.humanResources.appendChild(div)
    }

    if(_data.contributors)
    {
      const div = document.createElement('div')
      const h3 = document.createElement('h3')
      const ul = document.createElement('ul') 

      h3.innerText = "Contributors"

      div.classList.add('humanResources__contributors')

      for(let i = 0; i < _data.contributors.length; i++)
      {
        const li = document.createElement('li')
        li.innerText = _data.contributors[i]
        ul.appendChild(li)
      }

      div.appendChild(h3)
      div.appendChild(ul)

      this.$.humanResources.appendChild(div)
    }

    if(_data.date)
    {
      const div = document.createElement('div')
      const h3 = document.createElement('h3')

      div.classList.add('date')

      h3.innerText = _data.date

      div.appendChild(h3)
      this.$.content.appendChild(div)
    }

    if(_data.content)
    {
      const key = 0
      const path = 1
      const description = 2

      // Oubli pas de check si ça existe
      const section = document.createElement('section')
      const pSection = document.createElement('section')
      const imgsContainer = document.createElement('div')
      const descriptionContainer = document.createElement('div')

      for(let i = 0; i < _data.content.length; i++)
      {

        if(_data.content[i][key] == 'img' || _data.content[i][key] == 'video') 
        {
          const div = document.createElement('div')
          let img = document.createElement('img')

          if(_data.content[i][key] == 'video') 
          {
            img = document.createElement('video')
            img.setAttribute('playsinline', '')
            img.setAttribute('loop', '')
            img.setAttribute('muted', '')
            img.setAttribute('autoplay', '')
          } 

          const p = document.createElement('p')

          p.classList.add('section__description')

          img.src = _data.content[i][path]
          p.innerText = _data.content[i][description]

          div.classList.add('section__image')
          if(i == 0) section.classList.add('section--fixed') // Fixed first image

          div.appendChild(img)
          imgsContainer.appendChild(div)
          descriptionContainer.appendChild(p)
          section.appendChild(imgsContainer)
          pSection.appendChild(descriptionContainer)

          this.$.content.appendChild(section)
          this.$.content.appendChild(pSection)
        }
        else if(_data.content[i][key] == 'p')
        {
          const section = document.createElement('section')
          const p = document.createElement('p')

          p.classList.add('section__p')

          p.innerText = _data.content[i][path]

          section.appendChild(p)

          this.$.content.appendChild(section)
        }
      }
    }
    
    new ScrollProject()
  }

  _craftOtherProjectsDOM(_data, _projectNumber = 3)
  {
    if(_data.length > 1)
    {
      const h2 = document.createElement('h2')
      const container = document.createElement('div')

      h2.innerText = 'Other projects'
      container.classList.add('other')

      if(_data.length >= _projectNumber)
      {
        for(let i = 0; i < _projectNumber; i++)
        {
          const a = document.createElement('a')
          const div = document.createElement('div')
          const img = document.createElement('img')
  
          img.src = _data[i].thumbnail
          a.href = '/' + this._toCamelCase(_data[i].title)

          a.classList.add('other__project')
          a.dataset.index = i
          div.classList.add('other__image')
  
          div.appendChild(img)
          a.appendChild(div)
  
          container.appendChild(a)

          this.$.links.push(a)
        }
      }

      this.$.footer.insertBefore(h2, this.$.footerGoHome)
      this.$.footer.insertBefore(container, this.$.footerGoHome)
      // this.$.footer.appendChild(h2)
      // this.$.footer.appendChild(container)
    }
    this._listeners()
  }
  _toCamelCase(_string)
  {
    return _string
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase() })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase() })
  }
  // init data function
}