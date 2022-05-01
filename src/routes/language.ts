interface languageText {
  [key: string]: {
    closeButtonText: string,
  
    // Dashboard Labels
    reviewLabelText: string,
    ourScienceLabelText: string,
    textureLabelText: string,
    routinesLabelText: string,
    
    // Instructions
    swipeInstText: string,
    pinchScaleInstText: string,
  }
}

export const languageText: languageText = {
  en: {
    closeButtonText: 'Close',

    // Dashboard Labels En
    reviewLabelText: 'Reviews',
    ourScienceLabelText: 'Our Science',
    textureLabelText: 'Texture',
    routinesLabelText: 'Routines',

    swipeInstText: 'Swipe to Rotate',
    pinchScaleInstText: 'Pinch to Scale',
  },
  es: {
    closeButtonText: 'Cerrar',
    
    // Dashboard Labels Es
    reviewLabelText: 'Reseñas',
    ourScienceLabelText: 'Nuestra Ciencia',
    textureLabelText: 'Textura',
    routinesLabelText: 'Rutinas',

    swipeInstText: 'Deslizar para Rotar',
    pinchScaleInstText: 'Pellizcar a Escala',
  },
};
