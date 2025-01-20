import navigation from '/content/components/navigation/navigation.js';
import navigationLink from '/content/components/navigationLink/navigationLink.js';
import home from '/content/pages/home/home.js';
import visualizer from '/content/pages/visualizer/visualizer.js';
import controller from '/content/components/controller/controller.js';
import overlay from '/content/pages/overlay/overlay.js';

customElements.define('navigation-links', navigation);
customElements.define('navigation-link', navigationLink);
customElements.define('home-page', home);
customElements.define('visualizer-page', visualizer);
customElements.define('controller-display', controller);
customElements.define('overlay-page', overlay);