class HomeController
{
  constructor()
  {
    this.controller = 
    {
      ScrollBar: new ScrollBar()
    }
    
    new OpenedTransitions()
  }

  _updateScrollBar()
  {
    console.log('update scroll bar')
    this.controller.ScrollBar._initParams()
    this.controller.ScrollBar._initStyles()
    this.controller.ScrollBar._handleScroll()
  }
}
