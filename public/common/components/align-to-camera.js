AFRAME.registerComponent('align-to-camera', {
    init(){
        this.reticleAligner = document.getElementById("reticle-aligner");
        this.hotspotAligner = document.getElementById("hotspot-aligner");
    },
    tick(){
        let rot_x = this.el.getAttribute('rotation').x;

        let rot_y;

        if(this.el.getAttribute('id') === 'reticle-group'){
            rot_y = this.reticleAligner.getAttribute('rotation').y;
        }
        else if(this.el.getAttribute('id') === 'all-states-aligner' 
            || this.el.getAttribute('id') === 'podium' 
            || this.el.getAttribute('id') === 'product'){
            rot_y = this.hotspotAligner.getAttribute('rotation').y;
        }

        let rot_z = this.el.getAttribute('rotation').z;

        this.el.object3D.rotation.set(
            THREE.Math.degToRad(rot_x),
            THREE.Math.degToRad(rot_y),
            THREE.Math.degToRad(rot_z)
        );
    },
});