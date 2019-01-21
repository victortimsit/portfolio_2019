class IndexController
{
  constructor()
  {
    this.$ = 
    {
      projectsTitles: document.querySelector('.projectsTitles__list'),
      projectsPreviews: document.querySelector('.projectsPreviews'),
      projectItem: document.querySelector('.projectsPreviews__item'),
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
      // this._listeners(data)

      // new Octagon()
      new Router()
    }
  }

  _craftProjectsDOM(_data)
  {
    const data = _data.projects

    // Remove node model
    this.$.projectItem.remove()

    for(let i = 0; i < data.length; i++)
    {
      const item = {}
      
      item.node = this.$.projectItem.cloneNode(true)
      
      item.category = item.node.querySelector('.projectsPreviews__category')
      item.link = item.node.querySelector('a')
      item.img = item.link.querySelector('img')
      item.title = document.createElement('li')

      item.category.innerText = data[i].category
      item.link.setAttribute('href', '/projects/' + this._toCamelCase(data[i].title))
      item.link.setAttribute('data-index', i)
      item.img.setAttribute('src', data[i].thumbnail)
      item.title.innerText = data[i].title

      this.$.projectsPreviews.appendChild(item.node)
      this.$.projectsTitles.appendChild(item.title)
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