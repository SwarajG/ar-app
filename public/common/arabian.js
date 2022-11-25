const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const langDetect = urlParams.get('lang');

//CSS changes for Arabic Text
if (langDetect == 'ar'){
    //Dashboard radio button label font size increased
    var radioLabels = document.getElementsByClassName("radio-label");
    for (var i = radioLabels.length - 1; i >= 0; i--) {
        radioLabels[i].style.fontSize = "16px";
    }
    //Review modal - info text alignment
    var infoTextAlign = document.getElementsByClassName("review-modal__info-text");
    for (var i = 0; i < infoTextAlign.length - 1;  i+=2) {
        infoTextAlign[i].style.marginLeft = "auto";
        infoTextAlign[i].style.fontSize = "14px";
    }

    //Review Modal - star alignment
    
    var ratingStarsAlign = document.getElementsByClassName("review-modal__rating")
    for (var i = 0; i < ratingStarsAlign.length; i++){
        ratingStarsAlign[i].style.justifyContent = "flex-end";
        console.log(i);
    }

    var ratingStarsPadding = document.getElementsByClassName("fa");
    for (var i = 0; i < ratingStarsPadding.length;  i++) {
        ratingStarsPadding[i].style.paddingLeft = "2px";
        ratingStarsPadding[i].style.paddingRight = "2px";
    }

    //How to Apply - Steps
    var howToApplyStepsAlign = document.getElementById("list-of-steps");
    howToApplyStepsAlign.dir = "rtl";
    howToApplyStepsAlign.style.marginRight = "20px";
}