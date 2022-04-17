AFRAME.registerComponent('tap-hotspot', {
    init() {
        this.el.addEventListener('click', (event) => {
            let value = this.el.getAttribute('hotspot-value');
            let className = this.el.getAttribute('class');

            // Hide all internal modals
            hideAllModals();

            // Show the particular internal modal
            if (className.includes('review-hotspot')) {
                let modalId = "review-" + value;
                document.getElementById(modalId).classList.remove("hide");

                // Show the Parent modal container
                document.getElementById(modalId).parentElement.parentElement.classList.remove("hide");
            }
            else if (className.includes('our-science-hotspot')) {
                let modalId = "our-science-" + value;
                document.getElementById(modalId).classList.remove("hide");

                // Show the Parent modal container
                document.getElementById(modalId).parentElement.parentElement.classList.remove("hide");
            }
            else if (className.includes('texture-hotspot')) {
                if(value === '1'){
                    let modalId = "texture-" + value;

                    lookInside();
                }
                else if(value === '2'){
                    let modalId = "texture-" + value;
                    document.getElementById(modalId).classList.remove("hide");

                    // Show the Parent modal container
                    document.getElementById(modalId).parentElement.parentElement.classList.remove("hide");
                }                
            }
        });
    }
});

function lookInside(){
    console.log('look inside');
    let product = document.getElementById('product');
    
    let containerMesh1 = product.getObject3D('mesh').getObjectByName('bottle')
    let containerMesh2 = product.getObject3D('mesh').getObjectByName('cap')

    containerMesh1.material.transparent = true
    containerMesh2.material.transparent = true

    // containerMesh1.material.alpha = 0.1
    // containerMesh2.material.alpha = 0.1
    // containerMesh3.material.alpha = 0.1
    containerMesh1.traverse((node) => {
        node.material.opacity = 0.1
    })
    containerMesh2.traverse((node) => {
        node.material.opacity = 0.1
    })
}

function closeModal() {
    // document.getElementById("the-modal").classList.add("hide");
    hideAllModals();
}

function hideAllModals() {
    let reviews = document.getElementsByClassName("review-modal");
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].classList.add("hide");
    }

    let ourScience = document.getElementsByClassName("our-science-modal");
    for (let i = 0; i < ourScience.length; i++) {
        ourScience[i].classList.add("hide");
    }

    let textures = document.getElementsByClassName("texture-modal");
    for (let i = 0; i < textures.length; i++) {
        textures[i].classList.add("hide");
    }

    let modalContainer = document.getElementsByClassName("modal-container");
    for (let i = 0; i < modalContainer.length; i++) {
        modalContainer[i].classList.add("hide");
    }
}