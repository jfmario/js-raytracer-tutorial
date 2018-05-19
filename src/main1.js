
import View from './view';

function main() {
  
  const view = View.createDefaultView();
  let image = view.colorSnapshot();
  
  image.renderInto(document.querySelector('body'));
}
export default main;
