const max_size = 640;
var num_cubes;
var curr_color = '#000000';
let is_drawing = false;
let black_color = true;

const inc_color = (color) => {
    return color;
}

// Initiate drawing when mouse pressed
function mouse_down() {
    is_drawing = true;
}

// Change background color of cube
function mouse_move(e) {
    if (is_drawing) {
        this.style.setProperty('background-color', curr_color);
    }
}

// Disable drawing when mouse released
function mouse_up() {
    is_drawing = false;
}

function update() {
    var select = document.getElementById('size');
    num_cubes = select.options[select.selectedIndex].value;

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
    if (black_color == true) {
        e.currentTarget.innerHTML = 'Rainbow';
        black_color = false;
        curr_color = inc_color(curr_color);
    } else {
        e.currentTarget.innerHTML = 'Black';
        black_color = true;
        curr_color = '#000000'
    }
});

update();
