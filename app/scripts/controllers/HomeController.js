class HomeController
{
  constructor()
  {
    this.controller = 
    {
      ScrollBar: new ScrollBar()
    }
    
    new OpenedTransitions()

    document.body.className = ''
    document.body.classList.add('home')
  }

  _updateScrollBar()
  {
    this.controller.ScrollBar._initParams()
    this.controller.ScrollBar._initStyles()
    this.controller.ScrollBar._handleScroll()
  }
}
