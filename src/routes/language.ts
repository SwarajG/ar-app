interface languageText {
  [key: string]: {
    closeButtonText: string,
    reviewLabelText: string,
    
    // Instructions
    swipeInstText: string
  }
}

export const languageText: languageText = {
  en: {
    closeButtonText: 'Close',
    reviewLabelText: 'Reviews',
    swipeInstText: 'Swipe to Rotate'
  },
  es: {
    closeButtonText: 'Cerrar',
    reviewLabelText: 'Revies(es)',
    swipeInstText: 'Swipe to Rotate(es)'
  },
};
