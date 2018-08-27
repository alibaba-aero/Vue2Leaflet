/**
 * 
 */

const isBrowser = typeof window !== 'undefined'

let $leaflet = isBrowser ? window.L : null;

export const LeafletMixin = {
    methods: {
        $leaflet: () => $leaflet,

        $loadLeaflet: () => {
            if (isBrowser && !$leaflet) {
                $leaflet = require('leaflet');
            }

            return Promise.resolve($leaflet);
        }
    }
}
