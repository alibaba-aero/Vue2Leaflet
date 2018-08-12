<script>
import propsBinder from '../utils/propsBinder.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  zoomInText: {
    type: String,
    default: '+'
  },
  zoomInTitle: {
    type: String,
    default: 'Zoom in'
  },
  zoomOutText: {
    type: String,
    default: '-'
  },
  zoomOutTitle: {
    type: String,
    default: 'Zoom out'
  },
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'LControlZoom',
  props: props,
  mixins: [
    LeafletMixin,
  ],
  mounted() {
    const options = this.options;
    const otherPropertytoInitialize = [ "zoomInText", "zoomInTitle", "zoomOutText", "zoomOutTitle", "position" ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = this.$leaflet().control.zoom(options);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy() {
    this.mapObject.remove();
  },
  render() {
    return null;
  }
};
</script>
