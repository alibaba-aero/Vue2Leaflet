<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { LeafletMixin } from '../utils/Leaflet';

const props = {
  draggable: {
    type: Boolean,
    custom: true,
    default: false,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  },
  latLng: {
    type: [Object, Array],
    custom: true,
  },
  icon: {
    type: Object,
    custom: true,
    default: null,
  },
  zIndexOffset: {
    type: Number,
    custom: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'LMarker',
  props: props,
  data() {
    return {
      ready: false,
    }
  },
  mixins: [
    LeafletMixin,
  ],
  mounted() {
    const options = this.options;
    if (this.icon !== null) {
      const Icon = this.$leaflet().Icon;
      options.icon = new Icon(this.icon);
    }
    options.draggable = this.draggable;
    this.mapObject = this.$leaflet().marker(this.latLng, options);
    this.mapObject.on('move', (ev) => {
      if (Array.isArray(this.latLng)) {
        this.latLng[0] = ev.latlng.lat;
        this.latLng[1] = ev.latlng.lng;
      } else {
        this.latLng.lat = ev.latlng.lat;
        this.latLng.lng = ev.latlng.lng;
      }
    });
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
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
    setIcon(icon) {
      if (icon !== null) {
        const Icon = this.$leaflet().Icon;
        this.mapObject.setIcon(new Icon(icon));
      }
    },
    setLatLng(newVal) {
      if (newVal == null) {
        return;
      }

      if (this.mapObject) {
        let oldLatLng = this.mapObject.getLatLng();
        let newLatLng = {
          lat: newVal[0] || newVal.lat,
          lng: newVal[1] || newVal.lng,
        };
        if (newLatLng.lat != oldLatLng.lat || newLatLng.lng != oldLatLng.lng) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    }
  }
};
</script>
