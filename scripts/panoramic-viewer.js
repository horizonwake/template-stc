import { Viewer } from '@photo-sphere-viewer/core';

export const panoramicViewer = () => {
    const panoramaImagePath = new URL('../assets/images/Panorama.jpg', import.meta.url);
    const panoramaImage2Path = new URL('../assets/images/Panorama2.jpg', import.meta.url);
    const panoramaImage3Path = new URL('../assets/images/Panorama3.jpg', import.meta.url);
    const panoramaImage4Path = new URL('../assets/images/Panorama4.jpg', import.meta.url);
    const nextButton = document.getElementById('panoramic-right-arrow');
    const dotsContainer = document.getElementById('panoramicDots'); // Assuming this is the ID for the dots container

    let count = 0;

    const images = [
        { image: panoramaImagePath.href, room: 'Front Entrance' },
        { image: panoramaImage2Path.href, room: 'Dining Room' },
        { image: panoramaImage3Path.href, room: 'Living Room' },
        { image: panoramaImage4Path.href, room: 'Kitchen' },
        { image: panoramaImagePath.href, room: 'Front Entrance' },
        { image: panoramaImage2Path.href, room: 'Dining Room' },
        { image: panoramaImage3Path.href, room: 'Living Room' },
        { image: panoramaImage4Path.href, room: 'Kitchen' }
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

    // Create and append the left arrow
    const leftArrow = document.createElement('span');
    leftArrow.id = 'panoramic-left-arrow';
    leftArrow.textContent = ' < ';
    leftArrow.addEventListener('click', prevImage);
    viewerContainer.appendChild(leftArrow);

    // Create and append the right arrow
    const rightArrow = document.createElement('span');
    rightArrow.id = 'panoramic-right-arrow';
    rightArrow.textContent = ' > ';
    rightArrow.addEventListener('click', nextImage);
    viewerContainer.appendChild(rightArrow);

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
                'caption',
                'zoom',
                'move',
                'fullscreen',
            ],
        });
    }

    // Attach the initial event listener to the next button
    nextButton.addEventListener('click', nextImage);
    updateViewer();
};