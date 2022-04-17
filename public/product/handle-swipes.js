// currentStateVal = 0 -> Review State
// currentStateVal = 1 -> Our Science State
// currentStateVal = 2 -> Texture State
// currentStateVal = 3 -> Frequently Bought Together State
let prevStateVal = 0
let currentStateVal = 0
const states = ['review-state', 'our-science-state', 'texture-state', 'frequently-bt-state']
const dashboardRadios = ['radio-review', 'radio-our-science', 'radio-texture', 'radio-frequently-bt']

// rotation value of allStates starts from 0
window.rotY = 0

// Swipe Lock & Tap Lock
//let swipeEnabled = '1'
let dasboardTapEnabled = '1'

// State vars
let allStates
let frequentlyBTState


AFRAME.registerComponent('handle-swipes', {
    init() {
        //Initialize Entity values
        assignEntityValues();
    },

    tick() {

        dasboardTapEnabled = window.scene.getAttribute('dasboardTapEnabled')

    }


});

function swipeHotspots(prevState, nextState) {
    // Disable Swiping & Disable Dashboard Taps
    window.scene.setAttribute('dasboardTapEnabled', '0')

    document.getElementById('dashboard').style.pointerEvents = 'none'

    // Enable Swiping & Dashboard Taps after 1 sec
    setTimeout(() => {
        window.scene.setAttribute('dasboardTapEnabled', '1')
        document.getElementById('dashboard').style.pointerEvents = 'auto'
    }, 1000)

    // when Current State is Frequently BT State
    // Different Animation Style
    if (nextState.getAttribute('id') === 'frequently-bt-state') {
        frequentlyBTState.setAttribute('animation', 'property: position; from: 0, 5, 0; to: 0, 0, 0; dur: 1000; easing:easeInQuad')
    }
    // when PrevState is FrequentlyBT State
    // Different Animation Style
    else if (prevState.getAttribute('id') === 'frequently-bt-state') {
        frequentlyBTState.setAttribute('animation', 'property: position; from: 0, 0, 0; to: 0, 5, 0; dur: 1000; easing:easeOutQuad')
    }

    // Hide the Prev State by Scaling Down
    for (let i = 0; i < prevState.children.length; i++) {
        prevState.children[i].children[0].children[0].setAttribute('animation', 'property: scale; from: 1, 1, 1; to: 0, 0, 0; dur: 1000')
    }

    // Show the Current State by Scaling Up
    nextState.object3D.visible = true

    for (let i = 0; i < nextState.children.length; i++) {
        nextState.children[i].children[0].children[0].setAttribute('animation', 'property: scale; from: 0, 0, 0; to: 1, 1, 1; dur: 1000')
    }

    // Change the Current State in Dashboard UI
    document.getElementById(dashboardRadios[currentStateVal]).checked = true
}

// On Dashboard ICON Tap
window.switchDashboard = (dashboardRadio) => {
    if (dasboardTapEnabled === '1') {
        prevStateVal = currentStateVal
        currentStateVal = dashboardRadio.value

        const prevState = document.getElementById(states[prevStateVal])
        const nextState = document.getElementById(states[currentStateVal])

        if (prevStateVal < currentStateVal) {
            // Rotate in multiples of -90
            allStates.setAttribute('animation', `property: rotation; to: 0, ${window.rotY - (90 * (currentStateVal - prevStateVal))}, 0; dur: 1000`)
            window.rotY -= (90 * (currentStateVal - prevStateVal))
        } else {
            // Rotate in multiples of 90
            allStates.setAttribute('animation', `property: rotation; to: 0, ${window.rotY + (90 * (prevStateVal - currentStateVal))}, 0; dur: 1000`)
            window.rotY += (90 * (prevStateVal - currentStateVal))
        }

        swipeHotspots(prevState, nextState)
    }
}

window.assignEntityValues = () => {
    
    // ReAssign value to all state-group vars
    allStates = document.querySelector('#all-states')
    frequentlyBTState = document.querySelector('#frequently-bt-state')

    // Reset the prev and current state vars to 0 to start fresh from Review State
    prevStateVal = 0
    currentStateVal = 0

    // Set Review State as checked in dashboard UI
    document.getElementById(dashboardRadios[currentStateVal]).checked = true

    // Scene var
    window.scene = document.querySelector('a-scene')
    window.base = document.getElementById('base')

    // Reset rotY value to 0
    window.rotY = 0

}