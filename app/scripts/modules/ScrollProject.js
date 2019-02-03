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
      hero: document.querySelector('.hero'),
      footer: document.querySelector('footer'),
      // sections: document.querySelectorAll('section'),
      fixedSection: document.querySelector('.section--fixed'),
      sectionsImage: document.querySelectorAll('.section__image'),
      sectionsParagraph: document.querySelectorAll('.section__p'),
      imagesContainer: document.querySelector('.section--fixed div'),
      content: document.querySelector('.content'),
      scrollIndicator: document.querySelector('.scrollIndicator'),
      scrollIndicatorBody: document.querySelector('.scrollArrow__body'),
      scrollIndicatorLabel: document.querySelector('.scrollIndicator p'),
      humanRessources: document.querySelector('.humanResources'),
      date: document.querySelector('.date'),
    }

    this.params = 
    {
      documentScrollEnding: document.body.offsetHeight - window.innerHeight,
      radialInitialOpacity: parseFloat(getComputedStyle(this.$.radialGradient).opacity),
      scaleBackground: { ending: .8, scroll: 1/2 },
      scaleHero: { ending: .8, scroll: 1/3 },
      opacityRadial: { ending: 1, scroll: 1/4 },
      sectionOffset: this.$.fixedSection.offsetTop,
      // sectionHeight: this.$.fixedSection.offsetHeight / this.$.sectionsImage.length,
      sectionHeight: this.$.fixedSection.offsetHeight,
      scaleSticky: { ending: .9, ratio: 0, oldScrollY: 0, imageNumber: this.$.sectionsImage.length },
      scrollIndicator: { height: this.$.scrollIndicatorBody.offsetHeight },
      description: { marginTop: parseInt(getComputedStyle(this.$.description).marginTop), offsetTop: this.$.description.offsetTop, height: this.$.description.offsetHeight  }
    }
    console.log(this.params.sectionOffset)
    this.$.imagesContainer.classList.add('sticky')

    for(let i = 0; i < this.$.sectionsImage.length; i++)
    {
      if(i != 0) this.$.sectionsImage[i].classList.add('right')
    }
    
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
      const scrollDistance = this.params.description.marginTop - 100
      const scale = window.scrollY / scrollDistance // 160 = margin top of description
      const translate = (window.scrollY / scrollDistance) * this.params.scrollIndicator.height // 160 = margin top of description
      
      if(scale <= 1) 
      {
        this.$.scrollIndicator.classList.remove('hidden')
        this.$.humanRessources.classList.remove('hidden')
        this.$.date.classList.remove('hidden')

        this.$.scrollIndicatorBody.style.transform = `scaleY(${1-scale})`
        this.$.humanRessources.style.opacity = `${1-scale}`
        this.$.date.style.opacity = `${1-scale}`
        this.$.scrollIndicatorLabel.style.transform = `translateY(${translate}px)`
      }
      else
      {
        this.$.scrollIndicator.classList.add('hidden')
        this.$.humanRessources.classList.add('hidden')
        this.$.date.classList.add('hidden')
      }
    }
    else
    {
      this.$.scrollIndicator.classList.add('hidden')
      this.$.humanRessources.classList.add('hidden')
      this.$.date.classList.add('hidden')
    }
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

  _scaleSticky(_currentTranslateY)
  {
    // console.log(window.scrollY - this.params.scaleSticky.oldScrollY)
    // const ratio = (window.scrollY - this.params.scaleSticky.oldScrollY) / this.params.sectionHeight
    const ratio = (window.scrollY - this.params.scaleSticky.oldScrollY) / ((this.params.sectionHeight + 100) * 2) // 100 = margin
    // const ratio = window.scrollY / (this.params.sectionHeight)
    const scaleSubstraction = (1 - this.params.scaleSticky.ending) * ratio
    let scaleValue = 1 - scaleSubstraction
    // console.log(this.params.scaleSticky.oldScrollY)

    // if(this.params.scaleSticky.oldScrollY != 0 && window.scrollY - this.params.scaleSticky.oldScrollY > this.params.sectionHeight / this.$.sectionsImage.length)
    if(this.params.scaleSticky.oldScrollY != 0 && window.scrollY - this.params.scaleSticky.oldScrollY > this.params.sectionHeight + 100) // this.params.sectionHeight = description height
    {
      // console.log('update image')
      this.$.sectionsImage[0].classList.add('left')
      this.$.sectionsImage[1].classList.remove('right')
    }
    else
    {
      this.$.sectionsImage[0].classList.remove('left')
      this.$.sectionsImage[1].classList.add('right')
    }

    if(scaleValue <= this.params.scaleSticky.ending) scaleValue = this.params.scaleSticky.ending
    if(this.params.scaleSticky.oldScrollY != 0) this.$.imagesContainer.style.transform = `translateY(${_currentTranslateY}px) scale(${scaleValue})`
    if(this.params.scaleSticky.oldScrollY == 0) this.params.scaleSticky.oldScrollY = window.scrollY
  }

  // _stickySection()
  // {
  //   if(this.params.sectionOffset != this.$.fixedSection.offsetTop) this.params.sectionOffset = this.$.fixedSection.offsetTop

  //   if(window.scrollY <= this.params.sectionOffset - ((window.innerHeight - (this.params.sectionHeight * this.params.scaleSticky.imageNumber)) / 2))
  //   {
  //     this.$.imagesContainer.style.transform = `translateY(${this.params.sectionOffset - window.scrollY}px)` // scroll image container
  //   } 
  //   else // active sticky
  //   {
  //     const translateY = (window.innerHeight - (this.params.sectionHeight * this.params.scaleSticky.imageNumber)) / 2
  //     this.$.imagesContainer.style.transform = `translateY(${translateY}px)`

  //     this._scaleSticky(translateY)
  //   }
  // }
  _stickySection()
  {
    const imgContainerOffset = (window.innerHeight - (this.params.sectionHeight)) / 2 // relative to window
    const scrollY = window.scrollY
    console.log(imgContainerOffset)

    if(this.params.sectionOffset != this.$.fixedSection.offsetTop) this.params.sectionOffset = this.$.fixedSection.offsetTop

    // if(window.scrollY >= this.params.sectionOffset - ((window.innerHeight - (this.params.sectionHeight * this.params.scaleSticky.imageNumber)) / 2)
    // && window.scrollY <= this.params.sectionOffset + this.params.sectionHeight * this.params.scaleSticky.imageNumber)// active sticky
    if(window.scrollY >= this.params.sectionOffset - imgContainerOffset
      && window.scrollY <= this.params.sectionOffset + ((this.params.sectionHeight) * 2))
    {
      const translateY = (window.innerHeight - (this.params.sectionHeight)) / 2
      this.$.imagesContainer.style.transform = `translateY(${translateY}px)`

      this._scaleSticky(translateY)
    }
    else if(window.scrollY <= this.params.sectionOffset + ((this.params.sectionHeight) * 2)) // before sitcky
    {
      this.$.imagesContainer.style.transform = `translateY(${this.params.sectionOffset - scrollY}px)` // scroll image container
    }
    else
    {
      console.log(this.params.sectionOffset)
      this.$.imagesContainer.style.transform = `translateY(${this.params.sectionOffset + imgContainerOffset + (this.params.sectionHeight) * 2 - scrollY}px) scale(${this.params.scaleSticky.ending})`
    }
  }

  _handleUpdateParams()
  {
    this.params.sectionHeight = this.$.fixedSection.offsetHeight
    this.params.sectionOffset = this.$.fixedSection.offsetTop
  }
}