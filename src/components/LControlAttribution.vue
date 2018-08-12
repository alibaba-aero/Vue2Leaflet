<script>
import propsBinder from '../utils/propsBinder.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  prefix: {
    type: String,
    default: 'Leaflet'
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
  name: 'LControlAttribution',
  props: props,
  mixins: [
    LeafletMixin,
  ],
  mounted() {
    const options = this.options;
    const otherPropertytoInitialize = [ 'prefix', 'position'];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = this.$leaflet().control.attribution(options);
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
