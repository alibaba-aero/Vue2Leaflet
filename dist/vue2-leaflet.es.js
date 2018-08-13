var findRealParent = (function (firstVueParent) {
  var found = false;

  while (!found) {
    if (firstVueParent.mapObject == undefined) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }

  return firstVueParent;
});

var _this = undefined;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var propsBinder = (function (vueElement, leafletElement, props, options) {
  var keys = Object.keys(props);

  var _loop = function _loop() {
    var key = keys[i];
    var setMethodName = 'set' + capitalizeFirstLetter(key);
    var deepValue = props[key].type === Object || props[key].type === Array || Array.isArray(props[key].type);

    if (props[key].custom) {
      vueElement.$watch(key, function (newVal, oldVal) {
        vueElement[setMethodName](newVal, oldVal);
      }, {
        deep: deepValue
      });
    } else if (setMethodName == 'setOptions') {
      vueElement.$watch(key, function (newVal, oldVal) {
        _this.$leaflet().setOptions(leafletElement, newVal);
      }, {
        deep: deepValue
      });
    } else {
      vueElement.$watch(key, function (newVal, oldVal) {
        leafletElement[setMethodName](newVal);
      }, {
        deep: deepValue
      });
    }
  };

  for (var i = 0; i < keys.length; i++) {
    _loop();
  }
});

/**
 * 
 */
var isBrowser = typeof window !== 'undefined';

var _$leaflet = isBrowser ? window.leaflet : null;

var LeafletMixin = {
  methods: {
    $leaflet: function $leaflet() {
      return _$leaflet;
    },
    $loadLeaflet: function $loadLeaflet() {
      if (isBrowser && !_$leaflet) {
        _$leaflet = require('leaflet');
      }

      return Promise.resolve(_$leaflet);
    }
  }
};

//
var props = {
  latLng: {
    type: [Object, Array]
  },
  radius: {
    type: Number
  },
  lStyle: {
    type: Object,
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: true
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  }
};
var script = {
  name: 'LCircle',
  props: props,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {};

    if (this.color) {
      options.color = this.color;
    }

    if (this.radius) {
      options.radius = this.radius;
    }

    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }

    var otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().circle(this.latLng, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setLStyle: function setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setStroke: function setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        stroke: newVal
      });
    },
    setColor: function setColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          color: newVal
        });
      }
    },
    setWeight: function setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          weight: newVal
        });
      }
    },
    setOpacity: function setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          opacity: newVal
        });
      }
    },
    setLineCap: function setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineCap: newVal
        });
      }
    },
    setLineJoin: function setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineJoin: newVal
        });
      }
    },
    setDashArray: function setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashArray: newVal
        });
      }
    },
    setDashOffset: function setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashOffset: newVal
        });
      }
    },
    setFill: function setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        fill: newVal
      });
    },
    setFillColor: function setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillColor: newVal
        });
      }
    },
    setFillOpacity: function setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillOpacity: newVal
        });
      }
    },
    setFillRule: function setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillRule: newVal
        });
      }
    },
    setClassName: function setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          className: newVal
        });
      }
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LCircle.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LCircle = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

//
var props$1 = {
  latLng: {
    type: [Object, Array]
  },
  radius: {
    type: Number,
    default: 10
  },
  lStyle: {
    type: Object,
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: true
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  }
};
var script$1 = {
  name: 'LCircleMarker',
  props: props$1,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {};

    if (this.color) {
      options.color = this.color;
    }

    if (this.radius) {
      options.radius = this.radius;
    }

    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }

    var otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().circleMarker(this.latLng, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$1);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setLStyle: function setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setStroke: function setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        stroke: newVal
      });
    },
    setColor: function setColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          color: newVal
        });
      }
    },
    setWeight: function setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          weight: newVal
        });
      }
    },
    setOpacity: function setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          opacity: newVal
        });
      }
    },
    setLineCap: function setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineCap: newVal
        });
      }
    },
    setLineJoin: function setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineJoin: newVal
        });
      }
    },
    setDashArray: function setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashArray: newVal
        });
      }
    },
    setDashOffset: function setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashOffset: newVal
        });
      }
    },
    setFill: function setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        fill: newVal
      });
    },
    setFillColor: function setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillColor: newVal
        });
      }
    },
    setFillOpacity: function setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillOpacity: newVal
        });
      }
    },
    setFillRule: function setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillRule: newVal
        });
      }
    },
    setClassName: function setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          className: newVal
        });
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* component normalizer */

function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LCircleMarker.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$1() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LCircleMarker = __vue_normalize__$1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

