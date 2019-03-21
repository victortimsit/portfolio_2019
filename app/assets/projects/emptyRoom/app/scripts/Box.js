class Box 
{
    constructor(width, height, depth, x = 0, y = 0, z = 0, color = 'red') 
    {
        this.width = width
        this.height = height
        this.depth = depth
        this.x = x
        this.y = y
        this.z = z
        this.color = color

        // this.craft()
    }
    craft() 
    {
        const toto = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshStandardMaterial({ color: this.color, metalness: 0, roughness: 0.6 })
        )
        toto.position.x = this.x
        toto.position.y = this.y
        toto.position.z = this.z

        return toto
    }
}