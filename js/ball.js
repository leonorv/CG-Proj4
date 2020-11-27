class Ball extends THREE.Object3D {
    constructor(x, y, z, radius) {
        'use strict'
        super();
        var textureLoader = new THREE.TextureLoader();
        var ball_texture = textureLoader.load("golf_ball_texture.jpg");
        ball_texture.wrapS = THREE.RepeatWrapping;
        ball_texture.wrapT = THREE.RepeatWrapping;
        ball_texture.repeat.set( 1, 1 );

        this.geometry = new THREE.SphereGeometry( 2, 32, 32 );
        this.phongMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, map: ball_texture, specular: 0xffffff, shininess: 50} );
        this.basicMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: ball_texture});
        this.materials = [this.phongMaterial, this.basicMaterial];
        this.mesh = new THREE.Mesh(this.geometry, this.materials[0]);
        this.add(this.mesh);
        this.position.set(x, y, z);
        scene.add(this);
    }

    changeWireframeMode() {
        this.material.wireframe = !this.material.wireframe;
    }

    changeLightCalculationStatus() {
        if(this.mesh.material == this.phongMaterial) this.mesh.material = this.materials[1];
        else this.mesh.material = this.materials[0];
    }
}