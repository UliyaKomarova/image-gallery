const perPageImages = 12;
const defaultUrl = `https://api.unsplash.com/photos/?per_page=${perPageImages}&client_id=_Ja1qiB1Hdly5TQlDk6t29t98Rhou8ZFyvKHLXPreig`;
const searchUrl = `https://api.unsplash.com/search/photos?per_page=${perPageImages}&client_id=_Ja1qiB1Hdly5TQlDk6t29t98Rhou8ZFyvKHLXPreig&query=`;
const galleryWrapper = document.querySelector('.gallery-list');
const galleryItemClass = 'gallery-list__item';
const galleryItemImageClass = 'gallery-list__item-img';
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const searchClearButton = document.querySelector('.search__clear');

const imageHtml = (src, name) => {
    return `<li class=${galleryItemClass}><img class=${galleryItemImageClass} src="${src}" alt="${name}"></li>`;
};

const printData = (data) => {
    let imageList = data;

    if (!Array.isArray(data)) {
        imageList = data.results;
    }

    imageList.map((image) => {
        galleryWrapper.insertAdjacentHTML('beforeEnd', imageHtml(image.urls.regular, image.alt_description));
    });
    
    // for (let image of data) {
    //     galleryWrapper.insertAdjacentHTML('beforeEnd', imageHtml(image.urls.regular, image.alt_description));
    // }
};

const clearPage = () => {
    galleryWrapper.innerHTML = '';
};

const getInputValue = () => {
    return searchInput.value;
};

const search = () => {
    const inputValue = getInputValue();

    if (inputValue) {
        clearPage();
        getData(searchUrl + inputValue);
    }
};

searchClearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchClearButton.classList.remove('active');
});
searchButton.addEventListener('click', () => search());
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        searchClearButton.classList.add('active');
    }
});
searchInput.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode;
    if (key === 13) { // Enter
        searchButton.click();
    }
});

if ('autofocus' in searchInput) {
    console.log('Autofocus support is present');
} else {
    window.onload = () => searchInput.focus();
}

async function getData(url) {
    const result = await fetch(url);
    const data = await result.json();

    printData(data);
};

getData(defaultUrl);