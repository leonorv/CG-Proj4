class PointLight extends THREE.PointLight {
    constructor() {
        'use strict'
        super(0xFFF8BC, 2, 50);
        this.add( new THREE.Mesh(new THREE.SphereGeometry( 1, 10, 10 ), new THREE.MeshBasicMaterial( { color: 0xFFF8BC } ) ) );
        this.position.set(10, 1, 10);
        scene.add(this);
    }

    changeStatus() {
        if (this.visible) this.visible = false;
        else this.visible = true;
    }
}


class DirLight extends THREE.DirectionalLight {
    constructor() {
        'use strict'
        super(0xfffefe, 1);
        var targetObject = new THREE.Object3D();
        targetObject.position.set(10,0,10);
        scene.add(targetObject);
        this.target = targetObject;
        scene.add(this);
    }

    changeStatus() {
        if (this.visible) this.visible = false;
        else this.visible = true;
    }
}