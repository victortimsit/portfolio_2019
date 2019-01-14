class Octagon 
{
  constructor() 
  {
    this.$ = 
    {
      cursor: document.querySelector('.cursor'),
      cursorCircle: document.querySelector('.cursor__circle'),
      octagon: document.querySelector('.octagon'),
      octagonScale: document.querySelector('.octagon__container--scale'),
      projectsItems: document.querySelectorAll('.projectsPreviews__item'),
      projectsPreviews: document.querySelectorAll('.projectsPreviews__image'),
      projectsLinks: document.querySelectorAll('.projectsPreviews__item a'),
      tipsOpen: document.querySelector('.tips--open'),
      tipsClose: document.querySelector('.tips--close'),
    }

    this.mouse = 
    {
      x: 0,
      y: 0,
    }

    this.params =
    {
      octagon:
      {
        width: this.$.octagon.offsetWidth,
        height: this.$.octagon.offsetHeight,
        halfWidth: this.$.octagon.offsetWidth / 2,
        halfHeight: this.$.octagon.offsetHeight / 2
      },
      cursor:
      {
        halfWidth: this.$.cursor.offsetWidth / 2,
        halfHeight: this.$.cursor.offsetHeight / 2
      },
      projectDescription:
      {
        openIndex: null
      }
    }

    this.bool = 
    {
      cursorIsInit: false,
      cursorIsMouseDown: false,
      linksIsActive: true,
      descriptionIsOpen: false,
    }

    this._listeners()
  }

  _listeners()
  {
    for(let i = 0; i < this.$.projectsPreviews.length; i++) 
    {
      this.$.projectsPreviews[i].addEventListener('mouseenter', () => { this._handleOctagon() })
      this.$.projectsPreviews[i].addEventListener('mouseleave', () => { this._handleOctagon(false) })

      this.$.projectsLinks[i].addEventListener('mousedown', () => { this._handleOctagonFill(true, i) })
      this.$.projectsLinks[i].addEventListener('click', (event) => { this._handleOpenProject(event) })

    }
    
    window.addEventListener('mousemove', (event) => { this._handleCursor(event) })
    window.addEventListener('mouseup', (event) => { this._handleOctagonFill(false) })

    window.addEventListener('scroll', () => { this._handleCloseDescription() })
  }

  _handleOctagon(_mouseenter = true)
  {
    if(_mouseenter && !this.bool.descriptionIsOpen)
    {
      this.$.octagonScale.classList.add('active')
      this.$.cursorCircle.classList.add('scale')
    }
    else
    {
      this.$.octagonScale.classList.remove('active')
      this.$.cursorCircle.classList.remove('scale')
    }
  }

  _handleOctagonFill(_mousedown, _index)
  {
    if(_mousedown && !this.bool.descriptionIsOpen)
    {
      this.bool.cursorIsMouseDown = true
      this.bool.linksIsActive = true
  
      this.$.cursorCircle.classList.add('fill')

      setTimeout(() => {
        console.log(this.bool.cursorIsMouseDown)
        if(this.bool.cursorIsMouseDown) 
        {
          this._handleOpenDescription(true, _index)
        } 
      }, 300);
    }
    else
    {
      this.bool.cursorIsMouseDown = false

      this.$.cursorCircle.classList.remove('fill')
    }
  }

  _handleOpenProject(_event)
  {
    if(!this.bool.linksIsActive) _event.preventDefault()
  }

  _handleOpenDescription(_open, _index)
  {
    this.params.projectDescription.openIndex = _index

    this.$.cursorCircle.classList.remove('fill')
    this.$.cursorCircle.classList.remove('scale')
    this.$.octagonScale.classList.remove('active')
    this.$.tipsOpen.classList.remove('visible')
    this.$.tipsClose.classList.add('visible')
    this.$.projectsItems[_index].classList.add('opened')

    this.bool.linksIsActive = false
    this.bool.descriptionIsOpen = true
  }

  _handleCloseDescription()
  {
    if(this.bool.descriptionIsOpen)
    {
      this.$.projectsItems[this.params.projectDescription.openIndex].classList.remove('opened')
      this.$.tipsOpen.classList.add('visible')
      this.$.tipsClose.classList.remove('visible')

      this.bool.linksIsActive = true
      this.bool.descriptionIsOpen = false

      if(!this.bool.descriptionIsOpen)
      {
        this._handleOctagon()
      }
    }
  }

  _handleCursor(_event)
  {
    // Init cursor
    if(!this.bool.cursorIsInit) 
    {
      this.$.cursorCircle.classList.add('active')
      this.bool.cursorIsInit = true
    }

    this.mouse.x = _event.clientX 
    this.mouse.y = _event.clientY

    const octagonX = this.mouse.x - this.params.octagon.halfWidth
    const octagonY = this.mouse.y - this.params.octagon.halfHeight

    // const cursorX = this.mouse.x - this.params.cursor.halfWidth
    // const cursorY = this.mouse.y - this.params.cursor.halfHeight

    this.$.octagon.style.transform = `translate(${octagonX}px, ${octagonY}px)`
    // this.$.cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
  }
}