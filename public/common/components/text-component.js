//component written for arabic language support in aFrame using troika text custom font

AFRAME.registerComponent('text-component', {
   
    schema: {
        'color': {default: ''},
        'value': {default: 'Place Here'},
        'curve-radius': {default: '-2'},
        'font-size': {default: '0.2'},
        'max-width': {default: ''},
      },
    init(){
        if(langDetect == 'ar'){
            this.el.setAttribute('troika-text', `value: ${this.data.value}; font: ./common/fonts/NotoSans-Arabic.ttf; color: ${this.data.color}; align: center; curve-radius: ${this.data.curveRadius}; font-size: ${this.data.fontSize};  max-width: ${this.data.maxWidth};`);
        }
        else{
            this.el.setAttribute('troika-text', `value: ${this.data.value}; font: ./common/fonts/DINPro-Medium.ttf; color: ${this.data.color}; align: center; curve-radius: ${this.data.curveRadius}; font-size: ${this.data.fontSize}; max-width: ${this.data.maxWidth};`);
        }
    },
});