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
      // sections: document.querySelectorAll('section'),
      fixedSection: document.querySelector('.section--fixed'),
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
      sectionOffset: this.$.fixedSection.offsetTop,
      sectionHeight: this.$.fixedSection.offsetHeight,
      rotateSticky: { ending: .8, ratio: 0, oldScrollY: 0 }
    }

    // console.log(this.params.sectionHeight)
    this.$.sectionsImage[0].classList.add('sticky')
    // this.$.sectionsImage[1].style.opacity = '0'
    
    this._listener()
  }

  _listener()
  {
    window.addEventListener('scroll', (event) => { this._handleScroll(event) })
    window.addEventListener('resize', () => { this._handleUpdateParams() })
  }

  // _initSectionsStyle()
  // {
  //   this.$.sections[0].style.height = `${this.params.sectionHeight}px`
  //   this.$.sectionsImage[0].style.height = `${this.params.sectionHeight}px`
  // }

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
    this._stickySection()
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

  _rotateSticky(_currentTranslateY)
  {
    const ratio = (window.scrollY - this.params.rotateSticky.oldScrollY) / this.params.sectionHeight
    // const ratio = window.scrollY / (this.params.sectionHeight)
    const scaleSubstraction = (1 - this.params.rotateSticky.ending) * ratio
    let scaleValue = 1 - scaleSubstraction
    console.log(this.params.rotateSticky.oldScrollY)

    if(scaleValue <= this.params.rotateSticky.ending) scaleValue = this.params.rotateSticky.ending
    if(this.params.rotateSticky.oldScrollY != 0) this.$.sectionsImage[0].style.transform = `translateY(${_currentTranslateY}px) scale(${scaleValue})`
    if(this.params.rotateSticky.oldScrollY == 0) this.params.rotateSticky.oldScrollY = window.scrollY
  }

  // _stickySection()
  // {
  //   if(this.params.sectionOffset != this.$.fixedSection.offsetTop) this.params.sectionOffset = this.$.fixedSection.offsetTop

  //   if(window.scrollY >= this.params.sectionOffset - ((window.innerHeight - this.params.sectionHeight) / 2))
  //   // if(window.scrollY >= this.params.sectionOffset - (window.innerHeight))
  //   {
  //     this.$.sectionsImage[0].classList.add('sticky')
  //     // this._initSectionsStyle()
  //     console.log('add sticky')
  //   }
  //   else
  //   {
  //     this.$.sectionsImage[0].classList.remove('sticky')
  //     console.log('remove sticky')
  //   }
  // }

  _stickySection()
  {
    if(this.params.sectionOffset != this.$.fixedSection.offsetTop) this.params.sectionOffset = this.$.fixedSection.offsetTop

    if(window.scrollY <= this.params.sectionOffset - ((window.innerHeight - this.params.sectionHeight) / 2))
    {
      this.$.sectionsImage[0].style.transform = `translateY(${this.params.sectionOffset - window.scrollY}px)`
    }  
    else // active sticky
    {
      const translateY = (window.innerHeight - this.params.sectionHeight) / 2
      this.$.sectionsImage[0].style.transform = `translateY(${translateY}px)`

      this._rotateSticky(translateY)
    }
    
    // console.log(this.$.fixedSection.offsetTop)
    // console.log(window.scrollY)
  }

  _handleUpdateParams()
  {
    this.params.sectionHeight = this.$.fixedSection.offsetHeight
    this.params.sectionOffset = this.$.fixedSection.offsetTop
    // console.log(this.params.sectionHeight)
  }
}
// new ProjectController()