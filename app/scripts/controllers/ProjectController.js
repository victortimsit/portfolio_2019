class ProjectController
{
  constructor(_projectIndex)
  {
    this.data

    this.$ = 
    {
      category: document.querySelector('.hero__category'),
      title: document.querySelector('.hero__title'),
      backgroundImage: document.querySelector('.background__image img'),
      description: document.querySelector('.description'),
      descriptionParagraph: document.querySelector('.description__paragraph'),
      content: document.querySelector('.content')
    } 

    this.params = 
    {
      projectIndex: parseInt(_projectIndex),
    }

    window.scrollTo(0, 0)
    
    this._sendRequest()
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
      console.log(this.params.projectIndex)
      this._craftProjectsDOM(data.projects[this.params.projectIndex])
      // this._listeners(data)
      // this._initData(data)
    }
  }

  _craftProjectsDOM(_data)
  {
    console.log(_data)
    // Set hero data
    this.$.category.innerText = _data.category
    this.$.title.innerText = _data.title
    this.$.backgroundImage.src = _data.thumbnail
    this.$.descriptionParagraph.innerText = _data.description

    // set dynamic dom
    if(_data.url)
    {
      const button = document.createElement('a')
      button.innerText = "Live view"
      button.classList.add('button')
      button.setAttribute('href', _data.url)
      button.setAttribute('target', "_blank")
      this.$.description.appendChild(button)
    }

    if(_data.content)
    {
      const key = 0
      const data = 1

      // Oubli pas de check si ça existe
      const section = document.createElement('section')
      const imgsContainer = document.createElement('div')

      for(let i = 0; i < _data.content.length; i++)
      {

        if(_data.content[i][key] == 'img') 
        {
          const div = document.createElement('div')
          const img = document.createElement('img')

          img.src = _data.content[i][data]

          div.classList.add('section__image')
          if(i == 0) section.classList.add('section--fixed') // Fixed first image

          div.appendChild(img)
          imgsContainer.appendChild(div)
          section.appendChild(imgsContainer)

          this.$.content.appendChild(section)
        }
        else if(_data.content[i][key] == 'p')
        {
          const section = document.createElement('section')
          const p = document.createElement('p')

          p.classList.add('section__p')

          p.innerText = _data.content[i][data]

          section.appendChild(p)

          this.$.content.appendChild(section)
        }
      }
    }
    
    new ScrollProject()
  }
  // init data function
}