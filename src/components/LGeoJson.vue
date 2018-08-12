<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  geojson: {
    type: [Object, Array],
    custom: true,
    default: () => ({}),
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
}

export default {
  name: 'LGeoJson',
  props: props,
  mixins: [
    LeafletMixin,
  ],
  mounted() {
    this.mapObject = this.$leaflet().geoJSON(this.geojson, this.options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: {
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    setGeojson(newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parentContainer.mapObject);
      } else {
        this.parentContainer.mapObject.removeLayer(this.mapObject);
      }
    },
  },
  beforeDestroy() {
    this.parentContainer.mapObject.removeLayer(this.mapObject);
  },
  render() {
    return null;
  }
};
</script>
