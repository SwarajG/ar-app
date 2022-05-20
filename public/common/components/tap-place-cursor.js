/* globals AFRAME */
let baseElement;
let resetButton;
let dashboard;
let overlayFlag = 0;
let overlayTimeout;
let opacityOverlay; 
// var xx = document.getElementById('instruction-container');
// let compStyle = window.getComputedStyle(instructionOverlay);
let opacityTimeout; 
var deltaOverlay = 0.1;

//Hide Instructions overlay

function closeInstructionOverlay(){
  clearTimeout(overlayTimeout); 
  //add hide and remove active class after fadeOut function
  $('#instruction-container').fadeOut(300, function(){
    document.getElementById('instruction-container').classList.add('hide');
    document.getElementById('info-button').classList.remove('active'); 
  });
}

function openInstructionOverlay(){
  document.getElementById('instruction-container').classList.remove('hide');
  document.getElementById('info-button').classList.add('active');
  // console.log($('#instruction-container'));
  $('#instruction-container').fadeIn(300);
  
  //Autohide the overlay after 5 secs with slow fade
  overlayTimeout = setTimeout(() => {
    $('#instruction-container').click(false);
    $('#instruction-container').fadeOut(2000, function(){
      closeInstructionOverlay();
    });
  }, 5000);
  
}

// Resets product - hides it and the dashboard; 
// Resets all states to review state
function resetProduct(){
  baseElement = document.getElementById('base');

  // Set Scale Zero for the bottle hotspots to become untappable
  baseElement.setAttribute('scale', {x: 0, y: 0, z: 0});

  // Remove pinch scale to solve the jump-scale-bug
  baseElement.removeAttribute('xrextras-pinch-scale');

  // Hide the base
  baseElement.object3D.visible = false;

  // Show Reticle
  document.getElementById('reticle').object3D.visible = true;

  // Show product place here info message container
  document.getElementById('place-product').classList.remove('hide');

  // Set the product-placed flag
  baseElement.setAttribute('product-placed', '0');

  // Hide dashboard UI
  dashboard.classList.add('hide');

  //Hide Instructions Overlay
  closeInstructionOverlay();

  // Close product if opened already
  if(document.getElementById('product').getAttribute('opened') === '1'){
    closeProduct();
  }

  // Reset All States
  ResetAllStates();

  function ResetAllStates(){
    prevStateVal = currentStateVal;
    currentStateVal = 0;

    const prevState = document.getElementById(states[prevStateVal]);
    const nextState = document.getElementById(states[currentStateVal]);

    allStates.setAttribute('animation', `property: rotation; to: 0, ${window.rotY + (90 * (prevStateVal - currentStateVal))}, 0; dur: 1000`);
    window.rotY += (90 * (prevStateVal - currentStateVal));

    swipeHotspots(prevState, nextState);
  }
}

// Places Product - Makes it visible and applies a pop scale animation
function placeProduct() {
  // Set BaseElement
  baseElement = document.getElementById('base');

  // if product not placed yet
  if (baseElement.getAttribute('product-placed') === '0') {
    // Set pos of product according to reticle pointer
    baseElement.setAttribute('position', document.getElementById('reticle').object3D.position);
    
    // Make visible
    baseElement.object3D.visible = true;

    // Remove animation before adding to be safe
    baseElement.removeAttribute('animation');

    // Set the product-placed flag
    baseElement.setAttribute('product-placed', '1');

    // Hide Reticle
    document.getElementById('reticle').object3D.visible = false;

    // Hide product place here info message container
    document.getElementById('place-product').classList.add('hide');

    // Show dashboard UI
    dashboard.classList.remove('hide');

    //Open Instruction Overlay
    if (overlayFlag === 0){
      openInstructionOverlay();
      overlayFlag = 1;
    }
    
    // Setting pinch scale component attributes
    baseElement.setAttribute('xrextras-pinch-scale', {
      min: 0.5,
      scale: 1,
      max: 5
    });
    
    // Scale Up pop animation
    baseElement.setAttribute('animation', {
      property: 'scale',
      from: '0.001 0.001 0.001',
      to: '1, 1, 1',
      easing: 'easeOutElastic',
      dur: 1500,
    });
  }
}

// Component that places the product when the ground is clicked
AFRAME.registerComponent('tap-place-cursor', {
  init() {
    this.raycaster = new THREE.Raycaster();
    this.camera = document.getElementById('camera');
    this.threeCamera = this.camera.getObject3D('camera');
    this.ground = document.getElementById('ground');

    baseElement = document.getElementById('base');
    resetButton = document.getElementById('reset-button');
    dashboard = document.getElementById('dashboard');

    // 2D coordinates of the raycast origin, in normalized device coordinates (NDC)---X and Y
    // components should be between -1 and 1.  Here we want the cursor in the center of the screen.
    this.rayOrigin = new THREE.Vector2(0, 0);
    this.cursorLocation = new THREE.Vector3(0, 0, 0);

    // Hiding the baseElement to ensure modal loads with animation first time
    setTimeout(() => {
      baseElement.object3D.visible = false;
    }, 1000);

    // Ground Tap Handler
    document.getElementById('ground').addEventListener('click', (event) => {
      placeProduct();
    });

    // Reticle Tap Handler
    document.getElementById('reticle').addEventListener('click', (event) => {
      placeProduct();
    });

    resetButton.onclick = resetProduct;
  },

  tick() {
    // Raycast from camera to 'ground'
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera);
    const intersects = this.raycaster.intersectObject(this.ground.object3D, true);
    if (intersects.length > 0) {
      const [intersect] = intersects;
      this.cursorLocation = intersect.point;
    }
    this.el.object3D.position.y = 0.1;
    this.el.object3D.position.lerp(this.cursorLocation, 0.1);
    this.el.object3D.rotation.y = this.threeCamera.rotation.y;
  },
});