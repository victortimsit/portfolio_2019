class Desk
{
    constructor() 
    {
        // Scene
        this.scene = new THREE.Scene()

        this.size = 
        {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.mouse = { x: 0, y: 0 }
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.size.width - 0.5
            this.mouse.y = event.clientY / this.size.height - 0.5   
        })

        // Set keys properties
        this.keyBindings =
        [
            { key: 'A', keyCode: '65' },
            { key: 'Z', keyCode: '90' },
            { key: 'E', keyCode: '69' },
            { key: 'R', keyCode: '82' },
            { key: 'T', keyCode: '84' },
            { key: 'Y', keyCode: '89' },
            { key: 'U', keyCode: '85' },
            { key: 'I', keyCode: '73' },
            { key: 'O', keyCode: '79' },
            { key: 'P', keyCode: '80' },
        
            { key: 'Q', keyCode: '81' },
            { key: 'S', keyCode: '83' },
            { key: 'D', keyCode: '68' },
            { key: 'F', keyCode: '70' },
            { key: 'G', keyCode: '71' },
            { key: 'H', keyCode: '72' },
            { key: 'J', keyCode: '74' },
            { key: 'K', keyCode: '75' },
            { key: 'L', keyCode: '76' },
            { key: 'M', keyCode: '77' },
        
            { key: 'W', keyCode: '87' },
            { key: 'X', keyCode: '88' },
            { key: 'C', keyCode: '67' },
            { key: 'V', keyCode: '86' },
            { key: 'B', keyCode: '66' },
            { key: 'N', keyCode: '78' }
        ]
        this.keys = []

        this.move = 
        {
            forward: false,
            backward: false,
            left: false,
            right: false,
            breathSpeed: 500,
            breathAmplitude: 80
        }

        this.power = false

        

        document.addEventListener('keydown', (event) => {
            this.keyPush(event)
            this.moving(event)
        })
        
        document.addEventListener('mousedown', (event) => {
            this.clickPush(event)
        })
        
        this.setCamera()
        this.monitorSpeaker()
        
        this.footStepsSounds = document.querySelectorAll('.footSteps')
        this.glitchCanvas('glitch', 'assets/textures/desktop.jpg', 128, 128, 10, 250, 10000, 250, 1000)

        this.canvas = document.querySelector('.glitch')
        this.ctx = this.canvas.getContext('2d')
        this.screenTexture = new THREE.Texture(this.canvas)
        this.canvas.width = 128
        this.canvas.height = 128

        this.monitorLayer()
        this.bedLayer()
        this.texture()
        this.keyboardLayer()
        this.mouseLayer()
        this.floor()
        this.light()
        this.setRenderer()
        this.footStepsPlay()
        this.animate()

    }
    setCamera() 
    {
        this.objectCamera = new THREE.Object3D

        this.camera = new THREE.PerspectiveCamera(70, this.size.width / this.size.height)

        this.objectCamera.position.z = 10
        this.objectCamera.position.y = 0.6

        this.objectCamera.add(this.camera)
        
        // this.camera.position.z = - 5
        this.scene.add(this.objectCamera)
    }
    texture()
    {
        this.textureLoader = new THREE.TextureLoader()
        this.textures = {}    
        this.textures.normal = this.textureLoader.load('assets/textures/brick_normal.png')      
        this.textures.texture = this.textureLoader.load('assets/textures/brick_1.png')      
        this.textures.desktop = this.textureLoader.load('assets/textures/desktop.jpg')      
        this.textures.keyboard = 
        [
            this.textureLoader.load('assets/textures/keyboard/esc.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f1.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f2.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f3.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f4.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f5.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f6.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f7.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f8.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f9.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f10.jpg'),
            this.textureLoader.load('assets/textures/keyboard/del.jpg'),

            this.textureLoader.load('assets/textures/keyboard/backQuote.jpg'),
            this.textureLoader.load('assets/textures/keyboard/1.jpg'),
            this.textureLoader.load('assets/textures/keyboard/2.jpg'),
            this.textureLoader.load('assets/textures/keyboard/3.jpg'),
            this.textureLoader.load('assets/textures/keyboard/4.jpg'),
            this.textureLoader.load('assets/textures/keyboard/5.jpg'),
            this.textureLoader.load('assets/textures/keyboard/6.jpg'),
            this.textureLoader.load('assets/textures/keyboard/7.jpg'),
            this.textureLoader.load('assets/textures/keyboard/8.jpg'),
            this.textureLoader.load('assets/textures/keyboard/9.jpg'),
            this.textureLoader.load('assets/textures/keyboard/0.jpg'),
            this.textureLoader.load('assets/textures/keyboard/minus.jpg'),
            this.textureLoader.load('assets/textures/keyboard/plus.jpg'),
            this.textureLoader.load('assets/textures/keyboard/bar.jpg'),
            this.textureLoader.load('assets/textures/keyboard/backSpace.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav7.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav8.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav9.jpg'),

            this.textureLoader.load('assets/textures/keyboard/tab.jpg'),
            this.textureLoader.load('assets/textures/keyboard/a.jpg'),
            this.textureLoader.load('assets/textures/keyboard/z.jpg'),
            this.textureLoader.load('assets/textures/keyboard/e.jpg'),
            this.textureLoader.load('assets/textures/keyboard/r.jpg'),
            this.textureLoader.load('assets/textures/keyboard/t.jpg'),
            this.textureLoader.load('assets/textures/keyboard/y.jpg'),
            this.textureLoader.load('assets/textures/keyboard/u.jpg'),
            this.textureLoader.load('assets/textures/keyboard/i.jpg'),
            this.textureLoader.load('assets/textures/keyboard/o.jpg'),
            this.textureLoader.load('assets/textures/keyboard/p.jpg'),
            this.textureLoader.load('assets/textures/keyboard/openingBrace.jpg'),
            this.textureLoader.load('assets/textures/keyboard/closingBrace.jpg'),
            this.textureLoader.load('assets/textures/keyboard/returnRight.jpg'),
            this.textureLoader.load('assets/textures/keyboard/help.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav4.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav5.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav6.jpg'),

            this.textureLoader.load('assets/textures/keyboard/ctrl.jpg'),
            this.textureLoader.load('assets/textures/keyboard/capsLock.jpg'),
            this.textureLoader.load('assets/textures/keyboard/q.jpg'),
            this.textureLoader.load('assets/textures/keyboard/s.jpg'),
            this.textureLoader.load('assets/textures/keyboard/d.jpg'),
            this.textureLoader.load('assets/textures/keyboard/f.jpg'),
            this.textureLoader.load('assets/textures/keyboard/g.jpg'),
            this.textureLoader.load('assets/textures/keyboard/h.jpg'),
            this.textureLoader.load('assets/textures/keyboard/j.jpg'),
            this.textureLoader.load('assets/textures/keyboard/k.jpg'),
            this.textureLoader.load('assets/textures/keyboard/l.jpg'),
            this.textureLoader.load('assets/textures/keyboard/doubleDot.jpg'),
            this.textureLoader.load('assets/textures/keyboard/quote.jpg'),
            this.textureLoader.load('assets/textures/keyboard/returnLeft.jpg'),
            this.textureLoader.load('assets/textures/keyboard/topArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav1.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav2.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav3.jpg'),

            this.textureLoader.load('assets/textures/keyboard/leftShift.jpg'),
            this.textureLoader.load('assets/textures/keyboard/m.jpg'),
            this.textureLoader.load('assets/textures/keyboard/w.jpg'),
            this.textureLoader.load('assets/textures/keyboard/x.jpg'),
            this.textureLoader.load('assets/textures/keyboard/c.jpg'),
            this.textureLoader.load('assets/textures/keyboard/v.jpg'),
            this.textureLoader.load('assets/textures/keyboard/b.jpg'),
            this.textureLoader.load('assets/textures/keyboard/n.jpg'),
            this.textureLoader.load('assets/textures/keyboard/leftOpenArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/rightOpenArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/interrogationPoint.jpg'),
            this.textureLoader.load('assets/textures/keyboard/rightShift.jpg'),
            this.textureLoader.load('assets/textures/keyboard/leftArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/RightArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pav0.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pavDot.jpg'),

            this.textureLoader.load('assets/textures/keyboard/leftAlt.jpg'),
            this.textureLoader.load('assets/textures/keyboard/fillA.jpg'),
            this.textureLoader.load('assets/textures/keyboard/space.jpg'),
            this.textureLoader.load('assets/textures/keyboard/strokeA.jpg'),
            this.textureLoader.load('assets/textures/keyboard/rightAlt.jpg'),
            this.textureLoader.load('assets/textures/keyboard/bottomArrow.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pavHorizontalBar.jpg'),
            this.textureLoader.load('assets/textures/keyboard/pavEnter.jpg'),

        ]
    }
    light()
    {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 0xffffff, 1
        this.scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x00ffff, 1) // 0xffffff, 0.1
        pointLight.position.y = 0.8 // 0.8
        pointLight.position.z = 0.16 // 0.16
        pointLight.castShadow = true
        
        this.glitchLight = pointLight

        const pointLightTwo = new THREE.PointLight(0xffffff, 0.1) // 0xffffff, 0.1
        pointLightTwo.position.y = 0.8 // 0.8
        pointLightTwo.position.z = 0.16 // 0.16
        pointLightTwo.castShadow = true
        this.pointLightTwo = pointLightTwo

        const pointLightThree = new THREE.PointLight(0xffffff, 0.06) // 0xffffff, 0.1
        pointLightThree.position.y = 1 // 0.8
        pointLightThree.position.z = 0.16 // 0.16

        this.scene.add(pointLightThree)

        const directionalLight = new THREE.DirectionalLight(0xccccff, 0.8) // 0.7
        directionalLight.position.x = 1.4
        directionalLight.position.y = 1 //1
        directionalLight.position.z = 1
        directionalLight.castShadow = true
        directionalLight.shadow.camera.top = 0.8
        directionalLight.shadow.camera.right = 0.8
        directionalLight.shadow.camera.bottom = -0.8
        directionalLight.shadow.camera.left = -0.8

        this.scene.add(directionalLight)

    }
    setRenderer()
    {
        this.renderer = new THREE.WebGLRenderer({ antialias: true})
        this.renderer.setSize(this.size.width, this.size.height)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xE8E8FE, 1)
        document.body.appendChild(this.renderer.domElement)
    }
    render()
    {
        this.renderer.render(this.scene, this.camera)  
    }
    monitorSpeaker()
    {
        this.monitorSpeaker = geometry.box(0.2, 0.2, 0.2, 0, 0.2)
        this.scene.add(this.monitorSpeaker)
    }
    monitorLayer()
    { 
        const color = 0xa8ada8
        const darker = 0x858989
        const monitor = new THREE.Object3D()
        monitor.position.y = 0.054

        this.scene.add(monitor)

        // BASE
        const base = new THREE.Object3D()

        // BOTTOM
        const baseBottom = geometry.box(
            0.4, 0.035, 0.3, 
            0, 0, 0, 
            color,
        )
        baseBottom.castShadow = true

        base.add(baseBottom)

        // MIDDLE
        // Middle left
        const baseMiddleLeft = geometry.box(
            0.29, 0.005, 0.3, 
            - 0.055, 0.02, 0, 
            color,
        )
        // baseMiddleLeft.castShadow = true
        base.add(baseMiddleLeft)

        // Middle Right
        const baseMiddleRight = geometry.box(
            0.03, 0.005, 0.3, 
            0.185, 0.02, 0, 
            color,
        )
        
        base.add(baseMiddleRight)

        // Middle back
        const baseMiddleBack = geometry.box(
            0.08, 0.005, 0.22, 
            0.13, 0.02, - 0.04, 
            darker,
        )
        baseMiddleBack.castShadow = true

        base.add(baseMiddleBack)
        
        // TOP
        const top = geometry.box(
            0.4, 0.02, 0.3, 
            0, 0.0325, 0, 
            color,
        )

        base.add(top)
        const front = new THREE.Object3D()
        
        front.a = geometry.box(
            0.29, 0.058, 0.004, 
            - 0.055, 0.0126, 0.152, 
            darker,
        ) 

        front.b = geometry.box(
            0.02, 0.019, 0.004, 
            0.1, 0.032, 0.152, 
            darker,
        )

        front.c = geometry.box(
            0.04, 0.01, 0.004, 
            0.13, 0.0365, 0.152, 
            darker,
        )

        front.d = geometry.box(
            0.05, 0.019, 0.004, 
            0.175, 0.032, 0.152, 
            darker,
        )

        front.e = geometry.box(
            0.03, 0.039, 0.004, 
            0.185, 0.003, 0.152, 
            darker,
        )

        front.f = geometry.box(
            0.02, 0.006, 0.004, 
            0.16, 0.0145, 0.152, 
            darker,
        )

        front.g = geometry.box(
            0.008, 0.006, 0.004, 
            0.154, 0.0085, 0.152, 
            darker,
        )

        front.h = geometry.box(
            0.02, 0.022, 0.004, 
            0.16, - 0.0055, 0.152, 
            darker,
        )

        front.i = geometry.box(
            0.08, 0.015, 0.004, 
            0.13, - 0.009, 0.152, 
            darker,
        )

        front.j = geometry.box(
            0.02, 0.019, 0.004, 
            0.10, 0.008, 0.152, 
            color,
        )

        front.k = geometry.box(
            0.1, 0.043, 0.001, 
            - 0.15, 0.02, 0.1545, 
            color,
        )

        front.l = geometry.box(
            0.16, 0.043, 0.001, 
            - 0.018, 0.02, 0.1545, 
            color,
        )

        front.m = geometry.box(
            0.026, 0.043, 0.001, 
            0.077, 0.02, 0.1545, 
            color,
        )

        front.n = geometry.box(
            0.02, 0.019, 0.001, 
            0.1, 0.032, 0.1545, 
            color,
        )

        front.o = geometry.box(
            0.04, 0.01, 0.001, 
            0.13, 0.0365, 0.1545, 
            color,
        )

        front.p = geometry.box(
            0.05, 0.01, 0.001, 
            0.175, 0.0365, 0.1545, 
            color,
        )

        front.q = geometry.box(
            0.05, 0.009, 0.001, 
            0.175, 0.027, 0.1545, 
            color,
        )

        front.r = geometry.box(
            0.03, 0.005, 0.001, 
            0.185, 0.02, 0.1545, 
            color,
        )

        front.s = geometry.box( 
            0.03, 0.019, 0.001, 
            0.185, 0.008, 0.1545, 
            color,
        )

        front.t = geometry.box( 
            0.02, 0.006, 0.001, 
            0.16, 0.0145, 0.1545, 
            color,
        )

        front.u = geometry.box( 
            0.008, 0.016, 0.001, 
            0.154, 0.0065, 0.1545, 
            color,
        )

        front.v = geometry.box( 
            0.012, 0.007, 0.001, 
            0.164, 0.002, 0.1545, 
            color,
        )

        front.v = geometry.box( 
            0.02, 0.019, 0.001, 
            0.1, 0.008, 0.1545, 
            color,
        )

        front.w = geometry.box( 
            0.10, 0.013, 0.001, 
            -0.15, - 0.01, 0.1545, 
            color,
        )

        front.x = geometry.box( 
            0.16, 0.013, 0.001, 
            -0.018, - 0.01, 0.1545, 
            color,
        )

        front.y = geometry.box( 
            0.136, 0.013, 0.001, 
            0.132, - 0.01, 0.1545, 
            color, 
        )

        front.z = geometry.box( 
            0.012, 0.007, 0.001, 
            0.164, 0.002, 0.1545, 
            color,
        )

        front.button = geometry.box( 
            0.011, 0.005, 0.006, 
            0.164, 0.0085, 0.154, 
            color,
        )

        front.leftLeg = geometry.box( 
            0.006, 0.015, 0.30, 
            - 0.19, - 0.025, - 0.0005, 
            darker,
        )

        front.rightLeg = geometry.box( 
            0.006, 0.015, 0.30, 
            0.19, - 0.025, - 0.0005, 
            darker,
        )

        // Front first path
        front.add(front.a)
        front.add(front.b)
        front.add(front.c)
        front.add(front.d)
        front.add(front.e)
        front.add(front.f)
        front.add(front.g)
        front.add(front.h)
        front.add(front.i)
        front.add(front.j)

        // Front second path
        front.add(front.k)
        front.add(front.l)
        front.add(front.m)
        front.add(front.n)
        front.add(front.o)
        front.add(front.p)
        front.add(front.q)
        front.add(front.r)
        front.add(front.s)
        front.add(front.t)
        front.add(front.u)
        front.add(front.v)
        front.add(front.w)
        front.add(front.x)
        front.add(front.y)
        front.add(front.z)

        front.add(front.button)
        front.add(front.leftLeg)
        front.add(front.rightLeg)

        base.add(front)

        // SCREEN
        const screen = new THREE.Object3D()
        this.screen = screen
        

        screen.support = geometry.box(
            0.284, 0.02, 0.27, 
            0, 0.052, - 0.01, 
            color
        )

        screen.base = geometry.box(
            0.3, 0.02, 0.29, 
            0, 0.072, - 0.005, 
            color
        )

        screen.frontLeft = geometry.box(
            0.008, 0.26, 0.15, 
            - 0.146, 0.192, 0.065, 
            color
        )

        screen.frontRight = geometry.box(
            0.008, 0.26, 0.15, 
            0.146, 0.192, 0.065, 
            color
        )

        screen.frontTop = geometry.box(
            0.3, 0.014, 0.15, 
            0, 0.315, 0.065, 
            color
        )

        screen.body = geometry.box(
            0.284, 0.23, 0.14, 
            0, 0.197, - 0.08, 
            color
        )

        // Grids
        screen.rightGrids = []
        screen.leftGrids = []

        let gridsSpacing = 0

        for(let i = 0; i < 16; i++) 
        {

            screen.rightGrids.push(
                geometry.box(
                0.008, 0.002, 0.14, 
                0.145, 0.17 + gridsSpacing, - 0.08, 
                color
            ))

            screen.leftGrids.push(
                geometry.box(
                0.008, 0.002, 0.14, 
                - 0.145, 0.17 + gridsSpacing, - 0.08, 
                color
            ))

            gridsSpacing += 0.004
        }

        // Formwork
        screen.formworkA = geometry.box(
            0.008, 0.09, 0.14, 
            -0.146, 0.125, - 0.08, 
            color
        )

        screen.formworkB = geometry.box(
            0.008, 0.09, 0.14, 
            0.146, 0.125, - 0.08, 
            color
        )

        screen.formworkC = geometry.box(
            0.008, 0.08, 0.14, 
            0.146, 0.272, - 0.08, 
            color
        )

        screen.formworkD = geometry.box(
            0.008, 0.08, 0.14, 
            -0.146, 0.272, - 0.08, 
            color
        )
        // Screen borders
        screen.borderA = geometry.box(
            0.018, 0.226, 0.13, 
            -0.134, 0.195, 0.07, 
            darker
        )

        screen.borderB = geometry.box(
            0.018, 0.226, 0.13, 
            0.134, 0.195, 0.07, 
            darker
        )

        screen.borderC = geometry.box(
            0.25, 0.018, 0.13, 
            0 , 0.3, 0.07, 
            darker
        )

        screen.borderD = geometry.box(
            0.25, 0.018, 0.13, 
            0 , 0.09, 0.07, 
            darker
        )

        screen.borderE = geometry.box(
            0.018, 0.222, 0.004, 
            -0.131, 0.195, 0.138, 
            darker
        )

        screen.borderF = geometry.box(
            0.018, 0.222, 0.004, 
            0.131, 0.195, 0.138, 
            darker
        )

        screen.borderG = geometry.box(
            0.244, 0.018, 0.004, 
            0, 0.297, 0.138, 
            darker
        )

        screen.borderH = geometry.box(
            0.244, 0.018, 0.004, 
            0, 0.093, 0.138, 
            darker
        )

        screen.borderI = geometry.box(
            0.09, 0.02, 0.004, 
            -0.105, 0.072, 0.142, 
            color
        )

        screen.borderJ = geometry.box(
            0.156, 0.02, 0.004, 
            0.02, 0.072, 0.142, 
            color,
        )

        screen.borderK = geometry.box(
            0.02, 0.02, 0.004, 
            0.11, 0.072, 0.142, 
            color
        )

        screen.borderL = geometry.box(
            0.028, 0.02, 0.004, 
            0.136, 0.072, 0.142, 
            color
        )

        screen.lcdOff = geometry.box(
            0.25, 0.188, 0.001, 
            0, 0.195, 0.12, 
            color,
        )

        screen.lcd = geometry.box(
            0.25, 0.188, 0.001, 
            0, 0.195, 0.12, 
            0xededff,
            this.screenTexture
        )
        this.lcd = screen.lcd

        setTimeout(() => 
        {
            screen.add(screen.lcd)
            this.scene.add(this.glitchLight)
            this.scene.add(this.pointLightTwo)

        }, 3800)

        screen.add(screen.support)
        screen.add(screen.base)
        screen.add(screen.frontLeft)
        screen.add(screen.frontRight)
        screen.add(screen.frontTop)
        screen.add(screen.body)
        for(const grid of screen.rightGrids) { screen.add(grid) }
        for(const grid of screen.leftGrids) { screen.add(grid) }
        screen.add(screen.formworkA)
        screen.add(screen.formworkB)
        screen.add(screen.formworkC)
        screen.add(screen.formworkD)
        screen.add(screen.borderA)
        screen.add(screen.borderB)
        screen.add(screen.borderC)
        screen.add(screen.borderD)
        screen.add(screen.borderE)
        screen.add(screen.borderF)
        screen.add(screen.borderG)
        screen.add(screen.borderH)
        screen.add(screen.borderI)
        screen.add(screen.borderJ)
        screen.add(screen.borderK)
        screen.add(screen.borderL)
        screen.add(screen.lcdOff)

        monitor.add(screen)
        monitor.add(base)

        this.monitor = monitor
    }
    bedLayer()
    {
        const bedColor = 0x9595c9
        const legColor = 0xf2ba71


        const bed = new THREE.Object3D()
        bed.position.x = 2.4
        bed.rotation.y = 0.6

        bed.base = geometry.box(0.8, 0.1, 1.9, 0, 0.2, 0, bedColor)
        bed.base.castShadow = true
        bed.add(bed.base)

        // Legs
        bed.legsOne = geometry.box(0.06, 0.2, 0.06, 0.35, 0.08, 0.9, legColor)
        bed.legsOne.castShadow = true
        bed.add(bed.legsOne)

        bed.legsTwo = geometry.box(0.06, 0.2, 0.06, - 0.35, 0.08, 0.9, legColor)
        bed.legsTwo.castShadow = true
        bed.add(bed.legsTwo)

        bed.legsThree = geometry.box(0.06, 0.2, 0.06, - 0.35, 0.08, - 0.9, legColor)
        bed.legsThree.castShadow = true
        bed.add(bed.legsThree)

        bed.legsFour = geometry.box(0.06, 0.2, 0.06, 0.35, 0.08, - 0.9, legColor)
        bed.legsFour.castShadow = true
        bed.add(bed.legsFour)

        bed.materess = geometry.box(0.8, 0.1, 1.9, 0, 0.3, 0, 0xc9c9e0)
        bed.materess.castShadow = true
        bed.add(bed.materess)

        this.scene.add(bed)
    }
    glitchCanvas(
        className,
        imageSrc,
        width,
        height, 
        offset, 
        glitchIntervalMin, 
        glitchIntervalMax, 
        glitchDurationMin, 
        glitchDurationMax)
    {
        this.$canvas = document.createElement('canvas')
        this.context = this.$canvas.getContext('2d')

        const listener = new THREE.AudioListener()
        this.objectCamera.add(listener)

        const glitchSound = new THREE.PositionalAudio(listener)
        

        const audioLoader = new THREE.AudioLoader()
        audioLoader.load( 'assets/sounds/another-one.mp3', function( buffer ) {
            glitchSound.setBuffer( buffer )
            glitchSound.setRefDistance( 1 )
            glitchSound.play();
        });
        
        this.monitorSpeaker.add(glitchSound)

        this.$canvas.classList.add(className)
        document.body.appendChild(this.$canvas)

        this.$glitchSounds = document.querySelectorAll('.glitchSound')

        this.image = new Image()
        this.image.src = imageSrc
        this.image.onload = () => {
            this.initGlitchCanvas()
            window.onresize = this.initGlitchCanvas()
            this.drawGlitchCanvas()
        }

        this.width = width
        this.height = height
        this.offset = offset * this.width

        this.glitchInterval = {
            min: glitchIntervalMin, 
            max: glitchIntervalMax
        }

        this.glitchDuration = {
            min: glitchDurationMin,
            max: glitchDurationMax
        }
    }
    initGlitchCanvas()
    {
        clearInterval(this.glitchMaker)

        this.$canvas.width = this.width
        this.$canvas.height = this.height
        
        this.image.width = this.$canvas.width
        this.image.height = this.$canvas.height

        this.glitchMaker = setInterval(() => {
            
            this.drawGlitchCanvas()
            
            this.glitchImage()
            
        }, this.randomInterval(this.glitchInterval.min, this.glitchInterval.max))
    }
    drawGlitchCanvas()
    {
        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height)
        this.screenTexture.needsUpdate = true
    }
    glitchImage()
    {
        // Generate random access to choose a random glitch sound
        this.randomAcces = Math.floor(Math.random() * this.$glitchSounds.length)

        // Play current glitch sound and init the
        this.$glitchSounds[this.randomAcces].play()
        this.$glitchSounds[this.randomAcces].currentTime = 0
        
        // Generate any part of glitch
        for (let i = 0; i < this.randomInterval(1, 13); i++) { // RandomInterval generate the number of cut on the image per frame
            
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height;
            this.spliceWidth = this.width - this.x;
            this.spliceHeight = this.randomInterval(5, this.height / 3);
            this.context.drawImage(this.$canvas, 0, this.y, this.spliceWidth, this.spliceHeight, this.x, this.y, this.spliceWidth, this.spliceHeight);
            this.context.drawImage(this.$canvas, this.spliceWidth, this.y, this.x, this.spliceHeight, 0, this.y, this.x, this.spliceHeight);
        }

        // Clear glitch
        setTimeout(() => {
            this.context.clearRect(0, 0, this.width, this.height)
            this.initGlitchCanvas()
            this.drawGlitchCanvas()
            

        }, this.randomInterval(this.glitchDuration.min, this.glitchDuration.max)) // RandomInterval determine the glitch duration
    }
    randomInterval(a, b) {

        return ~~(Math.random() * (b - a) + a)
    }
    keyboardLayer()
    {
        const color = 0xa8ada8
        const darker = 0x858989

        const keyboard = new THREE.Object3D
        keyboard.position.z = 0.2
        keyboard.position.y = 0.0545
        keyboard.position.x = -0.12
        keyboard.rotation.x = 0.2

        // FIRST LINE
        // esc
        keyboard.esc = geometry.topMapBox(0.01, 0.01, 0.01, 0, 0, 0, darker, this.textures.keyboard[0])

        // F1 to F10
        keyboard.f = []
        let spacing = 0.018

        for(let i = 1; i <= 10; i++) 
        {
            keyboard.f.push(geometry.topMapBox(0.014, 0.01, 0.01, spacing, 0, 0, darker, this.textures.keyboard[i]))
            spacing+= 0.016
        }
        
        // del
        keyboard.del = geometry.topMapBox(0.01, 0.01, 0.01, spacing + 0.004, 0, 0, darker, this.textures.keyboard[11])

        keyboard.add(keyboard.esc)
        for(const fKeys of keyboard.f) { keyboard.add(fKeys) }
        keyboard.add(keyboard.del)

        // SECOND LINE
        // back quote
        spacing = 0.002
        keyboard.backQuote = geometry.topMapBox(0.014, 0.01, 0.01, spacing, 0, 0.012, color, this.textures.keyboard[12])

        // 1 to |
        spacing += 0.014
        keyboard.numbers = []

        for(let i = 13; i <= 25; i++) 
        {
            keyboard.numbers.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.012, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        // back space
        spacing += 0.005
        keyboard.backSpace = geometry.topMapBox(0.02, 0.01, 0.01, spacing, 0, 0.012, color, this.textures.keyboard[26])

        keyboard.add(keyboard.backQuote)
        for(const numbersKeys of keyboard.numbers) { keyboard.add(numbersKeys) }
        keyboard.add(keyboard.backSpace)

        // pav7 to pav9
        spacing += 0.028
        keyboard.pav7ToPav9 = []

        for(let i = 27; i <= 29; i++) 
        {
            keyboard.pav7ToPav9.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.012, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const pav7ToPav9Key of keyboard.pav7ToPav9) { keyboard.add(pav7ToPav9Key) }

        // THIRD
        // tab
        spacing = 0.0054
        keyboard.tab = geometry.topMapBox(0.021, 0.01, 0.01, spacing, 0, 0.024, color, this.textures.keyboard[30])

        // a to openingBrace
        spacing+= 0.0176
        keyboard.azer = []
        for(let i = 31; i <= 42; i++) 
        {
            keyboard.azer.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.024, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        // Push keys in array
        for(let i = 0; i < keyboard.azer.length - 2; i++) {
            this.keys.push(keyboard.azer[i])
        }

        // return right
        spacing+= 0.0015
        keyboard.returnRight = geometry.topMapBox(0.013, 0.01, 0.012, spacing, 0, 0.025, color)

        // help
        spacing+= 0.0134
        keyboard.help = geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.024, color, this.textures.keyboard[44])

        keyboard.add(keyboard.tab)
        for(const azerKey of keyboard.azer) { keyboard.add(azerKey) }
        keyboard.add(keyboard.returnRight)
        keyboard.add(keyboard.help)

        // pav4 to pav6
        spacing += 0.023
        keyboard.pav7ToPav9 = []

        for(let i = 45; i <= 47; i++) 
        {
            keyboard.pav7ToPav9.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.024, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const pav7ToPav9Key of keyboard.pav7ToPav9) { keyboard.add(pav7ToPav9Key) }

        // FOUTH
        // ctrl to quote
        spacing = 0
        keyboard.ctrlToQuote = []
        for(let i = 48; i <= 60; i++) 
        {
            keyboard.ctrlToQuote.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.036, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const ctrlToQuoteKey of keyboard.ctrlToQuote) { keyboard.add(ctrlToQuoteKey) }

        // Push keys in array
        for(let i = 2; i < keyboard.ctrlToQuote.length - 2; i++) {
            this.keys.push(keyboard.ctrlToQuote[i])
        }

        // return left
        spacing+= 0.007
        keyboard.returnLeft = geometry.topMapBox(0.024, 0.01, 0.01, spacing, 0, 0.036, color, this.textures.keyboard[61])

        keyboard.add(keyboard.returnLeft)

        // top arrow
        spacing+= 0.019
        keyboard.topArrow = geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.036, color, this.textures.keyboard[62])

        keyboard.add(keyboard.topArrow)

        // pav1 to pav3
        spacing += 0.023
        keyboard.pav7ToPav9 = []

        for(let i = 63; i <= 65; i++) 
        {
            keyboard.pav7ToPav9.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.036, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const pav7ToPav9Key of keyboard.pav7ToPav9) { keyboard.add(pav7ToPav9Key) }

        //FIFTH LINE
        // leftShift
        spacing = 0.0085
        keyboard.leftShift = geometry.topMapBox(0.027, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[66])

        keyboard.add(keyboard.leftShift)

        // m to interrogationDot
        spacing += 0.0204
        keyboard.mToInterrogationDot = []
        for(let i = 67; i <= 76; i++) 
        {
            keyboard.mToInterrogationDot.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const mToInterrogationDotKey of keyboard.mToInterrogationDot) { keyboard.add(mToInterrogationDotKey) }

        // Push keys in array
        for(let i = 0; i < keyboard.mToInterrogationDot.length - 3; i++) {
            this.keys.push(keyboard.mToInterrogationDot[i])
        }

        // rightShift
        spacing += 0.0076
        keyboard.rightShift = geometry.topMapBox(0.025, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[77])

        keyboard.add(keyboard.rightShift)


        // leftArrow to rightArrow
        spacing += 0.0195
        keyboard.leftArrowToRightArrow = []
        for(let i = 78; i <= 79; i++) 
        {
            keyboard.leftArrowToRightArrow.push(geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[i]))
            spacing+= 0.012
        }

        for(const leftArrowToRightArrowKey of keyboard.leftArrowToRightArrow) { keyboard.add(leftArrowToRightArrowKey) }

        // 0
        spacing+= 0.011
        keyboard.pav0 = geometry.topMapBox(0.022, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[80])

        keyboard.add(keyboard.pav0)

        // pavDot
        spacing+= 0.018
        keyboard.pavDot = geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.048, color, this.textures.keyboard[81])

        keyboard.add(keyboard.pavDot)

        // SIX
        // leftAlt to fillA
        spacing = 0.015
        keyboard.leftAltTofillA = []
        for(let i = 82; i <= 83; i++) 
        {
            keyboard.leftAltTofillA.push(geometry.topMapBox(0.014, 0.01, 0.01, spacing, 0, 0.060, color, this.textures.keyboard[i]))
            spacing+= 0.016
        }

        for(const leftAltTofillAKey of keyboard.leftAltTofillA) { keyboard.add(leftAltTofillAKey) }

        // space
        spacing += 0.036
        keyboard.space = geometry.topMapBox(0.086, 0.01, 0.01, spacing, 0, 0.060, color)

        keyboard.add(keyboard.space)

        // strokeA to rightAlt
        spacing += 0.052
        keyboard.strokeAToRightAlt = []
        for(let i = 85; i <= 86; i++) 
        {
            keyboard.strokeAToRightAlt.push(geometry.topMapBox(0.014, 0.01, 0.01, spacing, 0, 0.060, color, this.textures.keyboard[i]))
            spacing+= 0.016
        }

        for(const strokeAToRightAltKey of keyboard.strokeAToRightAlt) { keyboard.add(strokeAToRightAltKey) }

        // bottom arrow
        spacing += 0.0145
        keyboard.bottomArrow = geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.060, color, this.textures.keyboard[87])

        keyboard.add(keyboard.bottomArrow)

        // pavHorizontalBar
        spacing+= 0.0235
        keyboard.pavHorizontalBar = geometry.topMapBox(0.01, 0.01, 0.01, spacing, 0, 0.060, color, this.textures.keyboard[88])

        keyboard.add(keyboard.pavHorizontalBar)

        // pavEnter
        spacing+= 0.018
        keyboard.pavEnter = geometry.topMapBox(0.022, 0.01, 0.01, spacing, 0, 0.060, color, this.textures.keyboard[89])

        keyboard.add(keyboard.pavEnter)

        // BASE
        // bottom
        keyboard.bottom = geometry.topMapBox(0.26, 0.01, 0.094, 0.1144, - 0.01, 0.028, color)
        keyboard.bottom.castShadow = true

        // left
        keyboard.left = geometry.topMapBox(0.009, 0.006, 0.094, -0.0111, - 0.002, 0.028, color)
        keyboard.left.castShadow = true

        // right
        keyboard.right = geometry.topMapBox(0.009, 0.006, 0.094, 0.2399, - 0.002, 0.028, color)
        keyboard.right.castShadow = true

        // front
        keyboard.front = geometry.topMapBox(0.26, 0.006, 0.009, 0.1144, - 0.002, 0.0705, color)
        keyboard.front.castShadow = true

        // back        
        keyboard.back = geometry.topMapBox(0.26, 0.006, 0.013, 0.1144, - 0.002, - 0.0126, color)
        keyboard.back.castShadow = true

        // cornerFrontLeft        
        keyboard.cornerFrontLeft = geometry.topMapBox(0.013, 0.006, 0.0108, -0.0001, - 0.002, 0.0606, color)

        // cornerArrowLeft        
        keyboard.cornerArrowLeft = geometry.topMapBox(0.015, 0.006, 0.0108, 0.1673, - 0.002, 0.0606, color)

        // cornerArrowRight        
        keyboard.cornerArrowRight = geometry.topMapBox(0.011, 0.006, 0.0108, 0.1932, - 0.002, 0.0606, color)

        // cornerTopFirst        
        keyboard.cornerTopFirst = geometry.topMapBox(0.003, 0.006, 0.0108, 0.008, - 0.002, - 0.0008, color)

        // cornerTopSecond        
        keyboard.cornerTopSecond = geometry.topMapBox(0.005, 0.006, 0.0108, 0.1729, - 0.002, - 0.0008, color)

        // cornerTopThird        
        keyboard.cornerTopThird = geometry.topMapBox(0.046, 0.006, 0.0108, 0.2125, - 0.002, - 0.0008, color)

        // cornerTopfouth        
        keyboard.cornerTopfouth = geometry.topMapBox(0.009, 0.006, 0.0365, 0.194, - 0.002, 0.02284, color)

        // cornerTopfifth        
        keyboard.cornerTopfifth = geometry.topMapBox(0.004, 0.006, 0.0142, 0.1965, - 0.002, 0.0481, color)

        // LEG
        // leg        
        keyboard.leg = geometry.topMapBox(0.26, 0.016, 0.005, 0.1144, - 0.023, - 0.01, color)
        keyboard.leg.castShadow = true

        keyboard.add(keyboard.bottom)
        keyboard.add(keyboard.left)
        keyboard.add(keyboard.right)
        keyboard.add(keyboard.front)
        keyboard.add(keyboard.back)
        keyboard.add(keyboard.cornerFrontLeft)
        keyboard.add(keyboard.cornerArrowLeft)
        keyboard.add(keyboard.cornerArrowRight)
        keyboard.add(keyboard.cornerTopFirst)
        keyboard.add(keyboard.cornerTopSecond)
        keyboard.add(keyboard.cornerTopThird)
        keyboard.add(keyboard.cornerTopfouth)
        keyboard.add(keyboard.cornerTopfifth)
        keyboard.add(keyboard.leg)

        this.scene.add(keyboard)
        this.key = keyboard
    }
    mouseLayer()
    {
        const color = 0xa8ada8
        const darker = 0x858989
        const mouse = new THREE.Object3D
        mouse.position.x = 0.18
        mouse.position.y = 0.03
        mouse.position.z = 0.24

        // BASE
        mouse.base = geometry.box(0.044, 0.012, 0.06, 0, 0, 0, color)
        mouse.base.castShadow = true

        mouse.frontLeft = geometry.box(0.008, 0.012, 0.016, - 0.018, 0.0028, - 0.0204, color)
        mouse.frontLeft.rotation.x = - 0.3
        mouse.frontLeft.castShadow = true

        mouse.frontRight = geometry.box(0.008, 0.012, 0.016, 0.018, 0.0028, - 0.0204, color)
        mouse.frontRight.rotation.x = - 0.3
        mouse.frontRight.castShadow = true

        mouse.frontMiddle = geometry.box(0.028, 0.012, 0.004, 0, 0.001, - 0.0262, color)
        mouse.frontMiddle.rotation.x = - 0.3

        mouse.bottom = geometry.box(0.044, 0.012, 0.018, 0, 0.0026, 0.0198, color)
        mouse.bottom.rotation.x = 0.28
        mouse.bottom.castShadow = true

        mouse.middleBack = geometry.box(0.044, 0.005, 0.0235, 0, 0.0083, 0.0012, color)
        mouse.middleBack.castShadow = true

        mouse.middleLeft = geometry.box(0.008, 0.005, 0.012, - 0.018, 0.0083, - 0.009, color)
        mouse.middleLeft.castShadow = true

        mouse.middleRight = geometry.box(0.008, 0.005, 0.012, 0.018, 0.0083, - 0.009, color)
        mouse.middleRight.castShadow = true

        mouse.middleCenter = geometry.box(0.004, 0.005, 0.012, 0, 0.0083, - 0.009, color)
        mouse.middleCenter.castShadow = true

        mouse.middleCenterInclined = geometry.box(0.004, 0.012, 0.016, 0, 0.0028, - 0.0204, color)
        mouse.middleCenterInclined.rotation.x = - 0.3

        mouse.leftClick = geometry.box(0.01, 0.012, 0.014, - 0.008, 0.005, - 0.018, darker)
        mouse.leftClick.rotation.x = - 0.2

        mouse.rightClick = geometry.box(0.01, 0.012, 0.014, 0.008, 0.005, - 0.018, darker)
        mouse.rightClick.rotation.x = - 0.2


        mouse.add(mouse.base)
        mouse.add(mouse.frontLeft)
        mouse.add(mouse.frontRight)
        mouse.add(mouse.frontMiddle)
        mouse.add(mouse.bottom)
        mouse.add(mouse.middleBack)
        mouse.add(mouse.middleLeft)
        mouse.add(mouse.middleRight)
        mouse.add(mouse.middleCenter)
        mouse.add(mouse.middleCenterInclined)
        mouse.add(mouse.leftClick)
        mouse.add(mouse.rightClick)

        this.mouseLayer = mouse
        this.mouseLeftClick = mouse.leftClick
        this.mouseRightClick = mouse.rightClick
        this.scene.add(mouse)
    }
    desk()
    {
        const desk = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.05, 2.2),
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0 })
        )
        desk.position.y = - 0.6
        desk.position.z = 0.4

        this.scene.add(desk)
    }
    floor()
    {
        const floor = new THREE.Mesh(
            new THREE.BoxGeometry(100, 0.05, 100),
            new THREE.MeshStandardMaterial({ color: 0xafafff, metalness: 0, roughness: 0 }) // afafff
        )
        // floor.position.y = - 0.6
        floor.position.z = 0.4
        this.floor = floor
        floor.receiveShadow = true
        this.scene.add(floor)
    }
    keyPush(event)
    {
        for(let i = 0; i < this.keys.length; i++) 
            {
                if(event.keyCode == this.keyBindings[i].keyCode) 
                {
                    this.keys[i].position.y = - 0.003
                    document.addEventListener('keyup', (event) => {
                        this.keys[i].position.y = 0
                    })
                } 
        }
    }
    clickPush(event)
    {
        if(event.button == 0) 
        {
            this.mouseLeftClick.position.y = 0.002
            document.addEventListener('mouseup', (event) => {
                this.mouseLeftClick.position.y = 0.005
            })
        }
    }
    moving(event)
    {
        // Forward
        if(event.keyCode == 90) 
        {
            this.move.forward = true
            this.move.backward = false
            document.addEventListener('keyup', (event) => {
                event.keyCode == 90 ? this.move.forward = false : false
            })
        }

        // Backward
        else if(event.keyCode == 83)
        {
            this.move.backward = true
            this.move.forward = false
            document.addEventListener('keyup', (event) => {
                event.keyCode == 83 ? this.move.backward = false : false
            })
        }

        // Left
        else if(event.keyCode == 81)
        {
            this.move.left = true
            this.move.right = false
            document.addEventListener('keyup', (event) => {
                event.keyCode == 81 ? this.move.left = false : false
            })
        }

        // Right
        else if(event.keyCode == 68)
        {
            this.move.right = true
            this.move.left = false
            document.addEventListener('keyup', (event) => {
                event.keyCode == 68 ? this.move.right = false : false
            })
        }
        
        document.addEventListener('keyup', (event) => {
        if(!this.move.forward && !this.move.backward && !this.move.left && !this.move.right) 
        {
                this.move.breathSpeed = 500
                this.move.breathAmplitude = 80
            } 
        })

        if(this.move.forward || this.move.backward || this.move.left || this.move.right)
        {
            this.move.breathSpeed = 100
            this.move.breathAmplitude = 50
        }

    }
    footStepsPlay()
    {
        let randomAccess
        let lastRandomAccess
        
        setInterval(() => {
            while(lastRandomAccess == randomAccess)
            {
                randomAccess = Math.floor(Math.random() * this.footStepsSounds.length)
            }

            
            if(this.move.forward || this.move.backward || this.move.left || this.move.right)
            {
                this.footStepsSounds[randomAccess].currentTime = 0
                this.footStepsSounds[randomAccess].play()
            }
            lastRandomAccess = randomAccess 
        }, 600)


        // window.requestAnimationFrame(this.footStepsPlay.bind(this))
    }
    takeOn()
    {
        this.screen.add(this.lcd)
        this.scene.add(this.glitchLight)
        this.scene.add(this.pointLightTwo)
    }
    animate() 
    {
        window.requestAnimationFrame(this.animate.bind(this))

        this.glitchLight.power = Math.random() * 0.6
        

        this.objectCamera.lookAt(- this.monitor.position)

        this.objectCamera.rotation.y = - 0.13 - this.mouse.x
        this.objectCamera.rotation.x = 0.1 - this.mouse.y

        // Breathing
        this.objectCamera.position.y = 0.6 + Math.sin((Date.now()) / this.move.breathSpeed) / this.move.breathAmplitude

        this.move.forward ? this.objectCamera.position.z -= 0.014 : false
        this.move.backward ? this.objectCamera.position.z += 0.014 : false
        this.move.left ? this.objectCamera.position.x -= 0.014 : false
        this.move.right ? this.objectCamera.position.x += 0.014 : false

        this.render() 
    }
}

