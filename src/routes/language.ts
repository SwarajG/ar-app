interface languageText {
  [key: string]: {
    //Buttons
    closeButtonText: string,
    resetButtonText: string,
  
    //Dashboard Labels
    reviewLabelText: string,
    ourScienceLabelText: string,
    textureLabelText: string,
    routinesLabelText: string,
    
    //Instructions
    swipeInstText: string,
    pinchScaleInstText: string,

    //Modal Heads
    ingredientsHead : string,
    ceramidesHead : string,
    efficacyHead : string,
    howToApplyHead: string,
    howToApplySteps: string,

    //Hotspot Labels
    ingredientsHotspotLabel : string,
    ceramidesHotspotLabel : string,
    efficacyHotspotLabel : string,
    lookInsideHotspotLabel : string,
    howToApplyHotspotLabel : string,
    moreReviewsHotspotLabel: string,

    //Place here message
    placeHereText: string,
    placeHereInfo: string,

  }
}

export const languageText: languageText = {
  en: {
    //Buttons
    closeButtonText: 'Close',
    resetButtonText: 'Reset',

    //Dashboard Labels
    reviewLabelText: 'Reviews',
    ourScienceLabelText: 'Our Science',
    textureLabelText: 'Texture',
    routinesLabelText: 'Routines',

    //instructions
    swipeInstText: 'Swipe to Rotate',
    pinchScaleInstText: 'Pinch to Scale',

    //Modal Heads
    ingredientsHead : 'Ingredients',
    ceramidesHead : 'Science of Ceramides',
    efficacyHead : 'Highlights',
    howToApplyHead: 'How to Apply',
    howToApplySteps: 'Steps',

    //Hotspot Labels
    ingredientsHotspotLabel : 'Ingredients',
    ceramidesHotspotLabel : 'Ceramides',
    efficacyHotspotLabel : 'Highlights',
    lookInsideHotspotLabel : 'Look Inside',
    howToApplyHotspotLabel : 'How to Apply',
    moreReviewsHotspotLabel: 'More',

    //Place here message
    placeHereText: 'Place Here',
    placeHereInfo: 'Tap to place the product on a flat surface'
  },
  es: {
    //Buttons
    closeButtonText: 'Cerrar',
    resetButtonText: 'Reinicar',
    
    //Dashboard Labels 
    reviewLabelText: 'Reseñas',
    ourScienceLabelText: 'Nuestra Ciencia',
    textureLabelText: 'Textura',
    routinesLabelText: 'Rutinas',

    //Instructions
    swipeInstText: 'Deslizar para Rotar',
    pinchScaleInstText: 'Pellizcar a Escala',

    //Modal Heads
    ingredientsHead : 'Ingredientes',
    ceramidesHead : 'Ciencia de las Ceramidas',
    efficacyHead : 'Destacar',
    howToApplyHead: 'Cómo Aplicar',
    howToApplySteps: 'Pasos',

    //Hotspot Labels
    ingredientsHotspotLabel : 'Ingredientes',
    ceramidesHotspotLabel : 'Ceramidas',
    efficacyHotspotLabel : 'Descatar',
    lookInsideHotspotLabel : 'Mirar Dentro',
    howToApplyHotspotLabel : 'Como Aplicar',
    moreReviewsHotspotLabel: 'Mas',

    //Place here message
    placeHereText: 'Lugar Aqui',
    placeHereInfo: 'Toque para colocar el producto en una superficie plana',
  },
};
