class HomeController
{
  constructor()
  {
    this.$ = 
    {
      projectsTitles: document.querySelector('.projectsTitles__list'),
      projectsPreviews: document.querySelector('.projectsPreviews'),
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

      this._craftProjectsTitles(data)

      new ScrollBar()
      new Octagon()
    }
  }

  _craftProjectsTitles(_data)
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

      // Add data
      projectDOM.title.innerText = data[i].title
      projectDOM.category.innerText = data[i].category
      projectDOM.image.setAttribute('src', data[i].thumbnail)

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
}