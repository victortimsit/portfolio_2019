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
    } 

    this.params = 
    {
      projectIndex: parseInt(_projectIndex),
    }

    window.scrollTo(0, 0)
    new ScrollProject()
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
    this.$.category.innerText = _data.category
    this.$.title.innerText = _data.title
    this.$.backgroundImage.src = _data.thumbnail
  }
  // init data function
}