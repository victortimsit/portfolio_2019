
class DOMLoader
{   
	constructor(loaderClass, loaderUndisplayClass) 
	{
        window.addEventListener('DOMContentLoaded', () => 
        { 
            this.loader = document.querySelector('.loader');
            this.loaderUndisplay = loaderUndisplayClass
            // this.sources = document.querySelectorAll('.' + sourceClass)
            this.images = document.querySelectorAll('img')
            this.sources = []
            this.links = document.querySelectorAll('a')

            if(this.images.length > 0)
            {
                for(let i = 0; i < this.images.length; i++)
                {
                    if(this.images[i].getAttribute('src') != '') this.sources.push(this.images[i])
                }
            }

            console.log(this.sources)

            this.bool= 
            {
                isEnding: false,
            }

            this.count =
            {
                loaded: 0,
            }
            
            this.int =
            {
                ratio: Math.floor(this.count.loaded / this.sources.length * 100)
            }

            this.src = null

            this.load()
            this._listeners()
        })
    }

    _listeners()
    {
        for(let i = 0; i < this.links.length; i++)
        {
            this.links[i].addEventListener('click', (_event) => { this._handleLink(_event, this.links[i]) })
        }
    }

    _initGlobalAnimations()
    {
        new GlobalAnimations()
    }

    _handleLink(_event, _link)
    {
        this.src = _link.getAttribute('href')

        _event.preventDefault()

        if(!this.src.includes('/contact')) this.timeline.loaderIn.play()
    }

    _goToUrl()
    {
        window.location.href = this.src
    }

	load()
	{      
        for(let i = 0; i < this.sources.length; i++)
		{
			const $newImg = document.createElement('img')

			$newImg.addEventListener('load', () => 
			{
                this.count.loaded++

                this.int.ratio = Math.floor(this.count.loaded / this.sources.length * 100)

                if(this.bool.isEnding) 
                {

                }

                console.log(this.int.ratio)

				this.count.loaded == this.sources.length ? this.init() : false
			})
			$newImg.src = this.sources[i].src
        }
        
        // setTimeout(() => {
        //     if(loaded < this.sources.length) this.init()
        // }, 5000);
    }
    _handleLoaded()
    {
        this.bool.isEnding = true
    }
	init()
	{

	}
}