var props$2 = {
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
    default: function _default() {
      return {};
    }
  }
};
var script$2 = {
  name: 'LControlAttribution',
  props: props$2,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ['prefix', 'position'];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().control.attribution(options);
    propsBinder(this, this.mapObject, props$2);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy: function beforeDestroy() {
    this.mapObject.remove();
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = undefined;
/* component normalizer */

function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LControlAttribution.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$2() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LControlAttribution = __vue_normalize__$2({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

var props$3 = {
  collapsed: {
    type: Boolean,
    default: true
  },
  autoZIndex: {
    type: Boolean,
    default: true
  },
  hideSingleBase: {
    type: Boolean,
    default: false
  },
  sortLayers: {
    type: Boolean,
    default: false
  },
  sortFunction: {
    type: Function,
    default: undefined
  },
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$3 = {
  name: 'LControlLayers',
  props: props$3,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ['collapsed', 'autoZIndex', 'hideSingleBase', 'sortLayers', 'sortFunction'];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().control.layers(null, null, options);
    propsBinder(this, this.mapObject, props$3);
    this.$parent.registerLayerControl(this);
  },
  methods: {
    addLayer: function addLayer(layer) {
      if (layer.layerType == 'base') {
        this.mapObject.addBaseLayer(layer.mapObject, layer.name);
      } else if (layer.layerType == 'overlay') {
        this.mapObject.addOverlay(layer.mapObject, layer.name);
      }
    },
    removeLayer: function removeLayer(layer) {
      this.mapObject.removeLayer(layer.mapObject);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.mapObject.remove();
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = undefined;
/* component normalizer */

function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LControlLayers.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$3() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LControlLayers = __vue_normalize__$3({}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

var props$4 = {
  maxWidth: {
    type: Number,
    default: 100
  },
  metric: {
    type: Boolean,
    default: true
  },
  imperial: {
    type: Boolean,
    default: true
  },
  updateWhenIdle: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$4 = {
  name: 'LControlScale',
  props: props$4,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ['maxWidth', 'metric', 'imperial', 'updateWhenIdle', 'position'];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().control.scale(options);
    propsBinder(this, this.mapObject, props$4);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy: function beforeDestroy() {
    this.mapObject.remove();
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = undefined;
/* component normalizer */

function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LControlScale.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$4() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LControlScale = __vue_normalize__$4({}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, __vue_create_injector__$4, undefined);

var props$5 = {
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
    default: function _default() {
      return {};
    }
  }
};
var script$5 = {
  name: 'LControlZoom',
  props: props$5,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ["zoomInText", "zoomInTitle", "zoomOutText", "zoomOutTitle", "position"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().control.zoom(options);
    propsBinder(this, this.mapObject, props$5);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy: function beforeDestroy() {
    this.mapObject.remove();
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = undefined;
/* component normalizer */

function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LControlZoom.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$5() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LControlZoom = __vue_normalize__$5({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, __vue_create_injector__$5, undefined);

//
var props$6 = {
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$6 = {
  name: 'LFeatureGroup',
  props: props$6,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.mapObject = this.$leaflet().featureGroup();
    propsBinder(this, this.mapObject, props$6);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);

    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer: function addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }

      this.parentContainer.addLayer(layer, true);
    },
    removeLayer: function removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }

      this.parentContainer.removeLayer(layer, true);
    },
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* component normalizer */

function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LFeatureGroup.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$6() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LFeatureGroup = __vue_normalize__$6({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, __vue_create_injector__$6, undefined);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var props$7 = {
  geojson: {
    type: [Object, Array],
    custom: true,
    default: function _default() {
      return {};
    }
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$7 = {
  name: 'LGeoJson',
  props: props$7,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.mapObject = this.$leaflet().geoJSON(this.geojson, this.options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$7);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: _defineProperty({
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    setGeojson: function setGeojson(newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData: function getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    },
    getBounds: function getBounds() {
      return this.mapObject.getBounds();
    }
  }, "setVisible", function setVisible(newVal, oldVal) {
    if (newVal === oldVal) return;

    if (newVal) {
      this.mapObject.addTo(this.parentContainer.mapObject);
    } else {
      this.parentContainer.mapObject.removeLayer(this.mapObject);
    }
  }),
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.mapObject.removeLayer(this.mapObject);
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */

/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = undefined;
/* component normalizer */

function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LGeoJson.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$7() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LGeoJson = __vue_normalize__$7({}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, __vue_create_injector__$7, undefined);

var props$8 = {
  imagePath: {
    type: String,
    custom: true,
    default: ""
  }
};
var script$8 = {
  name: 'LIconDefault',
  props: props$8,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.$leaflet().Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, props$8);
  },
  methods: {
    setImagePath: function setImagePath(newVal, oldVal) {
      this.$leaflet().Icon.Default.imagePath = newVal;
    }
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = undefined;
/* component normalizer */

function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LIconDefault.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$8() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LIconDefault = __vue_normalize__$8({}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, __vue_create_injector__$8, undefined);

var props$9 = {
  url: {
    type: String
  },
  bounds: {},
  opacity: {
    type: Number,
    default: 1.0
  },
  alt: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: false
  },
  crossOrigin: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$9 = {
  name: 'LImageOverlay',
  props: props$9,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {
      opacity: this.opacity,
      alt: this.alt,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin
    };
    this.mapObject = this.$leaflet().imageOverlay(this.url, this.bounds, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$9);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    getBounds: function getBounds() {
      return this.mapObject.getBounds();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */

/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = undefined;
/* component normalizer */

function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LImageOverlay.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$9() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$9.styles || (__vue_create_injector__$9.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LImageOverlay = __vue_normalize__$9({}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, __vue_create_injector__$9, undefined);

//
var props$10 = {
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$10 = {
  name: 'LLayerGroup',
  props: props$10,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.mapObject = this.$leaflet().layerGroup();
    propsBinder(this, this.mapObject, props$10);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);

    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer: function addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }

      this.parentContainer.addLayer(layer, true);
    },
    removeLayer: function removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }

      this.parentContainer.removeLayer(layer, true);
    },
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    }
  }
};

/* script */
var __vue_script__$10 = script$10;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;
/* style */

var __vue_inject_styles__$10 = undefined;
/* scoped */

var __vue_scope_id__$10 = undefined;
/* module identifier */

var __vue_module_identifier__$10 = undefined;
/* functional template */

var __vue_is_functional_template__$10 = false;
/* component normalizer */

function __vue_normalize__$10(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LLayerGroup.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$10() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$10.styles || (__vue_create_injector__$10.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LLayerGroup = __vue_normalize__$10({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$10, __vue_script__$10, __vue_scope_id__$10, __vue_is_functional_template__$10, __vue_module_identifier__$10, __vue_create_injector__$10, undefined);

//
var props$11 = {
  center: {
    type: [Object, Array],
    custom: true,
    default: function _default() {
      return [0, 0];
    }
  },
  bounds: {
    custom: true,
    default: undefined
  },
  maxBounds: {
    default: undefined
  },
  zoom: {
    type: Number,
    custom: true,
    default: 0
  },
  minZoom: {
    type: Number,
    default: undefined
  },
  maxZoom: {
    type: Number,
    default: undefined
  },
  paddingBottomRight: {
    custom: true,
    default: null
  },
  paddingTopLeft: {
    custom: true,
    default: null
  },
  padding: {
    custom: true,
    default: null
  },
  worldCopyJump: {
    type: Boolean,
    default: false
  },
  crs: {
    custom: true,
    default: function _default() {
      return null;
    }
  },
  maxBoundsViscosity: {
    type: Number,
    default: 0
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$11 = {
  name: 'LMap',
  props: props$11,
  data: function data() {
    return {
      ready: false,
      movingRequest: 0,
      lastSetCenter: undefined,
      lastSetBounds: undefined,
      layerControl: undefined,
      layersToAdd: []
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var _this = this;

    var options = this.options;
    Object.assign(options, {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      maxBounds: this.maxBounds,
      maxBoundsViscosity: this.maxBoundsViscosity,
      worldCopyJump: this.worldCopyJump,
      crs: this.crs || this.$leaflet().CRS.EPSG3857
    });

    if (this.center != null) {
      options.center = this.center;
    }

    if (this.zoom != null) {
      options.zoom = this.zoom;
    }

    this.mapObject = this.$leaflet().map(this.$el, options);
    this.setBounds(this.bounds);
    this.mapObject.on('moveend', function () {
      if (_this.movingRequest != 0) {
        _this.movingRequest -= 1;
        return;
      }

      if (_this.mapObject.getZoom() != _this.zoom) {
        _this.$emit('update:zoom', _this.mapObject.getZoom());
      }

      var center = _this.mapObject.getCenter();

      if (_this.center != null) {
        if (Array.isArray(_this.center)) {
          _this.center[0] = center.lat;
          _this.center[1] = center.lng;
        } else {
          _this.center.lat = center.lat;
          _this.center.lng = center.lng;
        }
      } else {
        _this.$emit('update:center', center);
      }

      var bounds = _this.mapObject.getBounds();

      if (_this.bounds != null) {
        if (Array.isArray(_this.bounds)) {
          if (Array.isArray(_this.bounds[0])) {
            _this.bounds[0][0] = bounds._southWest.lat;
            _this.bounds[0][1] = bounds._southWest.lng;
            _this.bounds[1][0] = bounds._northEast.lat;
            _this.bounds[1][1] = bounds._northEast.lng;
          } else {
            _this.bounds[0].lat = bounds._southWest.lat;
            _this.bounds[0].lng = bounds._southWest.lng;
            _this.bounds[1].lat = bounds._northEast.lat;
            _this.bounds[1].lng = bounds._northEast.lng;
          }
        } else {
          _this.bounds._southWest.lat = bounds._southWest.lat;
          _this.bounds._southWest.lng = bounds._southWest.lng;
          _this.bounds._northEast.lat = bounds._northEast.lat;
          _this.bounds._northEast.lng = bounds._northEast.lng;
        }
      } else {
        _this.$emit('update:bounds', bounds);
      }
    });
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$11);
    this.ready = true;
  },
  methods: {
    registerLayerControl: function registerLayerControl(lControlLayers) {
      this.layerControl = lControlLayers;
      this.mapObject.addControl(lControlLayers.mapObject);

      for (var layer in this.layersToAdd) {
        this.layerControl.addLayer(layer);
      }

      this.layerToAdd = null;
    },
    addLayer: function addLayer(layer, alreadyAdded) {
      if (layer.layerType !== undefined) {
        if (this.layerControl == undefined) {
          this.layersToAdd.push(layer);
        } else {
          this.layerControl.addLayer(layer);
        }
      }

      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
    },
    removeLayer: function removeLayer(layer, alreadyRemoved) {
      if (layer.layerType !== undefined) {
        if (this.layerControl == undefined) {
          this.layersToAdd = this.layerToAdd.filter(function (l) {
            return l.name !== layer.name;
          });
        } else {
          this.layerControl.removeLayer(layer);
        }
      }

      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    },
    setZoom: function setZoom(newVal, oldVal) {
      this.movingRequest += 1;
      this.mapObject.setZoom(newVal);
    },
    setCenter: function setCenter(newVal, oldVal) {
      if (newVal == null) {
        return;
      }

      var newLat = 0;
      var newLng = 0;

      if (Array.isArray(newVal)) {
        newLat = newVal[0];
        newLng = newVal[1];
      } else {
        newLat = newVal.lat;
        newLng = newVal.lng;
      }

      var center = this.lastSetCenter == null ? this.mapObject.getCenter() : this.lastSetCenter;

      if (center.lat != newLat || center.lng != newLng) {
        center.lat = newVal.lat;
        center.lng = newVal.lng;
        this.lastSetCenter = center;
        this.movingRequest += 1;
        this.mapObject.panTo(newVal);
      }
    },
    setBounds: function setBounds(newVal, oldVal) {
      if (!newVal) {
        return;
      }

      if (newVal instanceof this.$leaflet().LatLngBounds) {
        if (!newVal.isValid()) {
          return;
        }
      } else if (!Array.isArray(newVal)) {
        return;
      }

      var bounds = this.lastSetBounds == null ? this.mapObject.getBounds() : this.lastSetBounds;
      var southWestLat = 0;
      var southWestLng = 0;
      var northEastLat = 0;
      var northEastLng = 0;

      if (Array.isArray(bounds)) {
        if (Array.isArray(bounds[0])) {
          southWestLat = bounds[0][0];
          southWestLng = bounds[0][1];
        } else {
          southWestLat = bounds[0].lat;
          southWestLng = bounds[0].lng;
        }

        if (Array.isArray(bounds[1])) {
          northEastLat = bounds[1][0];
          northEastLng = bounds[1][1];
        } else {
          northEastLat = bounds[1].lat;
          northEastLng = bounds[1].lng;
        }
      } else {
        southWestLat = bounds._southWest.lat;
        southWestLng = bounds._southWest.lng;
        northEastLat = bounds._northEast.lat;
        northEastLng = bounds._northEast.lng;
      }

      var southWestNewLat = 0;
      var southWestNewLng = 0;
      var northEastNewLat = 0;
      var northEastNewLng = 0;

      if (Array.isArray(newVal)) {
        newVal = this.$leaflet().latLngBounds(newVal);
      }

      southWestNewLat = newVal._southWest.lat;
      southWestNewLng = newVal._southWest.lng;
      northEastNewLat = newVal._northEast.lat;
      northEastNewLng = newVal._northEast.lng;
      var boundsChanged = southWestNewLat != southWestLat || southWestNewLng != southWestLng || northEastNewLat != northEastLat || northEastNewLng != northEastLng;

      if (boundsChanged) {
        var options = {};

        if (this.padding) {
          options.padding = this.padding;
        } else {
          if (this.paddingBottomRight) {
            options.paddingBottomRight = this.paddingBottomRight;
          }

          if (this.paddingTopLeft) {
            options.paddingTopLeft = this.paddingTopLeft;
          }
        }

        this.lastSetBounds = bounds;

        if (Array.isArray(bounds)) {
          if (Array.isArray(bounds[0])) {
            bounds[0][0] = southWestLat;
            bounds[0][1] = southWestLng;
          } else {
            bounds[0].lat = southWestLat;
            bounds[0].lng = southWestLng;
          }

          if (Array.isArray(bounds[1])) {
            bounds[1][0] = northEastLat;
            bounds[1][1] = northEastLng;
          } else {
            bounds[1].lat = northEastLat;
            bounds[1].lng = northEastLng;
          }
        } else {
          bounds._southWest.lat = southWestLat;
          bounds._southWest.lng = southWestLng;
          bounds._northEast.lat = northEastLat;
          bounds._northEast.lng = northEastLng;
        }

        this.movingRequest += 1;
        this.mapObject.fitBounds(newVal, options);
      }
    },
    setPaddingBottomRight: function setPaddingBottomRight(newVal, oldVal) {
      this.paddingBottomRight = newVal;
    },
    setPaddingTopLeft: function setPaddingTopLeft(newVal, oldVal) {
      this.paddingTopLeft = newVal;
    },
    setPadding: function setPadding(newVal, oldVal) {
      this.padding = newVal;
    },
    setCrs: function setCrs(newVal, oldVal) {
      console.log('Changing CRS is not yet supported by Leaflet');
    },
    fitBounds: function fitBounds(bounds) {
      this.mapObject.fitBounds(bounds);
    }
  }
};

/* script */
var __vue_script__$11 = script$11;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "vue2leaflet-map"
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;
/* style */

var __vue_inject_styles__$11 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-c20fcd58_0", {
    source: "\n.vue2leaflet-map {\n  height: 100%;\n  width: 100%;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Projects/NuxtLeaflet/src/components/LMap.vue"],
      "names": [],
      "mappings": ";AAgUA;EACA,aAAA;EACA,YAAA;CACA",
      "file": "LMap.vue",
      "sourcesContent": ["<template>\n  <div class=\"vue2leaflet-map\">\n    <slot v-if=\"ready\"></slot>\n  </div>\n</template>\n\n<script>\nimport { LeafletMixin } from '../utils/Leaflet';\nimport propsBinder from '../utils/propsBinder.js';\n\nexport const props = {\n  center: {\n    type: [Object, Array],\n    custom: true,\n    default: () => [0, 0],\n  },\n  bounds: {\n    custom: true,\n    default: undefined,\n  },\n  maxBounds: {\n    default: undefined,\n  },\n  zoom: {\n    type: Number,\n    custom: true,\n    default: 0,\n  },\n  minZoom: {\n    type: Number,\n    default: undefined,\n  },\n  maxZoom: {\n    type: Number,\n    default: undefined,\n  },\n  paddingBottomRight: {\n    custom: true,\n    default: null,\n  },\n  paddingTopLeft: {\n    custom: true,\n    default: null\n  },\n  padding: {\n    custom: true,\n    default: null\n  },\n  worldCopyJump: {\n    type: Boolean,\n    default: false\n  },\n  crs: {\n    custom: true,\n    default: () => null,\n  },\n  maxBoundsViscosity: {\n    type: Number,\n    default: 0\n  },\n  options: {\n    type: Object,\n    default: () => ({}),\n  },\n};\n\nexport default {\n  name: 'LMap',\n  props: props,\n  data() {\n    return {\n      ready: false,\n      movingRequest: 0,\n      lastSetCenter: undefined,\n      lastSetBounds: undefined,\n      layerControl: undefined,\n      layersToAdd: []\n    }\n  },\n  mixins: [\n    LeafletMixin,\n  ],\n  mounted() {\n    const options = this.options;\n    Object.assign(options, {\n      minZoom: this.minZoom,\n      maxZoom: this.maxZoom,\n      maxBounds: this.maxBounds,\n      maxBoundsViscosity: this.maxBoundsViscosity,\n      worldCopyJump: this.worldCopyJump,\n      crs: this.crs || this.$leaflet().CRS.EPSG3857,\n    });\n    if (this.center != null) {\n      options.center = this.center;\n    }\n    if (this.zoom != null) {\n      options.zoom = this.zoom;\n    }\n    this.mapObject = this.$leaflet().map(this.$el, options);\n    this.setBounds(this.bounds);\n    this.mapObject.on('moveend', () => {\n      if (this.movingRequest != 0) {\n        this.movingRequest -= 1;\n        return;\n      }\n      if (this.mapObject.getZoom() != this.zoom) {\n        this.$emit('update:zoom', this.mapObject.getZoom());\n      }\n      let center = this.mapObject.getCenter();\n      if (this.center != null) {\n        if (Array.isArray(this.center)) {\n          this.center[0] = center.lat;\n          this.center[1] = center.lng;\n        } else {\n          this.center.lat = center.lat;\n          this.center.lng = center.lng;\n        }\n      } else {\n        this.$emit('update:center', center);\n      }\n\n      let bounds = this.mapObject.getBounds();\n      if (this.bounds != null) {\n        if (Array.isArray(this.bounds)) {\n          if (Array.isArray(this.bounds[0])) {\n            this.bounds[0][0] = bounds._southWest.lat;\n            this.bounds[0][1] = bounds._southWest.lng;\n            this.bounds[1][0] = bounds._northEast.lat;\n            this.bounds[1][1] = bounds._northEast.lng;\n          } else {\n            this.bounds[0].lat = bounds._southWest.lat;\n            this.bounds[0].lng = bounds._southWest.lng;\n            this.bounds[1].lat = bounds._northEast.lat;\n            this.bounds[1].lng = bounds._northEast.lng;\n          }\n        } else {\n          this.bounds._southWest.lat = bounds._southWest.lat;\n          this.bounds._southWest.lng = bounds._southWest.lng;\n          this.bounds._northEast.lat = bounds._northEast.lat;\n          this.bounds._northEast.lng = bounds._northEast.lng;\n        }\n      } else {\n        this.$emit('update:bounds', bounds);\n      }\n    });\n    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);\n    propsBinder(this, this.mapObject, props);\n    this.ready = true;\n  },\n  methods: {\n    registerLayerControl(lControlLayers) {\n      this.layerControl = lControlLayers;\n      this.mapObject.addControl(lControlLayers.mapObject);\n      for(var layer in this.layersToAdd) {\n        this.layerControl.addLayer(layer);\n      }\n      this.layerToAdd = null;\n    },\n    addLayer(layer, alreadyAdded) {\n      if (layer.layerType !== undefined) {\n        if (this.layerControl == undefined) {\n          this.layersToAdd.push(layer);\n        } else {\n          this.layerControl.addLayer(layer);\n        }\n      }\n      if (!alreadyAdded) {\n        this.mapObject.addLayer(layer.mapObject);\n      }\n    },\n    removeLayer(layer, alreadyRemoved) {\n      if (layer.layerType !== undefined) {\n        if (this.layerControl == undefined) {\n          this.layersToAdd = this.layerToAdd.filter((l) => l.name !== layer.name );\n        } else {\n          this.layerControl.removeLayer(layer);\n        }\n      }\n      if (!alreadyRemoved) {\n        this.mapObject.removeLayer(layer.mapObject);\n      }\n    },\n    setZoom(newVal , oldVal) {\n      this.movingRequest += 1;\n      this.mapObject.setZoom(newVal);\n    },\n    setCenter(newVal, oldVal) {\n      if (newVal == null) {\n        return;\n      }\n\n      let newLat = 0;\n      let newLng = 0;\n      if (Array.isArray(newVal)) {\n        newLat = newVal[0];\n        newLng = newVal[1];\n      } else {\n        newLat = newVal.lat;\n        newLng = newVal.lng;\n      }\n      let center = this.lastSetCenter == null ? this.mapObject.getCenter() : this.lastSetCenter;\n      if (center.lat != newLat || center.lng != newLng) {\n        center.lat = newVal.lat;\n        center.lng = newVal.lng;\n        this.lastSetCenter = center;\n        this.movingRequest += 1;\n        this.mapObject.panTo(newVal);\n      }\n    },\n    setBounds(newVal, oldVal) {\n      if (!newVal) {\n        return;\n      }\n      if (newVal instanceof this.$leaflet().LatLngBounds) {\n        if (!newVal.isValid()) {\n          return;\n        }\n      } else if (!Array.isArray(newVal)) {\n        return;\n      }\n      let bounds = this.lastSetBounds == null ? this.mapObject.getBounds() : this.lastSetBounds;\n      let southWestLat = 0;\n      let southWestLng = 0;\n      let northEastLat = 0;\n      let northEastLng = 0;\n      if (Array.isArray(bounds)) {\n        if (Array.isArray(bounds[0])) {\n          southWestLat = bounds[0][0];\n          southWestLng = bounds[0][1];\n        } else {\n          southWestLat = bounds[0].lat;\n          southWestLng = bounds[0].lng;\n        }\n        if (Array.isArray(bounds[1])) {\n          northEastLat = bounds[1][0];\n          northEastLng = bounds[1][1];\n        } else {\n          northEastLat = bounds[1].lat;\n          northEastLng = bounds[1].lng;\n        }\n      } else {\n        southWestLat = bounds._southWest.lat;\n        southWestLng = bounds._southWest.lng;\n        northEastLat = bounds._northEast.lat;\n        northEastLng = bounds._northEast.lng;\n      }\n      let southWestNewLat = 0;\n      let southWestNewLng = 0;\n      let northEastNewLat = 0;\n      let northEastNewLng = 0;\n      if (Array.isArray(newVal)) {\n        newVal = this.$leaflet().latLngBounds(newVal);\n      }\n      southWestNewLat = newVal._southWest.lat;\n      southWestNewLng = newVal._southWest.lng;\n      northEastNewLat = newVal._northEast.lat;\n      northEastNewLng = newVal._northEast.lng;\n      let boundsChanged =\n        (southWestNewLat != southWestLat) ||\n        (southWestNewLng != southWestLng) ||\n        (northEastNewLat != northEastLat) ||\n        (northEastNewLng != northEastLng);\n      if (boundsChanged) {\n        var options = {};\n        if (this.padding) {\n          options.padding = this.padding;\n        } else {\n          if (this.paddingBottomRight) {\n            options.paddingBottomRight = this.paddingBottomRight;\n          }\n          if (this.paddingTopLeft) {\n            options.paddingTopLeft = this.paddingTopLeft;\n          }\n        }\n        this.lastSetBounds = bounds;\n        if (Array.isArray(bounds)) {\n          if (Array.isArray(bounds[0])) {\n            bounds[0][0] = southWestLat;\n            bounds[0][1] = southWestLng;\n          } else {\n            bounds[0].lat = southWestLat;\n            bounds[0].lng = southWestLng;\n          }\n          if (Array.isArray(bounds[1])) {\n            bounds[1][0] = northEastLat;\n            bounds[1][1] = northEastLng;\n          } else {\n            bounds[1].lat = northEastLat;\n            bounds[1].lng = northEastLng;\n          }\n        } else {\n          bounds._southWest.lat = southWestLat;\n          bounds._southWest.lng = southWestLng;\n          bounds._northEast.lat = northEastLat;\n          bounds._northEast.lng = northEastLng;\n        }\n        this.movingRequest += 1;\n        this.mapObject.fitBounds(newVal, options);\n      }\n    },\n    setPaddingBottomRight(newVal, oldVal) {\n      this.paddingBottomRight = newVal;\n    },\n    setPaddingTopLeft(newVal, oldVal) {\n      this.paddingTopLeft = newVal;\n    },\n    setPadding(newVal, oldVal) {\n      this.padding = newVal;\n    },\n    setCrs(newVal, oldVal) {\n      console.log('Changing CRS is not yet supported by Leaflet');\n    },\n    fitBounds(bounds) {\n      this.mapObject.fitBounds(bounds);\n    }\n  },\n}\n</script>\n\n<style type=\"text/css\">\n  .vue2leaflet-map {\n    height: 100%;\n    width: 100%;\n  }\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$11 = undefined;
/* module identifier */

var __vue_module_identifier__$11 = undefined;
/* functional template */

var __vue_is_functional_template__$11 = false;
/* component normalizer */

function __vue_normalize__$11(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LMap.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook;

    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;

        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */


function __vue_create_injector__$11() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$11.styles || (__vue_create_injector__$11.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LMap = __vue_normalize__$11({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$11, __vue_script__$11, __vue_scope_id__$11, __vue_is_functional_template__$11, __vue_module_identifier__$11, __vue_create_injector__$11, undefined);

var script$12 = {
  render: function render(createElement) {
    var childs = [];

    if (this.isMounted) {
      var map = createElement(LMap, {
        props: this.$options.propsData
      }, [this.$slots.default]);
      childs.push(map);
    }
    return createElement('div', {
      class: ['vue2leaflet-map-ssr']
    }, childs);
  },
  props: props$11,
  components: {
    LMap: LMap
  },
  mixins: [LeafletMixin],
  data: function data() {
    return {
      isMounted: false
    };
  },
  mounted: function mounted() {
    return new Promise(function ($return, $error) {
      return Promise.resolve(this.$loadLeaflet()).then(function ($await_1) {
        try {
          this.isMounted = true;
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  }
};

/* script */
var __vue_script__$12 = script$12;
/* template */

/* style */

var __vue_inject_styles__$12 = undefined;
/* scoped */

var __vue_scope_id__$12 = undefined;
/* module identifier */

var __vue_module_identifier__$12 = undefined;
/* functional template */

var __vue_is_functional_template__$12 = undefined;
/* component normalizer */

function __vue_normalize__$12(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LMapSsr.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$12() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$12.styles || (__vue_create_injector__$12.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LMapSsr = __vue_normalize__$12({}, __vue_inject_styles__$12, __vue_script__$12, __vue_scope_id__$12, __vue_is_functional_template__$12, __vue_module_identifier__$12, __vue_create_injector__$12, undefined);

//
var props$12 = {
  draggable: {
    type: Boolean,
    custom: true,
    default: false
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  latLng: {
    type: [Object, Array],
    custom: true
  },
  icon: {
    custom: false,
    default: null
  },
  zIndexOffset: {
    type: Number,
    custom: false
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$13 = {
  name: 'LMarker',
  props: props$12,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var _this = this;

    var options = this.options;

    if (this.icon !== null) {
      options.icon = this.icon || new this.$leaflet().Icon.Default();
    }

    options.draggable = this.draggable;
    this.mapObject = this.$leaflet().marker(this.latLng, options);
    this.mapObject.on('move', function (ev) {
      if (Array.isArray(_this.latLng)) {
        _this.latLng[0] = ev.latlng.lat;
        _this.latLng[1] = ev.latlng.lng;
      } else {
        _this.latLng.lat = ev.latlng.lat;
        _this.latLng.lng = ev.latlng.lng;
      }
    });
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$12);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setDraggable: function setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    setLatLng: function setLatLng(newVal) {
      if (newVal == null) {
        return;
      }

      if (this.mapObject) {
        var oldLatLng = this.mapObject.getLatLng();
        var newLatLng = {
          lat: newVal[0] || newVal.lat,
          lng: newVal[1] || newVal.lng
        };

        if (newLatLng.lat != oldLatLng.lat || newLatLng.lng != oldLatLng.lng) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    }
  }
};

/* script */
var __vue_script__$13 = script$13;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;
/* style */

var __vue_inject_styles__$13 = undefined;
/* scoped */

var __vue_scope_id__$13 = undefined;
/* module identifier */

var __vue_module_identifier__$13 = undefined;
/* functional template */

var __vue_is_functional_template__$13 = false;
/* component normalizer */

function __vue_normalize__$13(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LMarker.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$13() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$13.styles || (__vue_create_injector__$13.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LMarker = __vue_normalize__$13({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$13, __vue_script__$13, __vue_scope_id__$13, __vue_is_functional_template__$13, __vue_module_identifier__$13, __vue_create_injector__$13, undefined);

//
var props$13 = {
  latLngs: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  lStyle: {
    type: Object,
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  smoothFactor: {
    type: Number,
    custom: true,
    default: 1.0
  },
  noClip: {
    type: Boolean,
    custom: true,
    default: false
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: true
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  }
};
var script$14 = {
  name: 'LPolygon',
  props: props$13,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {};

    if (this.color) {
      options.color = this.color;
    }

    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }

    var otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().polygon(this.latLngs, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$13);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setLStyle: function setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setSmoothFactor: function setSmoothFactor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          smoothFactor: newVal
        });
      }
    },
    setNoClip: function setNoClip(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          noClip: newVal
        });
      }
    },
    setStroke: function setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        stroke: newVal
      });
    },
    setColor: function setColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          color: newVal
        });
      }
    },
    setWeight: function setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          weight: newVal
        });
      }
    },
    setOpacity: function setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          opacity: newVal
        });
      }
    },
    setLineCap: function setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineCap: newVal
        });
      }
    },
    setLineJoin: function setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineJoin: newVal
        });
      }
    },
    setDashArray: function setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashArray: newVal
        });
      }
    },
    setDashOffset: function setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashOffset: newVal
        });
      }
    },
    setFill: function setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        fill: newVal
      });
    },
    setFillColor: function setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillColor: newVal
        });
      }
    },
    setFillOpacity: function setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillOpacity: newVal
        });
      }
    },
    setFillRule: function setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillRule: newVal
        });
      }
    },
    setClassName: function setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          className: newVal
        });
      }
    },
    addLatLng: function addLatLng(value) {
      this.mapObject.addLatLng(value);
    },
    getGeoJSONData: function getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    }
  }
};

