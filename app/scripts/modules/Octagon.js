class Octagon 
{
  constructor() 
  {
    this.$ = 
    {
      octagon: document.querySelector('.octagon'),
      octagonScale: document.querySelector('.octagon__container--scale'),
      projectsPreviews: document.querySelectorAll('.projectsPreviews__image'),
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
      }
    }

    this._listeners()
  }

  _listeners()
  {
    for(let i = 0; i < this.$.projectsPreviews.length; i++) 
    {
      this.$.projectsPreviews[i].addEventListener('mouseenter', () => { this._handleOctagon() })
      this.$.projectsPreviews[i].addEventListener('mouseleave', () => { this._handleOctagon(false) })
    }

    window.addEventListener('mousemove', (event) => { this._handleCursor(event) })
  }

  _handleOctagon(_mouseenter = true)
  {
    console.log('in')
    _mouseenter ? this.$.octagonScale.classList.add('active') : this.$.octagonScale.classList.remove('active')
  }

  _handleCursor(_event)
  {
    this.mouse.x = _event.clientX - this.params.octagon.halfWidth
    this.mouse.y = _event.clientY - this.params.octagon.halfHeight

    this.$.octagon.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`
  }
}