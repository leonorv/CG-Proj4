var camera, scene, renderer, skybox, ball, pointLight, dirLight, pauseScreen, controls, camToSave = {}, toReset = false;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var fov = 50; //Camera frustum vertical field of view.
var far = 1000; //Camera frustum far plane.
var near = 1; //Camera frustum near plane.
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT; //Camera frustum aspect ratio.
var frustumSize = 100;
var clock, delta, grass;
var onPause = false;


var cameraPerspective, cameraOrtho;

var keys = {
    68: false,
    80: false,
    87: false,
    83: false,
    73: false,
    66: false
}


function createGolf(grass, flag) {
    golf = new Golf(grass, flag);
}

function createBall() {
    ball = new Ball(0, 2, 0, 2);
}

function createLights() {
    pointLight = new PointLight();
    dirLight = new DirLight();
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    //scene.add(new THREE.AxisHelper(10));


    createGolf(new Grass(0,0,0,100,100), new Flag(20,0,20,0.5,30,9));
    createBall();
    createLights();
}

function createCamera() {
    'use strict';
    cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, 0.5* frustumSize / 2, 0.5 * frustumSize / - 2, 2, 1000);
    cameraOrtho.position.set(0,0,120);
    scene.add(cameraOrtho);

    cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far);
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
        './cubemap/ny.png',
        './cubemap/py.png',
        './cubemap/pz.png',
        './cubemap/nz.png',
    ]);
    scene.background = texture;
}

function createOrbitControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    camToSave.position = camera.position.clone();
    camToSave.rotation = camera.rotation.clone();
    camToSave.controlCenter = controls.target.clone();
}

function restoreCamera(position, rotation, controlCenter){
    camera.position.set(position.x, position.y, position.z);
    camera.rotation.set(rotation.x, rotation.y, rotation.z);

    controls.target.set(controlCenter.x, controlCenter.y, controlCenter.z);
    controls.update();
}

function changeWireframeMode() {
    ball.changeWireframeMode();
    golf.changeWireframeMode();
}

function changeSceneStatus() {
    if(clock.running) clock.stop();
    else clock.start();
    if (camera == cameraPerspective) {
        pauseScreen = new PauseScreen();
        scene.add(pauseScreen)
        camera = cameraOrtho;
    }
    else {
        camera = cameraPerspective;
        scene.remove(pauseScreen);
    }
    if (toReset) resetScene();
    onPause = !onPause;
}

function changeLightCalculationStatus() {
    ball.changeLightCalculationStatus();
    golf.changeLightCalculationStatus();
}

function resetScene() {
    ball.reset();
    golf.reset();
    pointLight.reset();
    dirLight.reset();
    camera = cameraPerspective;
    restoreCamera(camToSave.position, camToSave.rotation, camToSave.controlCenter);
    toReset = false;

}

function onResize() {
    'use strict';

    SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    if (onPause) renderer.setSize(PAUSE_SCREEN_WIDTH, PAUSE_SCREEN_HEIGHT);
    else renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

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
        case 66: //d - turn off/on dir light
            ball.changeJumpingStatus();
            onResize();
            break;
        case 68: //d - turn off/on dir light
            dirLight.changeStatus();
            onResize();
            break;
        case 80: //p - turn off/on point light
            pointLight.changeStatus();
            onResize();
            break;
        case 87: //w - wireframe model
            changeWireframeMode();
            onResize();
            break;
        case 73: //i - ilumination calculations
            changeLightCalculationStatus();
            onResize();
            break;
        case 83: //s - stop/start scene
            changeSceneStatus();
            onResize();
            break;
        case 82: //r - reset scene
            toReset = true;
            onResize();
            break;

    }
}

function updateScene() {
    golf.flag.rotate(delta);
    if (ball.isJumping) {
        ball.step += 0.04;
        ball.position.y = ball.radius + Math.abs(10 * (Math.sin(ball.step)));
        ball.position.z = 7 - 7 * (Math.cos(ball.step));
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
    updateScene();
    render();
    requestAnimationFrame(animate);
}