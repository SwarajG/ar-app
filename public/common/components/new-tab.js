AFRAME.registerComponent('new-tab', {
    schema: {
        url: {type: 'string', default: 'https://www.cerave.com/'},
    },
    
    init() {
        this.el.addEventListener('click', (e) => {
            window.open(this.data.url);

            // Reset product placement as new tab is opened and camera might have shifted
            resetProduct();
        });
    },
});