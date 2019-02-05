class ScrollBar
{
    constructor()
    {
        this.$ = 
        {
            scrollbar: document.querySelector('.projectsTitles'),
            list: document.querySelector('.projectsTitles__list'),
            tab: document.querySelector('.projectsTitles__tab'),
            items: document.querySelectorAll('.projectsTitles__list li'),
            projectsItems: document.querySelectorAll('.projectsPreviews__item'),
            projectsPreviews: document.querySelector('.projectsPreviews')
            // about: document.querySelector('.about'),
        }

        this.parseWords = []    

        this.params = 
        {
            itemHeight: 0,
            visibleWords: 5,
        }

        this.sounds = {}

        // const aboutText = this.$.about.innerText

        // this._parseWords(aboutText)
        this._craftScrollBarDOM()
        this._initParams()
        // this._initSounds()
        this._initStyles()
        this._handleScroll()
        this._listeners()
    }

    _listeners()
    {
        window.addEventListener('scroll', () => { this._handleScroll() })
        window.addEventListener('resize', () => { this._initParams() })
        
    }

    skewEffect()
	{
		const newPixel = this.params.deltaY
		
		const diff = newPixel - this.params.currentPixel
		
		const speed = diff * 0.1
		
		// if(speed < 15 && speed > -15) this.testTitle.style.transform = `skewY(${-speed}deg)`
        // if(speed < 15 && speed > -15) console.log(speed)
        if(speed < 15 && speed > -15) {
            for(let i = 0; i < this.$.projectsItems.length; i++)
            {

                this.$.projectsItems[i].style.transform = `scaleY(${1 - speed / 50})`
            }
            // this.$.projectsPreviews.style.transform = `translateZ(${-speed * 10}px)`
        }

		this.params.currentPixel = newPixel

		// setTimeout(() => { this.skewEffect() }, 30)
		window.requestAnimationFrame(() => { this.skewEffect() })
	}

    _parseWords(_text)
    {
        let count = 0
        let currentString = ''

        for(let i = 0; i < _text.length; i++)
        {
            if(_text[i] != ' ' || count < 4)
            {
                currentString+= _text[i]
            }
            else
            {
                currentString+= _text[i]

                this.parseWords.push(currentString)

                count = 0
                currentString = ''
            }

            count++
        }
    }

    _initParams()
    {
        
        this.params.itemMarginTop = parseInt(getComputedStyle(this.$.items[0]).marginTop)
        this.params.itemHeight = this.$.items[0].offsetHeight + this.params.itemMarginTop
        this.params.visibleItemsHeight = (this.params.itemHeight * this.params.visibleWords) - this.params.itemMarginTop
        this.params.scrollbarHeight = this.$.scrollbar.offsetHeight
        this.params.listScrollEnding = this.$.scrollbar.offsetHeight - this.params.visibleItemsHeight
        this.params.documentScrollEnding = document.body.offsetHeight - window.innerHeight
        this.params.listHeight = this.$.list.offsetHeight + this.params.itemMarginTop * 2
        this.params.initialOffset = ((this.params.visibleWords - (this.params.visibleWords % 2)) / 2 * this.params.itemHeight) - this.params.itemMarginTop

        // this.params.tabScrollEnding = this.params.listHeight + this.params.initialOffset - this.params.visibleItemsHeight
        this.params.tabScrollEnding = this.params.listHeight + this.params.initialOffset - this.params.visibleItemsHeight + this.params.initialOffset
        this.params.itemLength = this.$.items.length
        this.params.wordScrollOffset = this.params.documentScrollEnding / (this.params.itemLength - 1)
        this.params.wordsHalfIn = Math.floor(this.params.visibleWords / 2)
        this.params.wordsHalfOut = Math.ceil(this.params.visibleWords / 2)
        this.params.oldScrollY = 0
        this.params.deltaY = 0
        this.params.currentPixel = window.scrollY
        this.params.tic = true
        this.params.oldIndex = 0
    }

    _initSounds()
    {
        // this.sounds.tic = new Audio('../assets/sounds/tic.mp3')
        this.sounds.tic = new Audio('../assets/sounds/Clic_vic_1.wav')
    }
    
    _initStyles()
    {
        this.$.tab.style.height = `${this.params.visibleItemsHeight}px`
        this.$.list.style.transform = `translateY(${this.params.initialOffset}px)`
        
        for(let i = 0; i < this.$.items.length; i++)
        {
            this.$.items[i].style.transform= 'scale(.8)'
            this.$.items[i].style.opacity= '.1'
            this.$.items[i].style.transformOrigin = 'right'
        }
    }

    _craftScrollBarDOM()
    {
        for(let i = 0; i < this.parseWords.length; i++)
        {
            const item = document.createElement('li')
            const meteric = document.createElement('div')

            item.innerText = this.parseWords[i]
            meteric.classList.add('meteric')

            this.$.list.appendChild(item)
            this.$.items.push(item)
            item.appendChild(meteric)
        }
    }

    _handleScroll()
    {
        //Scroll bar variables
        let scrollRatio = (window.scrollY * this.params.listScrollEnding) / this.params.documentScrollEnding
        let tabScrollRatio = (window.scrollY * this.params.tabScrollEnding) / this.params.documentScrollEnding

        //Words variables
        let wordRatio = window.scrollY / (this.params.wordScrollOffset * this.params.wordsHalfIn)
        let currentWordIndex = Math.floor(window.scrollY / this.params.wordScrollOffset)
        let wordScrollRatio = this.params.wordScrollOffset * currentWordIndex

        for(let i = 0; i < this.$.items.length; i++)
        {
            const currentScrollY = window.scrollY - (this.params.wordScrollOffset * (i - 2)) 
            const currentScrollYTest = currentScrollY - (this.params.wordScrollOffset * 2)
            wordRatio = currentScrollY / (this.params.wordScrollOffset * 2)
            // wordRatio = currentScrollY / ((this.params.wordScrollOffset * i)

            if(wordRatio >= 1 && wordRatio >= 0)
            {
                wordScrollRatio = this.params.wordScrollOffset * i
                wordRatio = 1 - (currentScrollYTest / (this.params.wordScrollOffset * 2))
            }

    
            // const currentScale = .8 + (.6 * wordRatio)
            const currentScale = .8 + (.8 * wordRatio)
            // const currentProjectScale = 1.2 + (-1 * wordRatio) // Crazy mode
            // const currentProjectScale = .8 + (.2 * wordRatio) // Crazy mode
    
            // const currentProjectScale = 1
            // const currentRotation = 200 + ((-200) * wordRatio) // Crazy mode
            const currentOpacity = .2 + (.8 * wordRatio)
            // const currentFontWeight = 100 + (900 * wordRatio)
            // const currentFontWeight = 200 + (600 * wordRatio)

            if(wordRatio >= 0)
            {
                this.$.items[i].style.transform = `scale(${currentScale})`
                this.$.items[i].style.opacity = `${currentOpacity}`
            }
            else
            {
                this.$.items[i].style.transform = `scale(.8)`
                this.$.items[i].style.opacity = `.2`
            }
            if(this.params.oldIndex != currentWordIndex && this.sounds.tic)
            {
                this.sounds.tic.currentTime = 0
                this.sounds.tic.play()
            } 
                

            this.params.oldIndex = currentWordIndex
        }

        // this.$.tab.style.transform = `translateY(${Math.round(scrollRatio)}px)`
        this.$.list.style.transform = `translateY(${this.params.initialOffset + Math.round(-tabScrollRatio)}px)`

        this.params.oldScrollY = window.scrollY
        this.params.deltaY = window.scrollY
    }
}
