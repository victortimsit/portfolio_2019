class ProjectController
{
  constructor()
  {
    this.data

    this.params = 
    {
      projectIndex: localStorage.getItem('projectIndex'),
    }

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

      // this._craftProjectsDOM(data)
      // this._listeners(data)
      this._addHash(data)
      // this._initData(data)
    }
  }

  _addHash(_data)
  {
    const hash = _data.projects[this.params.projectIndex].title.replace(/\s/g, '')

    document.location.hash = hash
  }

  // init data function
}