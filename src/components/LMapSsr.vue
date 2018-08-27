<script>
import LMap, { propsFactory } from './LMap.vue';
import { LeafletMixin } from '../utils/Leaflet.js';

export default {
  render(createElement) {
    const childs = [];
    if (this.isMounted) {
      const map = createElement(
        LMap,
        {
          props: this.$options.propsData,
          on: this.$listeners
        },
        [
          this.$slots.default
        ]
      )
      childs.push(map)
    };
    return createElement(
      'div',
      {
        class: [
          'vue2leaflet-map-ssr'
        ]
      },
      childs
    )
  },
  props: propsFactory(),
  components: {
    LMap
  },
  mixins: [
    LeafletMixin
  ],
  data() {
    return {
      isMounted: false,
    };
  },
  async mounted() {
    let leaflet = await this.$loadLeaflet();
    this.$emit('load', leaflet)
    this.isMounted = true;
  }
}
</script>