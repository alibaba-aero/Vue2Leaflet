/**
 * 
 */
export const LeafletMixin = {
    methods: {
        $leaflet: () => typeof window !== 'undefined' ? window.leaflet : {}
    }
}
