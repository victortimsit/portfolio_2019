class HomeController
{
  constructor()
  {
    this.$ = 
    {
      projectsTitles: document.querySelector('.projectsTitles__list'),
      projectsPreviews: document.querySelector('.projectsPreviews'),
      links: []
    }

    this.data

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

      this._craftProjectsDOM(data)
      this._listeners(data)

      new ScrollBar()
      new Octagon()
    }
  }

  _listeners(_data)
  {
    const data = _data.projects

    for(let i = 0; i < this.$.links.length; i++)
    {
      this.$.links[i].addEventListener('click', () => { this._handlePushLocalStorage(i) })
      console.log(data[i])
    }
  }

  _craftProjectsDOM(_data)
  {
    const data = _data.projects

    for(let i = 0; i < data.length; i++)
    {
      // Create project DOM
      const projectDOM = 
      {
        title: document.createElement('li'),
        previewItem: document.createElement('li'),
        category: document.createElement('div'),
        link: document.createElement('a'),
        previewImage: document.createElement('div'),
        image: document.createElement('img')
      }

      this.$.links.push(projectDOM.link)

      // Add data
      projectDOM.title.innerText = data[i].title
      projectDOM.category.innerText = data[i].category
      projectDOM.image.setAttribute('src', data[i].thumbnail)
      projectDOM.link.setAttribute('href', '/project.html')

      // Add class
      projectDOM.previewItem.classList.add('projectsPreviews__item')
      projectDOM.category.classList.add('projectsPreviews__category')
      projectDOM.previewImage.classList.add('projectsPreviews__image')

      // AppendChild
      projectDOM.previewItem.appendChild(projectDOM.category)
      projectDOM.previewItem.appendChild(projectDOM.link)
      projectDOM.link.appendChild(projectDOM.previewImage)
      projectDOM.previewImage.appendChild(projectDOM.image)

      this.$.projectsPreviews.appendChild(projectDOM.previewItem)
      this.$.projectsTitles.appendChild(projectDOM.title)
    }

  }

  _handlePushLocalStorage(_projectIndex)
  {
    localStorage.setItem('projectIndex', _projectIndex)
  }
}