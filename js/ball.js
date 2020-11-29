class Ball extends THREE.Object3D {
    constructor(x, y, z, radius) {
        'use strict'
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.isJumping = false;
        this.step = 0;
        this.radius = radius;
        var textureLoader = new THREE.TextureLoader();
        var ball_texture = textureLoader.load("image.png");
        //ball_texture.wrapS = THREE.RepeatWrapping
        //ball_texture.wrapT = THREE.RepeatWrapping
        //ball_texture.repeat.set( 0.8, 0.8 );

        this.geometry = new THREE.SphereGeometry( this.radius, 32, 16 );

        

        this.phongMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, bumpMap: ball_texture, bumpScale: 0.08, specular: 0xffffff, shininess: 40} );
        this.basicMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
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

    changeJumpingStatus() {
        this.isJumping = !this.isJumping;
    }

    reset() {
        this.position.set(this.x, this.y, this.z);
        this.mesh.material = this.phongMaterial;
        this.isJumping = false;
    }

}