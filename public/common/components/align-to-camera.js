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
        else {
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