class ScrollProject
{
  constructor()
  {
    this.$ = 
    {
      dynamicBackground: document.querySelector('.dynamicBackground'),
      backgroundImage: document.querySelector('.background'),
      linearGradient: document.querySelector('.background__gradient--linear'),
      radialGradient: document.querySelector('.background__gradient--radial'),
      description: document.querySelector('.description'),
      hero: document.querySelector('.hero'),
      heroTitle: document.querySelector('.hero__title'),
      heroImage: document.querySelector('.hero__img'),
      heroCategory: document.querySelector('.hero__category'),
      footer: document.querySelector('footer'),
      // sections: document.querySelectorAll('section'),
      fixedSection: document.querySelector('.section--fixed'),
      sectionsImage: document.querySelectorAll('.section__image'),
      sectionsParagraph: document.querySelectorAll('.section__p'),
      sectionsDescriptions: document.querySelectorAll('.section__description'),
      imagesContainer: document.querySelector('.section--fixed div'),
      content: document.querySelector('.content'),
      scrollIndicator: document.querySelector('.scrollIndicator'),
      scrollIndicatorBody: document.querySelector('.scrollArrow__body'),
      scrollIndicatorLabel: document.querySelector('.scrollIndicator p'),
      humanRessources: document.querySelector('.humanResources'),
      date: document.querySelector('.date'),
    }

    this._initParams()

    if(this.$.imagesContainer) this.$.imagesContainer.classList.add('sticky')

    for(let i = 0; i < this.$.sectionsImage.length; i++)
    {
      if(i != 0) this.$.sectionsImage[i].classList.add('right')
    }
    
    this._listener()
  }

  _initParams()
  {
    this.params = 
    {
      documentScrollEnding: document.body.offsetHeight - window.innerHeight,
      radialInitialOpacity: parseFloat(getComputedStyle(this.$.radialGradient).opacity),
      scaleBackground: { ending: .8, scroll: 1/2 },
      scaleHero: { ending: .8, scroll: 1/3 },
      opacityRadial: { ending: 1, scroll: 1/4 },
      // sectionOffset: this.$.fixedSection.offsetTop,
      // // sectionHeight: this.$.fixedSection.offsetHeight / this.$.sectionsImage.length,
      // sectionHeight: this.$.fixedSection.offsetHeight,
      // sectionMarginTop: parseInt(getComputedStyle(this.$.fixedSection).marginTop),
      scaleSticky: { ending: .9, ratio: 0, oldScrollY: 0, imageNumber: this.$.sectionsImage.length, count: 1, oldCurrentScroll: 0 },
      scrollIndicator: { height: this.$.scrollIndicatorBody.offsetHeight },
      description: { marginTop: parseInt(getComputedStyle(this.$.description).marginTop), offsetTop: this.$.description.offsetTop, height: this.$.description.offsetHeight },
      // sectionsDescription: { height: this.$.sectionsDescriptions[0].offsetHeight }
    }

    if(this.$.fixedSection) 
    {
      this.params.sectionOffset = this.$.fixedSection.offsetTop
      this.params.sectionHeight = this.$.fixedSection.offsetHeight
      this.params.sectionMarginTop = parseInt(getComputedStyle(this.$.fixedSection).marginTop)
      this.params.sectionsDescription = { height: this.$.sectionsDescriptions[0].offsetHeight }
    }
  }

  _listener()
  {
    window.addEventListener('scroll', (event) => { this._handleScroll(event) })
    window.addEventListener('resize', () => { this._initParams() })
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
      // background:  window.scrollY / (this.params.documentScrollEnding * this.params.scaleBackground.scroll),
      background:  window.scrollY / (window.innerHeight * this.params.scaleBackground.scroll),
      hero:  window.scrollY / (this.params.documentScrollEnding * this.params.scaleHero.scroll),
      // radial: window.scrollY / (this.params.documentScrollEnding * this.params.opacityRadial.scroll)
      radial: window.scrollY / (window.innerHeight * this.params.opacityRadial.scroll)
    }
    