/* script */
var __vue_script__$14 = script$14;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;
/* style */

var __vue_inject_styles__$14 = undefined;
/* scoped */

var __vue_scope_id__$14 = undefined;
/* module identifier */

var __vue_module_identifier__$14 = undefined;
/* functional template */

var __vue_is_functional_template__$14 = false;
/* component normalizer */

function __vue_normalize__$14(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LPolygon.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$14() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$14.styles || (__vue_create_injector__$14.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LPolygon = __vue_normalize__$14({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$14, __vue_script__$14, __vue_scope_id__$14, __vue_is_functional_template__$14, __vue_module_identifier__$14, __vue_create_injector__$14, undefined);

//
var props$14 = {
  latLngs: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  lStyle: {
    type: Object,
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  smoothFactor: {
    type: Number,
    custom: true,
    default: 1.0
  },
  noClip: {
    type: Boolean,
    custom: true,
    default: false
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: false
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  }
};
var script$15 = {
  name: 'LPolyline',
  props: props$14,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {};

    if (this.color) {
      options.color = this.color;
    }

    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }

    var otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().polyline(this.latLngs, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$14);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setLStyle: function setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setSmoothFactor: function setSmoothFactor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          smoothFactor: newVal
        });
      }
    },
    setNoClip: function setNoClip(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          noClip: newVal
        });
      }
    },
    setStroke: function setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        stroke: newVal
      });
    },
    setColor: function setColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          color: newVal
        });
      }
    },
    setWeight: function setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          weight: newVal
        });
      }
    },
    setOpacity: function setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          opacity: newVal
        });
      }
    },
    setLineCap: function setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineCap: newVal
        });
      }
    },
    setLineJoin: function setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineJoin: newVal
        });
      }
    },
    setDashArray: function setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashArray: newVal
        });
      }
    },
    setDashOffset: function setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashOffset: newVal
        });
      }
    },
    setFill: function setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        fill: newVal
      });
    },
    setFillColor: function setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillColor: newVal
        });
      }
    },
    setFillOpacity: function setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillOpacity: newVal
        });
      }
    },
    setFillRule: function setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillRule: newVal
        });
      }
    },
    setClassName: function setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          className: newVal
        });
      }
    },
    addLatLng: function addLatLng(value) {
      this.mapObject.addLatLng(value);
    }
  }
};

