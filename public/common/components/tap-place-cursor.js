/* globals AFRAME */
let scene;
let baseElement;
let prod;
let resetButton;
let dashboard;
let overlayFlag = 0;
let overlayTimeout;
let opacityOverlay;

let overlayTimeout1;
let overlayTimeout2;
let overlayTimeout3;
let overlayTimeout4;

let instructionTimer = 3000;

var deltaOverlay = 0.1;
let instState = 1;

let firstHospots = ['review-hotspot-3', 'efficacy-hotspot', 'texture-hotspot-2']
let instructions3d = ['instructions-swipe-rotate', 'instructions-pinch-scale', 'instructions-tap-hotspot']
let highlightedHotspot = -1;

// Change instructions
function changeInstructionState(){
  // Hide the 3d instructions for insState = 1, 2, 3
  hideAllInstructions3D();

  // Activate current instruction3d
  // Skip insState = 4 as it doesn't have 3d-instruction
  if(instState < 4){
    document.getElementById(instructions3d[instState-1]).object3D.visible = true;
  }

  // For insState = 3 : Start Highlight Animation on active
  if(instState === 3){
    // Highlight Review Hotspot 1 by animating color
    highlightFirstHotspots();

    // After InstructionTimer dur the highlighting should stop
    setTimeout(()=>{
      stopHotspotHighlighting();
    }, instructionTimer);
  }

  // Turn On UI for 'Tap on Dashboard'
  if(instState === 4){
    // Show 2d instruction for Changing Sections
    document.getElementById('dashboard-toolbar-inst').style.display = "block";
    document.getElementById('dashboard-toolbar').style.top = "75%";
    document.getElementById('dashboard-toolbar-bg').style.backgroundColor = "#50b1ff9e";
    document.getElementById('dashboard-toolbar-bg').style.height = "120px";

    // Reset Dashboard UI
    setTimeout(()=>{
      resetChangeSectionInstruction();
    }, instructionTimer);
  }

  instState = instState + 1;

  if(instState === 5){
    instState = 1
  }
}

// Resets Dashboard UI to normal
function resetChangeSectionInstruction(){
  document.getElementById('dashboard-toolbar').style.top = "85%";
  document.getElementById('dashboard-toolbar-bg').style.backgroundColor = "#4040409e";
  document.getElementById('dashboard-toolbar-bg').style.height = "70px";
  document.getElementById('dashboard-toolbar-inst').style.display = "none";
}

// Stop the highlight animation on hotspot
function stopHotspotHighlighting(){
  // Removing animation and mixin from first hotspots and applying the mixin back again
  if(highlightedHotspot !== -1){
    // Remove Highlight Animation
    document.getElementById(firstHospots[highlightedHotspot]).removeAttribute('animation__highlight');

    // Remove mixin as animation was interfering the material even after removal
    document.getElementById(firstHospots[highlightedHotspot]).removeAttribute('mixin');

    // Reapplying origin mixin - hotspot-target to get default color back
    document.getElementById(firstHospots[highlightedHotspot]).setAttribute('mixin', 'hotspot-target');

    // Resetting the scale for the highlighted hotspot
    if(highlightedHotspot === currentStateVal){
      document.getElementById(firstHospots[highlightedHotspot]).object3D.scale.set(1, 1, 1);
    }
    else{
      document.getElementById(firstHospots[highlightedHotspot]).object3D.scale.set(0, 0, 0);
    }
  }
  highlightedHotspot = -1;
}

// Animating First Hotspot for tutorial
function highlightFirstHotspots(){
  // Start Highlight animation on first 3 sections only
  if(currentStateVal !== '3'){
    // Storing highlighted hotspot in a var
    highlightedHotspot = currentStateVal

    // Applying highlight animation
    // Animating Color from default blue to accent yellow
    document.getElementById(firstHospots[highlightedHotspot]).setAttribute('animation__highlight',
    'property: components.material.material.color; type: color; from: #0072ce; to: #eca221; dir: alternate; loop: true; enabled: true');
  }
}

