import { Viewer } from '@photo-sphere-viewer/core';

export const panoramicViewer = () => {
    const panoramaImagePath = new URL('../assets/images/Panorama.jpg', import.meta.url);
    const panoramaImage2Path = new URL('../assets/images/Panorama2.jpg', import.meta.url);
    const panoramaImage3Path = new URL('../assets/images/Panorama3.jpg', import.meta.url);
    const panoramaImage4Path = new URL('../assets/images/Panorama4.jpg', import.meta.url);
    const nextButton = document.getElementById('panoramic-right-arrow');

    let count = 0;

    const images = [
        panoramaImagePath.href,
        panoramaImage2Path.href,
        panoramaImage3Path.href,
        panoramaImage4Path.href
    ];

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

        // re-initialize the panoramic viewer
        initializePanoramicViewer();
    };

    function initializePanoramicViewer() {
        const viewer = new Viewer({
            container: document.querySelector('#viewer'),
            panorama: images[count],
            caption: 'Front Entrance',
            defaultZoomLvl: 0,
            navbar: [
                'caption',
                'zoom',
                'move',
                'fullscreen',
                // {
                //     id: 'my-button',
                //     content: '<svg...>',
                //     title: 'Hello world',
                //     className: 'custom-button',
                //     onClick: (viewer) => {
                //         alert('Hello from custom button');
                //     },
                // },
            ],
        });
    }

    // Attach the initial event listener to the next button
    nextButton.addEventListener('click', nextImage);
    updateViewer();
};