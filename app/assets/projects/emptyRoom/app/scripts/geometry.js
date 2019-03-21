const geometry = (function () 
{

    const g = {}
    
    // Une variable de la librairy
    g.PI = 3.141592

    // Une fonction de la librairy appellée avec NomDeLaLibrairy.Box (quand t'as pas besoin d'instancier unt ruc)
    g.box = (width, height, depth, x = 0, y = 0, z = 0, hexaColor = 0x00ffff, mapTexture = false, normalMapTexture = false,) => 
    {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({ map: mapTexture, normalMap: normalMapTexture, color: hexaColor, metalness: 0.1, roughness: 0.6 }) // 0.1, 0.8
        )
        box.position.x = x
        box.position.y = y
        box.position.z = z

        return box
    }

    g.topMapBox = (width, height, depth, x, y, z, color, topMap = false) => 
    {
        const geometry = new THREE.BoxGeometry(width, height, depth)

        const boxMaterials = 
        [
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // RIGHT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // LEFT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, map: topMap, side: THREE.DoubleSide}), // TOP SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // BOTTOM SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // FRONT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}) // BACK SIDE
        ]

        const box = new THREE.Mesh(geometry, boxMaterials)

        box.position.x = x
        box.position.y = y
        box.position.z = z

        return box
    }

    g.topMapCylinder = (topRadius, bottomRadius, height, depth, x, y, z, color, topMap) => 
    {
        const geometry = new THREE.BoxGeometry(width, height, depth)

        const boxMaterials = 
        [
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // RIGHT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // LEFT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, map: topMap, side: THREE.DoubleSide}), // TOP SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // BOTTOM SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}), // FRONT SIDE
            new THREE.MeshStandardMaterial({color: color, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide}) // BACK SIDE
        ]

        const box = new THREE.Mesh(geometry, boxMaterials)

        box.position.x = x
        box.position.y = y
        box.position.z = z

        return box
    }

    g.plan = (width, height, x = 0, y = 0, z = 0, rotationX = 0, rotationY = 0, rotationZ = 0, color = 'green', mapTexture = false, normalMapTexture = false,) =>
    {
        const plan = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshPhysicalMaterial({ map: mapTexture, normalMap: normalMapTexture, color: color, metalness: 0.1, roughness: 0.8 }) // 0.1, 0.8
        )
        plan.position.x = x
        plan.position.y = y
        plan.position.z = z

        plan.rotation.x = rotationX
        plan.rotation.y = rotationY
        plan.rotation.z = rotationZ

        return plan
    }

    g.text = (font, string, color = 'green', mapTexture = false, normalMapTexture = false) => 
    {
        const text = new THREE.Mesh(
            new THREE.TextGeometry(string, {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            }),
            new THREE.MeshPhysicalMaterial({ map: mapTexture, normalMap: normalMapTexture, color: color, metalness: 0.1, roughness: 0.8 }) // 0.1, 0.8
        )
        
        return text
    }
    
    // Une classe de la librairy (quand t'as besoin d'instancier un truc)
    // g.Class = class {
    //     constructor (;;;) {
    //         ...
    //     }
    // }

    return g

}())
