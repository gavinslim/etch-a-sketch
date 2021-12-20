const max_size = 640;
var num_cubes;
var curr_color = '#333';
let started = false;
let black = true;

let gradient = ['#FE2712', '#FC500A', '#FB9902', '#FCCC1A',
                '#FEFE33', '#B2D732', '#66B032', '#347C98',
                '#0247FE', '#4424D6', '#8601AF', '#C21460']

var gradient_idx = 0;

const inc_color = () => {
    gradient_idx++
    if (gradient_idx == gradient.length) {gradient_idx = 0;}
    return gradient[gradient_idx];
}

// Initiate drawing when mouse pressed
function mouse_click() {
    started = true;
    if (black == false) {
        curr_color = inc_color(curr_color);
    } 
    this.style.setProperty('background-color', curr_color);
}

// Change background color of cube
function mouse_move(e) {
    if (started) {
        if (black == false) {
            curr_color = inc_color(curr_color);
        }
        this.style.setProperty('background-color', curr_color);
    }
}

// Disable drawing when mouse released
function mouse_release() {
    started = false;
}

// Remove existing grid
function clear_grid() { 
    const parent = document.getElementsByClassName('grid-container')[0];
    parent.innerHTML = "";
}

function add_grid(num_cubes) {
    // Generate new grid
    const parent = document.getElementsByClassName('grid-container')[0];
    for (let i = 0; i < (num_cubes * num_cubes); i++) {
        const cube = document.createElement('div'); 
        cube.classList.add('cube');
        parent.appendChild(cube); 
    }

    // Modify new grid width property based on user selection
    const cube_sz = max_size / num_cubes;
    parent.style.setProperty('grid-template-columns', 'repeat(' + num_cubes + ',' + cube_sz + 'px)');
    parent.style.setProperty('grid-template-rows', 'repeat(' + num_cubes + ',' + cube_sz + 'px)');

    // Add event listeners to each cube
    var cubes = document.getElementsByClassName('cube');
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].style.width = cube_sz;
        cubes[i].addEventListener('mousedown', mouse_click, false);
        cubes[i].addEventListener('mouseover', mouse_move, false); 
        cubes[i].addEventListener('mouseup', mouse_release, false);
        cubes[i].addEventListener('click', e => {
            e.currentTarget.style.setProperty('background-color', curr_color);
        });
    }  
}

function update() {
    // Slider range
    var slider = document.getElementById('cube_range');
    var display = document.getElementById('display');
    display.innerHTML = slider.value + ' x ' + slider.value; 
    num_cubes = slider.value;

    slider.oninput = function() {
        display.innerHTML = this.value + ' x ' + this.value;
        num_cubes = this.value;
    }

    clear_grid();
    add_grid(num_cubes);  
}

// Initialize reset button
const retry = document.getElementById('reset');
retry.addEventListener('click', update, false);

// Initialize color toggle button
const color = document.getElementById('color-toggle');
color.addEventListener('click', e => {
    if (black == true) {
        e.currentTarget.innerHTML = 'Rainbow Mode';
        black = false;
    } else {
        e.currentTarget.innerHTML = 'Black Mode';
        black = true;
        curr_color = '#333'
    }
});

// Initialize color buttons
const palette = document.getElementsByClassName('palette')[0];
gradient.forEach(color => {
    const color_btn = document.createElement('button');

    // Add attributes and properties
    color_btn.classList.add('color-button');
    color_btn.style.setProperty('background-color', color);
    color_btn.setAttribute('id', color);
    color_btn.addEventListener('click', function() {
        curr_color = this.id;
        black = true;
    }, false);
    palette.appendChild(color_btn);
});

update();
