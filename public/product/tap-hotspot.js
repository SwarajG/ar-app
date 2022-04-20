const bottleOpenCloseDur = 1500

AFRAME.registerComponent('tap-hotspot', {
    init() {
        this.el.addEventListener('click', (event) => {
            let value = this.el.getAttribute('hotspot-value');
            let className = this.el.getAttribute('class');
            let modalId;

            // Hide all modals before showing this one
            hideAllModals();

            // Show the particular internal modal
            if (className.includes('review-hotspot')) {
                modalId = "review-" + value;
                document.getElementById(modalId).classList.remove("hide");
            }
            else if (className.includes('our-science-hotspot')) {
                modalId = "our-science-" + value;
                document.getElementById(modalId).classList.remove("hide");
            }
            else if (className.includes('texture-hotspot')) {
                modalId = "texture-" + value;

                if(value === '1'){
                    if(document.getElementById('product').getAttribute('opened') === '0'){
                        openProduct(bottleOpenCloseDur);
                    }
                    else{
                        closeProduct(bottleOpenCloseDur);
                    }
                    return;
                }
                else if(value === '2'){
                    document.getElementById(modalId).classList.remove("hide");
                }
            }
            // Show the Parent modal container
            document.getElementById(modalId).parentElement.parentElement.classList.remove("hide");
        });
    }
});

function openProduct(dur){
    document.getElementById('product-left').setAttribute('animation', `property: position; to: -2, 0, 0; dur: ` + dur + `; easing: easeInQuad`);
    document.getElementById('product-right').setAttribute('animation', `property: position; to: 2, 0, 0; dur: ` + dur + `; easing: easeInQuad`);

    document.getElementById('magnifying-glass-icon').object3D.visible = false;
    document.getElementById('close-icon').object3D.visible = true;

    document.getElementById('product').setAttribute('opened', '1');
}

function closeProduct(dur){
    document.getElementById('product-left').setAttribute('animation', `property: position; to: 0, 0, 0; dur: ` + dur + `; easing: easeOutQuad`);
    document.getElementById('product-right').setAttribute('animation', `property: position; to: 0, 0, 0; dur: ` + dur + `; easing: easeOutQuad`);

    document.getElementById('magnifying-glass-icon').object3D.visible = true;
    document.getElementById('close-icon').object3D.visible = false;
    
    document.getElementById('product').setAttribute('opened', '0');
}


function closeModal() {
    hideAllModals();

    // Stopping video in How To Apply modal
    // (Will stop any video in all iframes)
    $("iframe").each(function() { 
        var src= $(this).attr('src');
        $(this).attr('src', src);  
    });
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