
const Vector3 = require('../data-structures/vector3');

const Scene = require('../scenes/scene');

const ImagePlane = require('../view/image-plane');
const View = require('../view');

async function main() {
  
  let scene = new Scene(-2, 2, -2, 2, 1, 6);
  // scene.randomizeAmbientLight();
  scene.generateBrightLights(1);
  scene.addGiantEarth();
  scene.addTree();
  
  
  const view = View.createDefaultView();
  
  const farView = new View(
    new Vector3(0, 0, -5),
    view.imagePlane,
    256, 192
  );
  
  const closeView = new View(
    new Vector3(0, 0, -0.5),
    view.imagePlane,
    512, 384
  );
  
  const leftSideView = new View(
    new Vector3(-4, 0, 2.5),
    new ImagePlane(
      new Vector3(-3, 0.75, 3.5),
      new Vector3(-3, 0.75, 1.5),
      new Vector3(-3, -0.75, 3.5),
      new Vector3(-3, -0.75, 1.5),
    ),
    512, 384
  );
  
  const rightSideView = new View(
    new Vector3(4, 0, 2.5),
    new ImagePlane(
      new Vector3(3, 0.75, 1.5),
      new Vector3(3, 0.75, 3.5),
      new Vector3(3, -0.75, 1.5),
      new Vector3(3, -0.75, 3.5),
    ),
    512, 384
  );
  
  const reverseView = new View(
    new Vector3(0, 0, 6),
    new ImagePlane(
      new Vector3(1, 0.75, 5),
      new Vector3(-1, 0.75, 5),
      new Vector3(1, -0.75, 5),
      new Vector3(-1, -0.75, 5),
    ),
    512, 384
  );
  
  const topView = new View(
    new Vector3(0, 2, 2.5),
    new ImagePlane(
      new Vector3(-1, 1, 3.25),
      new Vector3(1, 1, 3.25),
      new Vector3(-1, 1, 1.75),
      new Vector3(1, 1, 1.75),
    ),
    512, 384
  );
  
  const bottomView = new View(
    new Vector3(0, -2, 2.5),
    new ImagePlane(
      new Vector3(-1, -1, 1.75),
      new Vector3(1, -1, 1.75),
      new Vector3(-1, -1, 3.25),
      new Vector3(1, -1, 3.25),
    ),
    512, 384
  );
  
  let center = new Vector3(0, 0, 2.5);
  center = scene.lights[0].location;
  let dir = new Vector3(Math.random(), Math.random(), Math.random()).normalized();
  
  let dist = dir._scale(4);
  let cam = center.plus(dist);
  let ipCenter = cam._minus(dir);
  
  let abX = Math.abs(dir.x);
  let abY = Math.abs(dir.y);
  let abZ = Math.abs(dir.z);
  
  var ip  = null;
  
  if (abX > abY && abX > abY) {
    // x is most significant change
    if (dir.x > 0) ip = ImagePlane.lookDownX(ipCenter);
    else ip = ImagePlane.lookUpX(ipCenter);
  }
  else if (abY > abX && abY > abZ) {
    if (dir.y > 0) ip = ImagePlane.lookDownY(ipCenter);
    else ip = ImagePlane.lookUpY(ipCenter);
  }
  else if (abZ > abX && abZ > abY) {
    if (dir.z > 0) ip = ImagePlane.lookDownZ(ipCenter);
    else ip = ImagePlane.lookUpZ(ipCenter);
  }
  else {
    ip = ImagePlane.lookUpZ(ipCenter);
  }
  
  let randomView = new View(
    cam,
    ip,
    512, 384
  );
  
  
  
  console.log("Writing main image.");
  let image = await view.viewScene(scene);
  image.writeImage("out/main.png");
  
  console.log("Writing far image.");
  image = await farView.viewScene(scene);
  image.writeImage("out/far.png");
  
  console.log("Writing left image.");
  image = await leftSideView.viewScene(scene);
  image.writeImage("out/left.png");
  
  console.log("Writing right image.");
  image = await rightSideView.viewScene(scene);
  image.writeImage("out/right.png");
  
  console.log("Writing reverse image.");
  image = await reverseView.viewScene(scene);
  image.writeImage("out/reverse.png");
  
  console.log("Writing top image.");
  image = await topView.viewScene(scene);
  image.writeImage("out/top.png");
  
  console.log("Writing bottom image.");
  image = await bottomView.viewScene(scene);
  image.writeImage("out/bottom.png");
  
  console.log("Writing random view image.");
  image = await randomView.viewScene(scene);
  image.writeImage("out/random.png");

}
module.exports =  main;