/* script */
var __vue_script__$15 = script$15;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;
/* style */

var __vue_inject_styles__$15 = undefined;
/* scoped */

var __vue_scope_id__$15 = undefined;
/* module identifier */

var __vue_module_identifier__$15 = undefined;
/* functional template */

var __vue_is_functional_template__$15 = false;
/* component normalizer */

function __vue_normalize__$15(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LPolyline.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$15() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$15.styles || (__vue_create_injector__$15.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LPolyline = __vue_normalize__$15({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$15, __vue_script__$15, __vue_scope_id__$15, __vue_is_functional_template__$15, __vue_module_identifier__$15, __vue_create_injector__$15, undefined);

//
var props$15 = {
  content: {
    default: ''
  },
  latLng: {
    type: [Object, Array]
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$16 = {
  name: 'LPopup',
  props: props$15,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.mapObject = this.$leaflet().popup(this.options);

    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }

    this.mapObject.setContent(this.content || this.$el);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$15);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindPopup(this.mapObject);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentContainer.mapObject && this.parentContainer.mapObject.getPopup()) {
      this.parentContainer.mapObject.unbindPopup();
    }
  }
};

/* script */
var __vue_script__$16 = script$16;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;
/* style */

var __vue_inject_styles__$16 = undefined;
/* scoped */

var __vue_scope_id__$16 = undefined;
/* module identifier */

var __vue_module_identifier__$16 = undefined;
/* functional template */

var __vue_is_functional_template__$16 = false;
/* component normalizer */

function __vue_normalize__$16(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LPopup.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$16() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$16.styles || (__vue_create_injector__$16.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LPopup = __vue_normalize__$16({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$16, __vue_script__$16, __vue_scope_id__$16, __vue_is_functional_template__$16, __vue_module_identifier__$16, __vue_create_injector__$16, undefined);

//
var props$16 = {
  bounds: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  lStyle: {
    type: Object,
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: true
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  }
};
var script$17 = {
  name: 'LRectangle',
  props: props$16,
  data: function data() {
    return {
      ready: false
    };
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = {};

    if (this.color) {
      options.color = this.color;
    }

    if (this.lStyle) {
      for (var s in this.lStyle) {
        options[s] = this.lStyle[s];
      }
    }

    var otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().rectangle(this.bounds, options);
    this.ready = true;
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$16);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setLStyle: function setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setStroke: function setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        stroke: newVal
      });
    },
    setColor: function setColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          color: newVal
        });
      }
    },
    setWeight: function setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          weight: newVal
        });
      }
    },
    setOpacity: function setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          opacity: newVal
        });
      }
    },
    setLineCap: function setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineCap: newVal
        });
      }
    },
    setLineJoin: function setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          lineJoin: newVal
        });
      }
    },
    setDashArray: function setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashArray: newVal
        });
      }
    },
    setDashOffset: function setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          dashOffset: newVal
        });
      }
    },
    setFill: function setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({
        fill: newVal
      });
    },
    setFillColor: function setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillColor: newVal
        });
      }
    },
    setFillOpacity: function setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillOpacity: newVal
        });
      }
    },
    setFillRule: function setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          fillRule: newVal
        });
      }
    },
    setClassName: function setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (newVal) {
        this.mapObject.setStyle({
          className: newVal
        });
      }
    }
  }
};

