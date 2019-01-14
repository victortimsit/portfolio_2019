class HomeController
{
  constructor()
  {
    this.data
    this._sendRequest()
    console.log('init')
  }

  _sendRequest()
  {
    const requestURL = 'https://raw.githubusercontent.com/vtimsit/portfolio_2019/master/app/assets/datas/projects.json'
    const request = new XMLHttpRequest()

    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()

    request.onload = function() {
      this.data = request.response
      console.log(this.data.projects)
    }
  }
}