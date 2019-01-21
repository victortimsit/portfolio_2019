class OpenedTransitions
{
  constructor()
  {
    this.$ = 
    {
      projectPreviews: document.querySelectorAll('.projectsPreviews__image')
    }

    this.bool = 
    {
      projectOpened: false
    }

    this.openedProjectPreview
    this.currentScale

    this._listeners()
  }

  _listeners()
  {
    for(let i = 0; i < this.$.projectPreviews.length; i++)
    {
      this.$.projectPreviews[i].addEventListener('click', () => { this._handleProjectOpened(this.$.projectPreviews[i]) })
      this.$.projectPreviews[i].addEventListener('transitionend', () => { this._disabledTransition(this.$.projectPreviews[i]) })
    }

    window.addEventListener('scroll', () => { this._handleProjectClosed(this.openedProjectPreview) })
    window.addEventListener('resize', () => { this._handleProjectOpened(this.openedProjectPreview, true) })
  }

  _handleProjectOpened(_currentPreview, _isResize = false)
  {
    // this.openedProjectPreview = _currentPreview
    this.bool.projectOpened = true


    if(!_isResize) _currentPreview.style.transition = 'transform 300ms ease'

    const offsetTop = _currentPreview.offsetTop
    const offsetLeft = _currentPreview.offsetLeft
    const width = _currentPreview.offsetWidth
    const height = _currentPreview.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const scaleXRatio = windowWidth / width
    const scaleYRatio = windowHeight / height
    let scaleRatio

    const translateXRatio = (windowWidth - width) / 2 - (windowWidth - (offsetLeft + width))
    const translateYRatio = (windowHeight - height) / 2 - (windowHeight - (offsetTop + height))

    width * scaleYRatio < windowWidth ? scaleRatio = scaleXRatio : scaleRatio = scaleYRatio

    _currentPreview.style.transform = `translate(${-translateXRatio}px, ${-translateYRatio + window.scrollY}px) scale(${scaleRatio})`

    // this.currentScale = scaleRatio
  }

  _handleProjectClosed(_currentPreview)
  {
    if(_currentPreview)
    {
      _currentPreview.style.transition = 'transform 300ms ease'
      _currentPreview.style.transform = `translate(${0}px, ${0}px) scale(${1})`
    }
  }

  _disabledTransition(_element)
  {
    _element.style.transition = 'none'
    // this.openedProjectPreview.classList.add('activePreview')
    // console.log(this.currentTransform.scale)
    // this.openedProjectPreview.style.transform = `translate(-50%, -50%) scale(${this.currentScale})`
  }
}