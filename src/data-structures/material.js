
import Color from './color';

class Material {
  
  /**
   * Creates a Material object.
   * @param {Color}  ambientConstant  Percentage of ambient light reflected by object. (black)
   * @param {Color}  diffuseConstant  Percentage of diffuse light reflected by object. (black)
   * @param {Color}  specularConstant Percentage of specular light reflected by object. (black)
   * @param {Float}  reflectivity     Percentage of diffuse light that should be reflected instead. (0.5)
   * @param {Number} shininess        Shininess of the object. (20)
   */
  constructor(ambientConstant=null, diffuseConstant=null, specularConstant=null, shininess=20, reflectivity=0.5) {
    
    let black = new Color(.5, .5, .5);
    if (ambientConstant === null) this.ambientConstant = black;
    else this.ambientConstant = ambientConstant;
    if (diffuseConstant === null) this.diffuseConstant = black;
    else this.diffuseConstant = diffuseConstant;
    if (specularConstant === null) this.specularConstant = black;
    else this.specularConstant = specularConstant;
    
    this.reflectiveConstant = this.diffuseConstant.asVector3()
      ._scale(reflectivity).asColor();
    this.diffuseConstant = this.diffuseConstant.asVector3()
      ._minus(this.reflectiveConstant.asVector3()).asColor();
    this.shininess = shininess;
    
    // console.log(this);
  }
}

export default Material;