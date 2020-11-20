class Grass extends THREE.Object3D {
    constructor(x, y, z, width, height) {
        'use strict'
        super();
        this.width = width;
        this.height = height;
        this.material = new THREE.MeshPhongMaterial({color: 0xa3a38e});
        this.geometry = new THREE.PlaneGeometry(this.width, this.height);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.position.set(x, y, z);
        scene.add(this);
    }
}

class Flag extends THREE.Object3D {
    constructor(x, y, z, radius, height, side) {
        'use strict'
        super();
        this.stickMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});
        this.flagMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});
        this.stickGeometry = new THREE.CylinderGeometry(radius, radius, height, 30);
        this.flagGeometry = new FlagGeometry(height, side);
        this.stickMesh = new THREE.Mesh(this.stickGeometry, this.stickMaterial);
        this.flagMesh = new THREE.Mesh(this.flagGeometry, this.flagMaterial);
        this.add(this.stickMesh);
        this.stickMesh.add(this.flagMesh);
        scene.add(this);
        this.position.set(x, y+height/2, z);
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
}
