const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 30;
const accessKey = 'hxU9mwob00_BneAkoSzINCtt5Tzlj2HbFrJCGe0vh5w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let photosArray = [];

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

async function getImagesFromUnsplahApi() {
    imagesLoaded = 0;
    ready = false;
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        totalImages = photosArray.length;
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true; 
        loader.hidden = true;
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getImagesFromUnsplahApi();
    }
});

// On Load
getImagesFromUnsplahApi();