class PauseScreen extends THREE.Object3D {
    constructor() {
        'use strict'
        super();
        var textureLoader = new THREE.TextureLoader();
        var pause_screen_texture = textureLoader.load("pause_screen_texture.png");
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: pause_screen_texture, side: THREE.DoubleSide});
        this.geometry = new THREE.BoxGeometry(100, 60, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.position.set(0, 0, 0);
    }
}