/* script */
var __vue_script__$17 = script$17;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticStyle: {
      display: "none"
    }
  }, [_vm.ready ? _vm._t("default") : _vm._e()], 2);
};

var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;
/* style */

var __vue_inject_styles__$17 = undefined;
/* scoped */

var __vue_scope_id__$17 = undefined;
/* module identifier */

var __vue_module_identifier__$17 = undefined;
/* functional template */

var __vue_is_functional_template__$17 = false;
/* component normalizer */

function __vue_normalize__$17(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LRectangle.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$17() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$17.styles || (__vue_create_injector__$17.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LRectangle = __vue_normalize__$17({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$17, __vue_script__$17, __vue_scope_id__$17, __vue_is_functional_template__$17, __vue_module_identifier__$17, __vue_create_injector__$17, undefined);

var _name$props$mixins$mo;
var props$17 = {
  url: String,
  attribution: {
    type: String,
    custom: true
  },
  detectRetina: {
    type: Boolean,
    custom: false,
    default: false
  },
  token: {
    type: String,
    custom: true
  },
  opacity: {
    type: Number,
    custom: false,
    default: 1.0
  },
  zIndex: {
    type: Number,
    default: 1
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  tms: {
    type: Boolean,
    default: false
  },
  tileLayerClass: {
    type: Function,
    default: undefined
  },
  layerType: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$18 = (_name$props$mixins$mo = {
  name: 'LTileLayer',
  props: props$17,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ["attribution", "token", "detectRetina", "opacity", "zIndex"];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    var tileLayer = this.tileLayer || this.$leaflet().tileLayer;
    this.mapObject = tileLayer(this.url, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$17);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: {
    setAttribution: function setAttribution(val, old) {
      var attributionControl = this.$parent.mapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setToken: function setToken(val) {
      this.options.token = val;
    }
  }
}, _defineProperty(_name$props$mixins$mo, "methods", {
  setVisible: function setVisible(newVal, oldVal) {
    if (newVal == oldVal) return;

    if (this.mapObject) {
      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    }
  }
}), _defineProperty(_name$props$mixins$mo, "beforeDestroy", function beforeDestroy() {
  this.parentContainer.removeLayer(this);
}), _defineProperty(_name$props$mixins$mo, "render", function render() {
  return null;
}), _name$props$mixins$mo);

/* script */
var __vue_script__$18 = script$18;
/* template */

/* style */

var __vue_inject_styles__$18 = undefined;
/* scoped */

var __vue_scope_id__$18 = undefined;
/* module identifier */

var __vue_module_identifier__$18 = undefined;
/* functional template */

var __vue_is_functional_template__$18 = undefined;
/* component normalizer */

function __vue_normalize__$18(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LTileLayer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$18() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$18.styles || (__vue_create_injector__$18.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LTileLayer = __vue_normalize__$18({}, __vue_inject_styles__$18, __vue_script__$18, __vue_scope_id__$18, __vue_is_functional_template__$18, __vue_module_identifier__$18, __vue_create_injector__$18, undefined);

//
var props$18 = {
  content: {
    default: ''
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
var script$19 = {
  name: 'LTooltip',
  props: props$18,
  data: function data() {
    return {};
  },
  mixins: [LeafletMixin],
  mounted: function mounted() {
    this.mapObject = this.$leaflet().tooltip(this.options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$18);
    this.mapObject.setContent(this.content || this.$el);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
    }
  }
};

/* script */
var __vue_script__$19 = script$19;
/* template */

var __vue_render__$10 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$10 = [];
__vue_render__$10._withStripped = true;
/* style */

var __vue_inject_styles__$19 = undefined;
/* scoped */

var __vue_scope_id__$19 = undefined;
/* module identifier */

var __vue_module_identifier__$19 = undefined;
/* functional template */

var __vue_is_functional_template__$19 = false;
/* component normalizer */

function __vue_normalize__$19(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LTooltip.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$19() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$19.styles || (__vue_create_injector__$19.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LTooltip = __vue_normalize__$19({
  render: __vue_render__$10,
  staticRenderFns: __vue_staticRenderFns__$10
}, __vue_inject_styles__$19, __vue_script__$19, __vue_scope_id__$19, __vue_is_functional_template__$19, __vue_module_identifier__$19, __vue_create_injector__$19, undefined);

var props$19 = {
  baseUrl: String,
  layers: {
    type: String,
    default: ''
  },
  styles: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'image/jpeg'
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  transparent: {
    type: Boolean,
    custom: false
  },
  version: {
    type: String,
    default: '1.1.1'
  },
  crs: {
    default: null
  },
  upperCase: {
    type: Boolean,
    default: false
  },
  opacity: {
    type: Number,
    custom: false,
    default: 1.0
  },
  zIndex: {
    type: Number,
    default: 1
  },
  layerType: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};
var script$20 = {
  name: 'LWMSTileLayer',
  props: props$19,
  mixins: [LeafletMixin],
  mounted: function mounted() {
    var options = this.options;
    var otherPropertytoInitialize = ['layers', 'styles', 'format', 'transparent', 'version', 'crs', 'upperCase', 'zIndex', 'opacity'];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      var propName = otherPropertytoInitialize[i];

      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = this.$leaflet().tileLayer.wms(this.baseUrl, options);
    this.$leaflet().DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props$19);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: {
    setVisible: function setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;

      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  render: function render() {
    return null;
  }
};

/* script */
var __vue_script__$20 = script$20;
/* template */

/* style */

var __vue_inject_styles__$20 = undefined;
/* scoped */

var __vue_scope_id__$20 = undefined;
/* module identifier */

var __vue_module_identifier__$20 = undefined;
/* functional template */

var __vue_is_functional_template__$20 = undefined;
/* component normalizer */

function __vue_normalize__$20(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "/Projects/NuxtLeaflet/src/components/LWMSTileLayer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  

  return component;
}
/* style inject */


function __vue_create_injector__$20() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$20.styles || (__vue_create_injector__$20.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var LWMSTileLayer = __vue_normalize__$20({}, __vue_inject_styles__$20, __vue_script__$20, __vue_scope_id__$20, __vue_is_functional_template__$20, __vue_module_identifier__$20, __vue_create_injector__$20, undefined);

export { findRealParent, propsBinder, LCircle, LCircleMarker, LControlAttribution, LControlLayers, LControlScale, LControlZoom, LFeatureGroup, LGeoJson, LIconDefault, LImageOverlay, LLayerGroup, LMap, LMapSsr, LMarker, LPolygon, LPolyline, LPopup, LRectangle, LTileLayer, LTooltip, LWMSTileLayer };
