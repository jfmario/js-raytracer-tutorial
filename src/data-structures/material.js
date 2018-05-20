
import Color from './color';

class Material {
  
  /**
   * Creates a Material object.
   * @param {Color}  ambientConstant  Percentage of ambient light reflected by object. (black)
   * @param {Color}  diffuseConstant  Percentage of diffuse light reflected by object. (black)
   * @param {Color}  specularConstant Percentage of specular light reflected by object. (black)
   * @param {Number} shininess        Shininess of the object. (20)
   */
  constructor(ambientConstant=null, diffuseConstant=null, specularConstant=null, shininess=20) {
    
    let black = new Color(0, 0, 0);
    if (ambientConstant === null) this.ambientConstant = black;
    else this.ambientConstant = ambientConstant;
    if (diffuseConstant === null) this.diffuseConstant = black;
    else this.diffuseConstant = diffuseConstant;
    if (specularConstant === null) this.specularConstant = black;
    else this.specularConstant = specularConstant;
    
    this.shininess = shininess;
  }
}