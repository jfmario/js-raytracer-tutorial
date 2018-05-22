
import Scene from '../scenes/scene';
import View from '../view';

function main() {
  
  const view = View.createDefaultView();
  
  let scene = new Scene();
  // scene.randomizeAmbientLight();
  scene.generateBrightLights(1);
  scene.generateRandomSpheres(7);
  let image = view.viewScene(scene);
  
  image.renderInto(document.querySelector('body'));
}
export default main;
