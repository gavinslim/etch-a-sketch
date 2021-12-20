const max_size = 640;
var num_cubes;
var curr_color = '#000000';
let started = false;
let black = true;

let gradient = ['#FE2712', '#FC500A', '#FB9902', '#FCCC1A',
                '#FEFE33', '#B2D732', '#66B032', '#347C98',
                '#0247FE', '#4424D6', '#8601AF', '#C21460']
var gradient_idx = 0;

const inc_color = () => {
    // var hex = parseInt(color.slice(1), 16) + 1;
    // console.log(hex);
    // return '#' + hex.toString(16);

    // let color_arr = color.slice(
    //     color.indexOf("(") + 1, 
    //     color.indexOf(")")
    // ).split(",");

    // let R = color_arr[0];
    // let G = color_arr[1];
    // let B = color_arr[2];
    // console.log(gradient_idx, gradient[gradient_idx], gradient.length);
    
    let color = gradient[gradient_idx];
    if (gradient_idx == gradient.length) {
        gradient_idx = 0;
    } else {
        gradient_idx++;
    }

    return color;
}

// Initiate drawing when mouse pressed
function mouse_down() {
    started = true;
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
function mouse_up() {
    started = false;
}

function update() {
    // var select = document.getElementById('size');
    // num_cubes = select.options[select.selectedIndex].value;

    // Slider range
    var slider = document.getElementById('cube_range');
    var display = document.getElementById('display');
    display.innerHTML = slider.value + "x" + slider.value; 
    num_cubes = slider.value;

    slider.oninput = function() {
        display.innerHTML = this.value + "x" + this.value;
        num_cubes = this.value;
    }

    // Remove existing grid
    const parent = document.getElementsByClassName('grid-container')[0];
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }

    // Generate new grid
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
        cubes[i].addEventListener('mousedown', mouse_down, false);
        cubes[i].addEventListener('mousemove', mouse_move, false); 
        cubes[i].addEventListener('mouseup', mouse_up, false);
        cubes[i].addEventListener('click', e => {
            e.currentTarget.style.setProperty('background-color', curr_color);
        });
    }    
}

// Init reset button
const retry = document.getElementById('reset');
retry.addEventListener('click', update, false);

// Init color toggle button
const color = document.getElementById('color-toggle');
color.addEventListener('click', e => {
    if (black == true) {
        e.currentTarget.innerHTML = 'Rainbow';
        black = false;
        curr_color = inc_color();
    } else {
        e.currentTarget.innerHTML = 'Black';
        black = true;
        curr_color = '#000000'
    }
});

update();
