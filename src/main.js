import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

hideLoadMoreButton();

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      iziToast.error({
        title: '😕 No images',
        message: `No results for "${query}"`,
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    if (page * PER_PAGE < totalHits) showLoadMoreButton();
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page++;
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * PER_PAGE >= totalHits) {
      iziToast.info({
        title: "We're sorry",
        message: "You've reached the end of search results.",
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  } finally {
    hideLoader();
  }
}
