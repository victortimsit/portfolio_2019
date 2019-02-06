class OpenedTransitions
{
  constructor()
  {
    this.$ = 
    {
      projectPreviews: document.querySelectorAll('.projectsPreviews__image'),
      projectPreviewsImage: document.querySelectorAll('.projectsPreviews__image img'),
      projectPreviewsContainer: document.querySelector('.projectsPreviews'),
      projectsTitles: document.querySelector('.projectsTitles'),
      radialBackground: document.querySelectorAll('.projectsPreviews .background__gradient--radial'),
      linearBackground: document.querySelectorAll('.projectsPreviews .background__gradient--linear')
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
      this.$.projectPreviews[i].addEventListener('click', () => { this._handleProjectOpened(this.$.projectPreviews[i], i) })
      // this.$.projectPreviews[i].addEventListener('transitionend', () => { this._disabledTransition(this.$.projectPreviews[i]) })
    }

    // window.addEventListener('scroll', () => { this._handleProjectClosed(this.openedProjectPreview) })
    window.addEventListener('resize', () => { this._handleProjectOpened(this.openedProjectPreview, 0, true) })
  }

  _handleProjectOpened(_currentPreview, _index = 0, _isResize = false)
  {
    // this.openedProjectPreview = _currentPreview
    this.bool.projectOpened = true

    let offsetTop = 0
    let offsetLeft = 0
    let width = 0
    let height = 0

    // if(!_isResize) _currentPreview.style.transition = 'transform 300ms ease'
    if(navigator.userAgent.indexOf('Safari') != -1 
    && navigator.userAgent.indexOf('Chrome') == -1) console.log('safari')
    
    // If safari
    if(navigator.userAgent.indexOf('Safari') != -1 
      && navigator.userAgent.indexOf('Chrome') == -1 
      && _currentPreview) 
    {
      offsetTop = _currentPreview.offsetTop // 50 = content margin
      console.log('safari')
    } 
    else if(_currentPreview)
    { 
      console.log('chrome')
      offsetTop = _currentPreview.offsetTop + 50 
    }

    if(_currentPreview)
    {
      offsetLeft = this.$.projectPreviewsContainer.offsetLeft
      width = _currentPreview.offsetWidth
      height = _currentPreview.offsetHeight
    }

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const scaleXRatio = windowWidth / width
    const scaleYRatio = windowHeight / height
    let scaleRatio

    const translateXRatio = (windowWidth - width) / 2 - (windowWidth - (offsetLeft + width))
    const translateYRatio = (windowHeight - height) / 2 - (windowHeight - (offsetTop + height))

    width * scaleYRatio < windowWidth ? scaleRatio = scaleXRatio : scaleRatio = scaleYRatio

    if(_currentPreview)
    {
      // _currentPreview.style.position = 'fixed'
      this.$.projectsTitles.style.transition = 'opacity 150ms'
      this.$.projectsTitles.style.opacity = '0'
      _currentPreview.style.zIndex = '10'
      _currentPreview.style.transform = `translate(${-translateXRatio}px, ${-translateYRatio + window.scrollY}px) scale(${scaleRatio})`
      console.log('scale')
    }

    if(!_isResize)
    {
      this.$.radialBackground[_index].style.opacity = '.9'
      this.$.linearBackground[_index].style.opacity = '1'
      this.$.projectPreviewsImage[_index].style.opacity = '0'
    }

    // this.currentScale = scaleRatio
  }

  _handleProjectClosed(_currentPreview)
  {
    if(_currentPreview)
    {
      _currentPreview.style.zIndex = '0'
      // _currentPreview.style.transition = 'transform 300ms ease'
      _currentPreview.style.transform = `translate(${0}px, ${0}px) scale(${1})`
    }
  }

  _disabledTransition(_element)
  {
    // _element.style.transition = 'none'
  }
}