AFRAME.registerComponent('tap-hotspot', {
    init(){
        this.el.addEventListener('click', (event) => {
            console.log(this.el.getAttribute('id') + " clicked");
            
            let value = this.el.getAttribute('hotspot-value')            
            let modalId = "review-id-" + value;
            let className = this.el.getAttribute('class')
            
            // Hide all internal modals
            hideAllModals();

            // Show the Parent modal container
            document.getElementById("the-modal").classList.remove("hide");

            // Show the particular internal modal
            if(className.includes('review-hotspot')){
                // console.log(data.productData.reviews);
                document.getElementById(modalId).classList.remove("hide");
            }
            else if(className.includes('ingredients-hotspot')){
                console.log("modal-ingredients");
            }

            // console.log("RD 2 - " + data.productData.reviews[1].head);

            // document.getElementById("").classList.remove("hide");
        });
    }
});

// function openReviewModal3(){
//     hideAllModals();
//     document.getElementById("the-modal").classList.remove("hide");
//     reviewmodal3.classList.remove("hide");
// }

function closeModal(){
    document.getElementById("the-modal").classList.add("hide");
}

function hideAllModals(){
    let reviews = document.getElementsByClassName("review-modal");
    for (let i = 0; i < reviews.length; i++){
        reviews[i].classList.add("hide");
    }
}