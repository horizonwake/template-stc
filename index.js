import { carousel } from './scripts/carousel.js';
import { panoramicViewer } from './scripts/panoramic-viewer.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');
    carousel();
    panoramicViewer();
});

function sendEmail() {
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailBody = `${message}`;
    const mailtoLink = `mailto:recipient@example.com?subject=${subject}&body=${encodeURIComponent(emailBody)}\n\nsubmitted by: ${name}`;

    window.location.href = mailtoLink;
}

const ctaButton = document.getElementById('btn-send-email');

ctaButton.addEventListener('click', function (event) {
    var form = this.form;
    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
    } else {
        sendEmail();
    }
});