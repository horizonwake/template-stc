import { Viewer } from '@photo-sphere-viewer/core';

export const panoramicViewer = () => {
    const foyer = new URL('../assets/images/Mikes Cottage/01 FOYER.jpg', import.meta.url);
    const diningRoom = new URL('../assets/images/Mikes Cottage/02 DINING ROOM.jpg', import.meta.url);
    const greatRoom = new URL('../assets/images/Mikes Cottage/03 GREAT ROOM.jpg', import.meta.url);
    const kitchen = new URL('../assets/images/Mikes Cottage/04 KITCHEN.jpg', import.meta.url);
    const kitchen2 = new URL('../assets/images/Mikes Cottage/05 KITCHEN 02.jpg', import.meta.url);
    const hallway = new URL('../assets/images/Mikes Cottage/06 HALLWAY.jpg', import.meta.url);
    const masterBedroom = new URL('../assets/images/Mikes Cottage/07 MASTER BEDROOM.jpg', import.meta.url);
    const ensuite = new URL('../assets/images/Mikes Cottage/08 ENSUITE.jpg', import.meta.url);

    const dotsContainer = document.getElementById('panoramicDots');

    let count = 0;

    const images = [
        { image: foyer.href, room: 'Foyer', imageFP: '../assets/images/Mikes Cottage/01 FOYER.pdf'},
        { image: diningRoom.href, room: 'Dining Room', imageFP: '../assets/images/Mikes Cottage/02 DINING ROOM.pdf' },
        { image: greatRoom.href, room: 'Great Room', imageFP: '../assets/images/Mikes Cottage/03 GREAT ROOM.pdf' },
        { image: kitchen.href, room: 'Kitchen', imageFP: '../assets/images/Mikes Cottage/04 KITCHEN.pdf' },
        { image: kitchen2.href, room: 'Kitchen 02', imageFP: '../assets/images/Mikes Cottage/05 KITCHEN 02.pdf' },
        { image: hallway.href, room: 'Hallway', imageFP: '../assets/images/Mikes Cottage/06 HALLWAY.pdf' },
        { image: masterBedroom.href, room: 'Master Bedroom', imageFP: '../assets/images/Mikes Cottage/07 MASTER BEDROOM.pdf' },
        { image: ensuite.href, room: 'Ensuite', imageFP: '../assets/images/Mikes Cottage/08 ENSUITE.pdf' }
    ];

    // Create dots with custom tooltip
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        const tooltipText = document.createElement('span');
        tooltipText.classList.add('tooltip-text');
        tooltipText.textContent = images[i].room;

        dot.appendChild(tooltipText);
        dot.addEventListener('click', () => showImage(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.getElementsByClassName('dot');

    const showImage = (index) => {
        count = index;
        updateViewer();
    };

    const nextImage = () => {
        count++;
        if (count === images.length) {
            count = 0;
        }
        updateViewer();
    };

    const prevImage = () => {
        count--;
        if (count < 0) {
            count = images.length - 1;
        }
        updateViewer();
    };

    const updateViewer = () => {
    const viewerContainer = document.querySelector('#viewer');
    viewerContainer.innerHTML = ''; // Clear the viewer container

    // Create and append the floor plan image
    const FPMap = document.createElement('img');
    FPMap.src = images[count].imageFP ? images[count].imageFP : '';
    FPMap.classList.add('fp-map');
    viewerContainer.appendChild(FPMap);

    // Create and append the left arrow
    const leftArrow = document.createElement('span');
    leftArrow.id = 'panoramic-left-arrow';
    leftArrow.classList.add('panoramic-arrow');
    leftArrow.textContent = ' < ';
    leftArrow.addEventListener('click', prevImage);
    viewerContainer.appendChild(leftArrow);

    // Create and append the right arrow
    const rightArrow = document.createElement('span');
    rightArrow.id = 'panoramic-right-arrow';
    rightArrow.classList.add('panoramic-arrow');
    rightArrow.textContent = ' > ';
    rightArrow.addEventListener('click', nextImage);
    viewerContainer.appendChild(rightArrow);

    if (images.length <= 1) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
    }

    // Create dots container within the viewer container
    const dotsContainer = document.createElement('div');
    dotsContainer.id = 'panoramicDots';
    viewerContainer.appendChild(dotsContainer);

    // Create dots with custom tooltip
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        const tooltipText = document.createElement('span');
        tooltipText.classList.add('tooltip-text');
        tooltipText.textContent = images[i].room;

        dot.appendChild(tooltipText);
        dot.addEventListener('click', () => showImage(i));
        dotsContainer.appendChild(dot);
    }

    // Update dots active state
    const dots = dotsContainer.getElementsByClassName('dot');
    Array.from(dots).forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === count) {
            dot.classList.add('active');
        }
    });

    // re-initialize the panoramic viewer
    initializePanoramicViewer();
};
    function initializePanoramicViewer() {
        const viewer = new Viewer({
            container: document.querySelector('#viewer'),
            panorama: images[count].image,
            caption: images[count].room,
            defaultZoomLvl: 0,
            navbar: [
                'zoom',
                'caption',
                'move',
                'fullscreen',
            ],
        });
    }
    updateViewer();
};