class HomeController
{
  constructor()
  {
    
    this.controller = 
    {
      ScrollBar: new ScrollBar(),
      AboutController: new AboutController()
    }
    
    new OpenedTransitions()

    document.body.className = 'home'
  }

  _updateScrollBar()
  {
    this.controller.ScrollBar._initParams()
    this.controller.ScrollBar._initStyles()
    this.controller.ScrollBar._handleScroll()
  }

  removeListeners()
  {
    this.controller.ScrollBar.removeListeners()
  }
}
