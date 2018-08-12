<script>
import propsBinder from '../utils/propsBinder.js';
import { LeafletMixin } from '../utils/Leaflet.js';

const props = {
  imagePath: {
    type: String,
    custom: true,
    default: "",
  }
};

export default {
  name: 'LIconDefault',
  props: props,
  mixins: [
    LeafletMixin,
  ],
  mounted() {
    this.$leaflet().Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, props);
  },
  methods: {
    setImagePath(newVal, oldVal) {
      this.$leaflet().Icon.Default.imagePath = newVal;
    },
  },
  render() {
    return null;
  }
};
</script>
