<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
};

export default {
  name: 'LLayerGroup',
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
    this.mapObject = this.$leaflet().layerGroup();
    propsBinder(this, this.mapObject, props);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
      this.parentContainer.addLayer(layer, true);
    },
    removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
      this.parentContainer.removeLayer(layer, true);
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
  },
};
</script>
