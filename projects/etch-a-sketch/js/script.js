document.addEventListener("DOMContentLoaded", () => { 
    
    const DEFAULT_SIZE = 16;
    const DEFAULT_MODE = 'color'
    const DEFAULT_COLOR = '#1F271B'
    const SHADE_COLOR = 'rgba(255, 255, 255, 0)';

    let current_color = DEFAULT_COLOR;
    let current_mode = DEFAULT_MODE;
    let current_size = DEFAULT_SIZE;
    let shade_color = SHADE_COLOR;

    const grid = document.getElementById('grid');
    const size = document.getElementById('size');

    const colorSelected = document.getElementById('color-selected');
    const colorMode = document.getElementById('color-mode');
    const shade = document.getElementById('shade');
    const eraser = document.getElementById('eraser');
    const clear = document.getElementById('clear');
    const range = document.getElementById('range');
    const apply = document.getElementById('apply');

    colorSelected.value = current_color;

    let mouseDown = 0;

    document.body.onmousedown = () => mouseDown = 1;
    document.body.onmouseup = () => mouseDown = 0;

    const setSize = () => {
        size.textContent = `Canvas size: ${current_size} x ${current_size}`;
    }

    const draw = (event) => {
        if(mouseDown) {
            switch(current_mode) {
                case 'color':
                    event.target.style.backgroundColor = current_color;
                    break;
                case 'shade':
                    console.log(shade_color);
                    event.target.style.backgroundColor = current_color;
                    break;
                case 'eraser':
                    event.target.style.backgroundColor = '#fff';
                    break;
            }
        }
    };

    const setUpGrid = (size) => {
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

        for(let i = 0; i < size * size; i++) {
            const gridElement = document.createElement('div');
            gridElement.addEventListener('mousedown', draw);
            gridElement.addEventListener('mouseover', draw);
            grid.appendChild(gridElement);
        }
    }

    const clearGrid = () => {
        for(const child of grid.children) {
            child.style.backgroundColor = 'white';
        }
    }

    range.addEventListener('input', () => {
        current_size = range.value;
        setSize();
    })

    colorSelected.addEventListener('input', () => {
        current_color = colorSelected.value;
    });

    colorMode.addEventListener('click', () => {
        colorMode.classList.add('selected');
        shade.classList.remove('selected');
        eraser.classList.remove('selected');

        current_mode = 'color';
    });

    shade.addEventListener('click', () => {
        shade.classList.add('selected');
        eraser.classList.remove('selected');
        colorMode.classList.remove('selected');

        current_mode = 'shade';
    });

    eraser.addEventListener('click', () => {
        eraser.classList.add('selected');
        shade.classList.remove('selected');
        colorMode.classList.remove('selected');

        current_mode = 'eraser'; 
    });

    clear.addEventListener('click', clearGrid);

    apply.addEventListener('click', () => {
        clearGrid();
        setUpGrid(current_size);
    })

    setUpGrid(current_size);
    setSize();
});