class ScrollProject
{
  constructor()
  {
    // console.log(localStorage.getItem('projectTitle'))
    // document.location.hash = localStorage.getItem('projectTitle')
    this.$ = 
    {
      backgroundImage: document.querySelector('.background'),
      linearGradient: document.querySelector('.background__gradient--linear'),
      radialGradient: document.querySelector('.background__gradient--radial'),
      description: document.querySelector('.description'),
      hero: document.querySelector('.hero'),
      footer: document.querySelector('footer'),
      sections: document.querySelectorAll('section'),
      sectionsImage: document.querySelectorAll('.section__image'),
      content: document.querySelector('.content'),
    }

    // console.log(this.$.sections[0].offsetTop - 50)
    // console.log(this.$.content.offsetTop -50)

    this.params = 
    {
      documentScrollEnding: document.body.offsetHeight - window.innerHeight,
      radialInitialOpacity: parseFloat(getComputedStyle(this.$.radialGradient).opacity),
      scaleBackground: { ending: .8, scroll: 1/2 },
      scaleHero: { ending: .8, scroll: 1/3 },
      opacityRadial: { ending: 1, scroll: 1/4 },
      sectionOffset: this.$.sections[0].offsetTop,
      sectionHeight: this.$.sections[0].offsetHeight
    }

    // console.log(this.params.sectionHeight)
    
    this._listener()
  }

  _listener()
  {
    window.addEventListener('scroll', (event) => { this._handleScroll(event) })
    window.addEventListener('resize', () => { this._handleUpdateParams() })
  }

  _initSectionsStyle()
  {
    this.$.sections[0].style.height = `${this.params.sectionHeight}px`
    this.$.sectionsImage[0].style.height = `${this.params.sectionHeight}px`
  }

  _handleScroll(_event)
  {
    const ratio =
    {
      background:  window.scrollY / (this.params.documentScrollEnding * this.params.scaleBackground.scroll),
      hero:  window.scrollY / (this.params.documentScrollEnding * this.params.scaleHero.scroll),
      radial: window.scrollY / (this.params.documentScrollEnding * this.params.opacityRadial.scroll)
    }
    
    this._scaleBackground(ratio.background)
    this._scaleHero(ratio.hero)
    this._opacityRadialGradient(ratio.radial)
    this._translateDescription()
    // this._stickySection()
  }

  _scaleBackground(_ratio)
  {
    const scaleSubstraction = (1 - this.params.scaleBackground.ending) * _ratio
    let scaleRatio = 1 - scaleSubstraction

    if(scaleRatio <= this.params.scaleBackground.ending) scaleRatio = this.params.scaleBackground.ending

    this.$.backgroundImage.style.transform = `scale(${scaleRatio})`
  }

  _scaleHero(_ratio)
  {
    const scaleSubstraction = (1 - this.params.scaleHero.ending) * _ratio
    let scaleRatio = 1 - scaleSubstraction

    if(scaleRatio <= this.params.scaleHero.ending) scaleRatio = this.params.scaleHero.ending

    this.$.hero.style.transform = `scale(${scaleRatio}) translateY(${-window.scrollY * .5}px)`
  }

  _opacityRadialGradient(_ratio)
  {
    const opacityAddition = (this.params.opacityRadial.ending - this.params.radialInitialOpacity) * _ratio
    let opacityRatio = this.params.radialInitialOpacity + opacityAddition

    if(opacityRatio >= .99) opacityRatio = 1

    this.$.radialGradient.style.opacity = `${opacityRatio}`
  }

  _translateDescription()
  {
    this.$.description.style.transform = `translateY(${-window.scrollY * .2}px)`
    // console.log(window.scrollY)
  }

  _stickySection()
  {
    console.log(this.params.sectionOffset)
    if(window.scrollY >= this.params.sectionOffset)
    {
      this.$.sectionsImage[0].classList.add('sticky')
      this._initSectionsStyle()
      console.log('add sticky')
    }
    else
    {
      this.$.sectionsImage[0].classList.remove('sticky')
      console.log('remove sticky')
    }
  }

  _handleUpdateParams()
  {
    this.params.sectionHeight = this.$.sections[0].offsetHeight
    this.params.sectionOffset = this.$.sections[0].offsetTop
    console.log(this.params.sectionHeight)
  }
}
// new ProjectController()