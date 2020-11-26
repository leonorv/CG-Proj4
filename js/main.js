var camera, scene, renderer, skybox, ball, pointLight;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var fov = 50; //Camera frustum vertical field of view.
var far = 1000; //Camera frustum far plane.
var near = 1; //Camera frustum near plane.
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT; //Camera frustum aspect ratio.
var frustumSize = 100;
var clock, delta, grass;

var cameraPerspective;

var keys = {
}

function createGolf(grass, flag) {
    golf = new Golf(grass, flag);
}

function createBall() {
    var textureLoader = new THREE.TextureLoader();
    var ball_texture = textureLoader.load("golf_ball_texture.jpg");
    ball_texture.wrapS = THREE.RepeatWrapping;
    ball_texture.wrapT = THREE.RepeatWrapping;
    ball_texture.repeat.set( 1, 1 );

    ball_geometry = new THREE.SphereGeometry( 2, 32, 32 );
    ball_material = new THREE.MeshPhongMaterial( {color: 0xffffff, map: ball_texture} );
    ball = new THREE.Mesh(ball_geometry, ball_material );
    ball.position.set(0, 2, 0);
    scene.add(ball);
}

function createLights() {
    pointLight = new THREE.PointLight( 0xFFF8BC, 2, 50 );
    pointLight.add( new THREE.Mesh(new THREE.SphereGeometry( 1, 10, 10 ), new THREE.MeshBasicMaterial( { color: 0xFFF8BC } ) ) );
    pointLight.position.set(10, 1, 10);
	scene.add(pointLight);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    scene.add(new THREE.DirectionalLight( 0xffffff, 1));

    createGolf(new Grass(0,0,0,100,100), new Flag(20,0,20,0.25,10,3));
    createBall();
    createLights();
}

function createCamera() {
    'use strict';
    cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far);

    /*PERSPECTIVE POSITION*/
    cameraPerspective.position.set(35, 35, 35);
    cameraPerspective.lookAt(scene.position);
    scene.add(cameraPerspective);

    camera = cameraPerspective;
}

function createSkyBox() {
    var loader = new THREE.CubeTextureLoader();
    var texture = loader.load([
      './cubemap/px.png',
      './cubemap/nx.png',
      './cubemap/py.png',
      './cubemap/ny.png',
      './cubemap/pz.png',
      './cubemap/nz.png',
    ]);
    scene.background = texture;
}

function createOrbitControls() {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
}

function onResize() {
    'use strict';

    SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.left = - 0.5 * frustumSize * aspect / 2;
    camera.right = 0.5 * frustumSize * aspect / 2;
    camera.top = 0.5 * frustumSize / 2;
    camera.bottom = - 0.5 *  frustumSize / 2;
    camera.updateProjectionMatrix();
}

function onKeyDown(e) {
    'use strict';
    keys[e.keyCode] = true;

    switch(e.keyCode) {

    }
}

function onKeyUp(e) {
    'use strict';
    keys[e.keyCode] = false;
}

function render() {
    'use strict';
    delta = clock.getDelta();
    keyPressed(delta);
    renderer.render(scene, camera);
}

function keyPressed(delta) {

}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    clock.start();

    createScene();
    createCamera();
    createSkyBox();
    createOrbitControls();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}