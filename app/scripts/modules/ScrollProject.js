import data from '../../assets/datas/projects'

class ScrollProject
{
  constructor()
  {
    this.$ = 
    {
      backgroundImage: document.querySelector('.background'),
      linearGradient: document.querySelector('.background__gradient--linear'),
      radialGradient: document.querySelector('.background__gradient--radial'),
      description: document.querySelector('.description'),
    }

    this.params = 
    {
      documentScrollEnding: document.body.offsetHeight - window.innerHeight,
      radialInitialOpacity: parseFloat(getComputedStyle(this.$.radialGradient).opacity),
      backgroundScaleEnding: .8,
      radialOpacityEnding: 1,
      radialLenghtEnding: 1/4,
      scaleLenghtEnding: 1/2,
    }

    console.log(this.$.documentScrollEnding)
    
    this._listener()
  }

  _listener()
  {
    window.addEventListener('scroll', (event) => { this._handleScroll(event) })
  }

  _handleScroll(_event)
  {
    const ratio = window.scrollY / (this.params.documentScrollEnding * this.params.scaleLenghtEnding)
    const opacityRatio = window.scrollY / (this.params.documentScrollEnding * this.params.radialLenghtEnding)
    
    this._scaleBackground(ratio)
    this._opacityRadialGradient(opacityRatio)
  }

  _scaleBackground(_ratio)
  {
    const scaleSubstraction = (1 - this.params.backgroundScaleEnding) * _ratio
    let scaleRatio = 1 - scaleSubstraction

    if(scaleRatio <= this.params.backgroundScaleEnding) scaleRatio = this.params.backgroundScaleEnding

    this.$.backgroundImage.style.transform = `scale(${scaleRatio})`
  }

  _opacityRadialGradient(_ratio)
  {
    const opacityAddition = (this.params.radialOpacityEnding - this.params.radialInitialOpacity) * _ratio
    let opacityRatio = this.params.radialInitialOpacity + opacityAddition

    if(opacityRatio >= .99) opacityRatio = 1

    this.$.radialGradient.style.opacity = `${opacityRatio}`
  }
}

new ScrollProject()

console.log(data)