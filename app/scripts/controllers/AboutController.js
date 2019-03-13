class AboutController 
{
  constructor()
  {
    this.$ = 
    {
      body: document.querySelector('body'),
      container: document.querySelector('.container'),
      about: document.querySelector('.about'),
      aboutContent: document.querySelector('.aboutContent'),
      leftSide: document.querySelector('.leftSide'),
      contact: document.querySelector('.contact'),
      close: document.querySelector('.aboutContent__close')
    }

    this.bool =
    {
      isOpen: false
    }

    this._listeners()
  }

  _listeners()
  {
    this.$.about.addEventListener('click', (event) => { this._openAbout(event) })
    this.$.close.addEventListener('click', (event) => { this._closeAbout(event) })
  }

  _openAbout(_event)
  {
    this.bool.isOpen = true
    
    // setTimeout(() => {
    //   this.$.body.classList.add('perspective')
    //   this.$.container.classList.add('perspective')
    // }, 100);
    
    // setTimeout(() => {
      // }, 300);
    this.$.aboutContent.classList.add('active')

    // this.$.leftSide.classList.add('perspective')
    // this.$.contact.classList.add('perspective')
  }

  _closeAbout()
  {
    this.bool.isOpen = false
      
    // this.$.container.classList.remove('perspective')
    this.$.aboutContent.classList.remove('active')
    
    // setTimeout(() => {
    //   this.$.leftSide.classList.remove('perspective')
    //   this.$.contact.classList.remove('perspective')
    //   this.$.body.classList.remove('perspective')
    // }, 500);
  }
}