// Hide all 3d instructions
function hideAllInstructions3D(){
  for(let i = 0; i < instructions3d.length; i++){
    document.getElementById(instructions3d[i]).object3D.visible = false;
  }
}   

// When Close Instructions button pressed
// Clear all timeouts
function closeInstructionOverlay(){
  clearTimeout(overlayTimeout1);
  clearTimeout(overlayTimeout2);
  clearTimeout(overlayTimeout3);
  clearTimeout(overlayTimeout4);
  instState = 1;

  // Add hide and remove active class after fadeOut function
  $('#instruction-container').fadeOut(300, function(){
    document.getElementById('instruction-container').classList.add('hide');
    document.getElementById('info-button').classList.remove('active'); 

    // Hide all 3d instructions - first three
    hideAllInstructions3D();

    // Hide the fourth instruction - Change Sections
    resetChangeSectionInstruction();
  });

  // Stop Highlight Animation if clicked on close
  stopHotspotHighlighting();
}

// Open Instructions overlay
function openInstructionOverlay(){
  // Start by Clearing Timeouts
  clearTimeout(overlayTimeout1);
  clearTimeout(overlayTimeout2);
  clearTimeout(overlayTimeout3);
  clearTimeout(overlayTimeout4);

  // Instructions start from 1
  instState = 1;

  // Show Instructions Header
  document.getElementById('instruction-container').classList.remove('hide');
  document.getElementById('info-button').classList.add('active');
  $('#instruction-container').fadeIn(300);

  // Show Instruction-1 : Swipe to Rotate
  changeInstructionState();

  // Show Instruction-2 : Pinch to Scale
  overlayTimeout1 = setTimeout(() => {
    changeInstructionState();
  }, instructionTimer);

  // Show Instruction-3 : Tap on Hotspot
  overlayTimeout2 = setTimeout(() => {
    changeInstructionState();
  }, instructionTimer * 2);

  // Show Instruction-4 : Change Section
  overlayTimeout3 = setTimeout(() => {
    changeInstructionState();
  }, instructionTimer * 3);

  // Close Intruction and Reset Timeouts
  overlayTimeout4 = setTimeout(() => {
    closeInstructionOverlay();
  }, instructionTimer * 4);
}

// Recenters Camera
function recenter(){
  scene.emit('recenter', {origin: this.origin, facing: {w: 0, x: 0, y: 0, z: 0}});
}

// Resets product - hides it and the dashboard; 
// Resets all states to review state
function resetProduct(){
  recenter();

  // Get Base Entity reference
  baseElement = document.getElementById('base');

  // Hide the base
  baseElement.object3D.visible = false;

  // Remove pinch scale to solve the jump-scale-bug
  baseElement.removeAttribute('xrextras-pinch-scale');

  // Remove one finger rotate component from PRODUCT && Add Align-To-Camera
  prod.removeAttribute('xrextras-one-finger-rotate');
  prod.setAttribute('align-to-camera', '');

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
    
    setTimeout(() => {
      prod.removeAttribute('align-to-camera');
      prod.setAttribute('xrextras-one-finger-rotate', '');
    }, 100)
    
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
    this.origin = this.camera.object3D.position.clone();

    scene = this.el.sceneEl;
    baseElement = document.getElementById('base');
    resetButton = document.getElementById('reset-button');
    dashboard = document.getElementById('dashboard');
    prod = document.getElementById('product');

    // 2D coordinates of the raycast origin, in normalized device coordinates (NDC)---X and Y
    // components should be between -1 and 1.  Here we want the cursor in the center of the screen.
    this.rayOrigin = new THREE.Vector2(0, 0);
    this.cursorLocation = new THREE.Vector3(0, 0, 0);

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

    // Check if we are in FBT section
    // Hide the Tap On Hotspot3d inst
    if (currentStateVal === '3' && document.getElementById(instructions3d[2]).object3D.visible){
      document.getElementById(instructions3d[2]).object3D.visible = false;
    }
  },
});