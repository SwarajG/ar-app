AFRAME.registerComponent('align-to-camera', {
    init(){
        this.reticleAligner = document.getElementById("reticle-aligner");
        this.hotspotAligner = document.getElementById("hotspot-aligner");
        this.mathUtils = (window.THREE && (THREE.MathUtils || THREE.Math)) || null;
    },
    tick(){
        let rot_x = this.el.getAttribute('rotation').x;

        let rot_y;

        if(this.el.getAttribute('id') === 'reticle-group'){
            rot_y = this.reticleAligner.getAttribute('rotation').y;
        }
        else if(this.el.getAttribute('id') === 'all-states-aligner' 
            || this.el.getAttribute('id') === 'podium' 
            || this.el.getAttribute('id') === 'product'
            || this.el.getAttribute('id') === '3d-inst-parent'){
                rot_y = this.hotspotAligner.getAttribute('rotation').y;
        }

        let rot_z = this.el.getAttribute('rotation').z;

        if (!this.mathUtils || !this.mathUtils.degToRad) {
            return;
        }

        this.el.object3D.rotation.set(
            this.mathUtils.degToRad(rot_x),
            this.mathUtils.degToRad(rot_y),
            this.mathUtils.degToRad(rot_z)
        );
    },
});
