import navigation from '/content/components/navigation/navigation.js';
import navigationLink from '/content/components/navigationLink/navigationLink.js';
import home from '/content/pages/home/home.js';
import visualizer from '/content/pages/visualizer/visualizer.js';
import controller from '/content/components/controller/controller.js';
import history from '/content/components/history/history.js';
import button from '/content/components/button/button.js';
import colorPicker from '/content/components/colorPicker/colorPicker.js';
import overlay from '/content/pages/overlay/overlay.js';

customElements.define('navigation-links', navigation);
customElements.define('navigation-link', navigationLink);
customElements.define('home-page', home);
customElements.define('visualizer-page', visualizer);
customElements.define('controller-display', controller);
customElements.define('controller-history', history);
customElements.define('controller-button', button);
customElements.define('color-picker', colorPicker);
customElements.define('overlay-page', overlay);