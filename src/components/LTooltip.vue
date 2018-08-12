<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  content: {
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  }
};

export default {
  name: 'LTooltip',
  props: props,
  data() {
    return {
    }
  },
  mixins: [
    LeafletMixin
  ],
  mounted() {
    this.mapObject = this.$leaflet().tooltip(this.options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy() {
    if (this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
    }
  },
};
</script>
