class Grass extends THREE.Object3D {
    constructor(x, y, z, width, height) {
        'use strict'
        super();
        this.width = width;
        this.height = height;

        var textureLoader = new THREE.TextureLoader();
        var base_texture = textureLoader.load("base_grass.jpg");
        var bump_map = textureLoader.load("grass_bump_map.jpg");

        base_texture.wrapS = THREE.RepeatWrapping;
        base_texture.wrapT = THREE.RepeatWrapping;
        base_texture.repeat.set( 8, 8 );

        bump_map.wrapS = THREE.RepeatWrapping;
        bump_map.wrapT = THREE.RepeatWrapping;
        bump_map.repeat.set( 8, 8 );


        this.phongMaterial = new THREE.MeshPhongMaterial({map: base_texture, bumpMap: bump_map});
        this.basicMaterial = new THREE.MeshBasicMaterial({map: base_texture});
        this.materials = [this.phongMaterial, this.basicMaterial];
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.mesh = new THREE.Mesh(this.geometry, this.materials[0]);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.add(this.mesh);
        this.position.set(x, y, z);
        scene.add(this);
    }

    changeLightCalculationStatus() {
        if(this.mesh.material == this.phongMaterial) this.mesh.material = this.materials[1];
        else this.mesh.material = this.materials[0];
    }
}

class Flag extends THREE.Object3D {
    constructor(x, y, z, radius, height, side) {
        'use strict'
        super();
        this.stickPhongMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false, side: THREE.DoubleSide});
        this.stickBasicMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false, side: THREE.DoubleSide});
        this.stickMaterials = [this.stickPhongMaterial, this.stickBasicMaterial];

        this.flagPhongMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: false, side: THREE.DoubleSide});
        this.flagBasicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false, side: THREE.DoubleSide});
        this.flagMaterials = [this.flagPhongMaterial, this.flagBasicMaterial];

        this.stickGeometry = new THREE.CylinderGeometry(radius, radius, height, 10);
        this.flagGeometry = new FlagGeometry(height/2, side);
        this.stickMesh = new THREE.Mesh(this.stickGeometry, this.stickMaterials[0]);
        this.flagMesh = new THREE.Mesh(this.flagGeometry, this.flagMaterials[0]);
        this.add(this.stickMesh);
        this.stickMesh.add(this.flagMesh);
        scene.add(this);
        this.position.set(x, y+height/2, z);
    }

    changeWireframeMode() {
        this.stickMaterial.wireframe = !this.stickMaterial.wireframe;
        this.flagMaterial.wireframe = !this.flagMaterial.wireframe;
    }

    changeLightCalculationStatus() {
        if(this.stickMesh.material == this.stickPhongMaterial){
            this.stickMesh.material = this.stickMaterials[1];
            this.flagMesh.material = this.flagMaterials[1];
        }
        else {
            this.stickMesh.material = this.stickMaterials[0];
            this.flagMesh.material = this.flagMaterials[0];
        }
    }

    rotate(delta) {
        this.flagMesh.rotateY(1.2*delta);
    }
}

class FlagGeometry extends THREE.Geometry {
    constructor(height, side) {
        super();
        this.height = height;
        this.side = side;
        this.createVertices();
        this.faces.push(new THREE.Face3(0, 1, 2));
        this.computeFaceNormals();
    }

    createVertices() {
        this.vertices.push(new THREE.Vector3(0, this.height - this.side, 0)); //0
        this.vertices.push(new THREE.Vector3(0, this.height, 0)); //1
        this.vertices.push(new THREE.Vector3(this.side, this.height - this.side/2, 0)); //2
    }
}

class Golf extends THREE.Object3D {
    constructor(grass, flag) {
        'use strict'
        super();
        this.grass = grass;
        this.flag =  flag;
        grass.rotateX(-Math.PI/2);
    }

    changeWireframeMode() {
        this.grass.material.wireframe = !this.grass.material.wireframe;
        this.flag.changeWireframeMode();
    }

    changeLightCalculationStatus() {
        this.grass.changeLightCalculationStatus();
        this.flag.changeLightCalculationStatus();
    }
}
