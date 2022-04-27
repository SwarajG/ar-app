AFRAME.registerComponent('xr-light', {
  schema: {
    min: {default: 0},
    max: {default: 0.5},
  },
  tick() {
    this.el.setAttribute(
      'light',
      `intensity: ${Math.max(this.data.min, Math.min(this.system.intensity, this.data.max))}`
    )
  },
});

AFRAME.registerSystem('xr-light', {
  init(){
      this.intensity = 1
      const startListen = () => {
        window.XR8.XrController.configure({enableLighting: true})
        window.XR8.addCameraPipelineModule({
          name: 'xr-light',
          onUpdate: ({processCpuResult}) => {
            if (processCpuResult.reality &&
              processCpuResult.reality.lighting &&
              processCpuResult.reality.lighting.exposure) {
              this.intensity = 1 + processCpuResult.reality.lighting.exposure
            }
          },
        })
      }
      window.XR8 ? startListen() : window.addEventListener('xrloaded', startListen)
  },
});