    // this._scaleBackground(ratio.background)
    this._scaleHero(ratio.hero)
    // this._opacityRadialGradient(ratio.radial)
    this._translateDescription()
    if(this.$.fixedSection) this._stickySection()
    this._scrollIndicator()
  }

  _scaleBackground(_ratio)
  {
    const scaleSubstraction = (1 - this.params.scaleBackground.ending) * _ratio
    let scaleRatio = 1 - scaleSubstraction

    if(scaleRatio <= this.params.scaleBackground.ending) scaleRatio = this.params.scaleBackground.ending

    this.$.backgroundImage.style.transform = `scale(${scaleRatio})`
  }

  _scrollIndicator()
  {
    if(window.scrollY <= this.params.description.offsetTop - window.innerHeight)
    {
      const scrollDistance = this.params.description.marginTop - this.params.sectionMarginTop
      const scale = window.scrollY / scrollDistance // 160 = margin top of description
      const translate = (window.scrollY / scrollDistance) * this.params.scrollIndicator.height // 160 = margin top of description
      
      if(scale <= 1) 
      {
        this.$.scrollIndicator.classList.remove('hidden')
        if(this.$.humanRessources) this.$.humanRessources.classList.remove('hidden')
        if(this.$.date) this.$.date.classList.remove('hidden')

        this.$.scrollIndicatorBody.style.transform = `scaleY(${1-scale})`
        if(this.$.humanRessources) this.$.humanRessources.style.opacity = `${1-scale}`
        if(this.$.date) this.$.date.style.opacity = `${1-scale}`
        this.$.scrollIndicatorLabel.style.transform = `translateY(${translate}px)`
      }
      else
      {
        this.$.scrollIndicator.classList.add('hidden')
        if(this.$.humanRessources) this.$.humanRessources.classList.add('hidden')
        if(this.$.date) this.$.date.classList.add('hidden')
      }
    }
    else
    {
      this.$.scrollIndicator.classList.add('hidden')
      if(this.$.humanRessources) this.$.humanRessources.classList.add('hidden')
      if(this.$.date) this.$.date.classList.add('hidden')
    }
  }

  _scaleHero(_ratio)
  {
    const scaleSubstraction = (1 - this.params.scaleHero.ending) * _ratio
    let scaleRatio = 1 - scaleSubstraction

    if(scaleRatio <= this.params.scaleHero.ending) scaleRatio = this.params.scaleHero.ending

    this.$.heroTitle.style.transform = `scale(${scaleRatio}) translateY(${-window.scrollY * .5}px)`
    this.$.heroImage.style.transform = `translateY(${-window.scrollY * 1}px)`
    this.$.heroCategory.style.transform = `translateY(${-window.scrollY * .8}px)`
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
  }

  _scaleSticky(_currentTranslateY)
  {

    // const ratio = (window.scrollY - this.params.scaleSticky.oldScrollY) / ((this.params.sectionHeight * (this.params.scaleSticky.imageNumber) + this.params.sectionMarginTop)) // 100 = margin
    const ratio = (window.scrollY - this.params.scaleSticky.oldScrollY) / ((this.params.sectionsDescription.height * (this.params.scaleSticky.imageNumber) + this.params.sectionMarginTop)) // 100 = margin

    const scaleSubstraction = (1 - this.params.scaleSticky.ending) * ratio
    const scaleDynamicBackground = 1 * ratio
    let scaleValue = 1 - scaleSubstraction

    if(this.params.scaleSticky.oldScrollY != 0 
      && window.scrollY - this.params.scaleSticky.oldScrollY > (this.params.sectionsDescription.height * this.params.scaleSticky.count + this.params.sectionMarginTop)
      && window.scrollY - this.params.scaleSticky.oldScrollY < (this.params.sectionsDescription.height * (this.params.scaleSticky.count + 1) + this.params.sectionMarginTop) // this.params.sectionHeight = description height
      && this.params.scaleSticky.count < this.params.scaleSticky.imageNumber
      && this.params.scaleSticky.oldCurrentScrollY < window.scrollY)
    {
      this.$.sectionsImage[this.params.scaleSticky.count - 1].classList.add('left')
      this.$.sectionsImage[this.params.scaleSticky.count].classList.remove('right')

      this.params.scaleSticky.count++
    }
    else if(
      this.params.scaleSticky.oldScrollY != 0 
      && window.scrollY - this.params.scaleSticky.oldScrollY < (this.params.sectionsDescription.height + this.params.sectionMarginTop) * (this.params.scaleSticky.count - 1)
      && this.params.scaleSticky.count > 1
      && this.params.scaleSticky.oldCurrentScrollY > window.scrollY)
    {
      this.$.sectionsImage[this.params.scaleSticky.count - 1].classList.add('right')
      this.$.sectionsImage[this.params.scaleSticky.count - 2].classList.remove('left')

      this.params.scaleSticky.count--
    }

    if(scaleValue <= this.params.scaleSticky.ending) scaleValue = this.params.scaleSticky.ending
    if(this.params.scaleSticky.oldScrollY != 0) this.$.imagesContainer.style.transform = `translateY(${_currentTranslateY}px) scale(${scaleValue})`
    this.$.dynamicBackground.style.opacity = scaleDynamicBackground
    if(this.params.scaleSticky.oldScrollY == 0) this.params.scaleSticky.oldScrollY = window.scrollY

    this.params.scaleSticky.oldCurrentScrollY = window.scrollY
  }

  _stickySection()
  {
    const imgContainerOffset = (window.innerHeight - (this.params.sectionHeight)) / 2 // relative to window
    const scrollY = window.scrollY

    if(this.params.sectionOffset != this.$.fixedSection.offsetTop) this.params.sectionOffset = this.$.fixedSection.offsetTop

    if(window.scrollY >= this.params.sectionOffset - imgContainerOffset
      && window.scrollY <= this.params.sectionOffset + ((this.params.sectionsDescription.height) * this.params.scaleSticky.imageNumber) - imgContainerOffset)
    {
      const translateY = imgContainerOffset
      this.$.imagesContainer.style.transform = `translateY(${translateY}px)`

      this._scaleSticky(translateY)
    }
    else if(window.scrollY <= this.params.sectionOffset + ((this.params.sectionsDescription.height) * this.params.scaleSticky.imageNumber) - imgContainerOffset) // before sitcky
    {
      this.$.imagesContainer.style.transform = `translateY(${this.params.sectionOffset - scrollY}px)` // scroll image container
    }
    else
    {
      this.$.imagesContainer.style.transform = `translateY(${this.params.sectionOffset/* + imgContainerOffset */+ (this.params.sectionsDescription.height) * this.params.scaleSticky.imageNumber - scrollY}px) scale(${this.params.scaleSticky.ending})`
      
    }
  }
}