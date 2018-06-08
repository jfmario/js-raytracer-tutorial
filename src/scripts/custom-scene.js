
const path = require('path');

const yaml = require('yamljs');

const Scene = require('../scenes/scene');

module.exports = async function(args) {
  
  let sceneName = args.scene;
  
  let components = {};
  let objects = {};
  
  let scene = yaml.load(path.resolve(__dirname, '..', '..', 'data',
    'scenes', `${sceneName}.yml`));
    
  for (let i = 0; i < scene.importObjects.length; ++i) {
    
    let objectsName = scene.importObjects[i];
    let objectYml = yaml.load(path.resolve(__dirname, '..', '..', 'data',
      'objects', `${objectsName}.yml`));
    objects[objectsName] = objectYml.define;
    
    for (let j = 0; j < objectYml.importComponents.length; ++j) {
      
      let componentsName = objectYml.importComponents[j];
      let componentsYml = yaml.load(path.resolve(__dirname, '..', '..', 'data',
        'components', `${componentsName}.yml`));
      components[componentsName] = componentsYml;
    }
  }
  
  let sceneObj = new Scene();
  let views = sceneObj.fromConfig(components, objects, scene);
  
  for (var i = 0; i < views.length; ++i) {
    
    var view = views[i];
    
    console.log(`Writing view ${i}.`);
    let image = await view.viewScene(sceneObj);
    image.writeImage(`out/v${i}.png`);
  };
}