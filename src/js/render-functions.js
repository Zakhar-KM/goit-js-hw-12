import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const container = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="gallery__info">
        <p class="gallery__text"><b>Likes</b><span>${likes}</span></p>
        <p class="gallery__text"><b>Views</b><span>${views}</span></p>
        <p class="gallery__text"><b>Comments</b><span>${comments}</span></p>
        <p class="gallery__text"><b>Downloads</b><span>${downloads}</span></p>
        </div>
      </a>
    </li>`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader-container').classList.remove('hidden');
}
export function hideLoader() {
  document.querySelector('.loader-container').classList.add('hidden');
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('is-hidden');
}
