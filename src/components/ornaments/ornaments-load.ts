import { content, header } from '../../constants';
import { IRenderPage } from '../../domains';
import './style-ornaments.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import data from '../../data';
import { Toy } from '../../createToy';
import SoundTrack from '../../audio';
import html from './ornaments.html';
import { compareByType, showError, toCleanUp } from './ornaments.helper';

const DEFAULT_COUNT_IN_STOCK = [0, 12];
const DEFAULT_BUY_YEAR = [1940, 2020];

const OrnamentsPage: IRenderPage = {
  render: async () => {
    if (content !== null) {
      content.innerHTML = html;
    }
    if (header !== null) {
      header.innerHTML = `<h2 class="page-title page__start">Главная</h2>
      <h1 class="page-title page__ornaments active-title">Игрушки</h1>
      <h2 class="page-title page__tree">Ёлочка</h2>`;
    }
  },

  afterRender: async () => {
    const toysContainer: HTMLElement | null =
      document.querySelector('.toys__wrapper') || null;
    const playAudioBtn: HTMLElement | null =
      document.querySelector('.btn-volume') || null;
    const snowingBtn: HTMLElement | null =
      document.querySelector('.btn-snow') || null;
    const closeWindowBtn: HTMLElement | null =
      document.querySelector('.close-window') || null;
    const errorWindow: HTMLElement | null =
      document.querySelector('.error_wrapper') || null;
    const errorMsgWrapper: HTMLElement | null =
      document.querySelector('.error-message') || null;
    closeWindowBtn?.addEventListener('click', () => {
      errorWindow?.classList.add('hidden');
    });
    //sorting btns
    const sortFavsBtn: HTMLElement | null =
      document.getElementById('show-favorite');
    const sortNotFavsBtn = document.getElementById('show-all');
    const shapesBtns =
      document.querySelectorAll<HTMLElement>('.form-item__image');

    const sortColorWhite: HTMLElement | null =
      document.getElementById('color-white');
    const sortColorYellow: HTMLElement | null =
      document.getElementById('color-yellow');
    const sortColorRed: HTMLElement | null =
      document.getElementById('color-red');
    const sortColorBlue: HTMLElement | null =
      document.getElementById('color-blue');
    const sortColorGreen: HTMLElement | null =
      document.getElementById('color-green');

    const sortSizeBig: HTMLElement | null =
      document.getElementById('show-size-big');
    const sortSizeMiddle: HTMLElement | null =
      document.getElementById('show-size-middle');
    const sortSizeLittle: HTMLElement | null =
      document.getElementById('show-size-little');

    const resetFiltersBtn: HTMLElement | null =
      document.querySelector('.reset-filters');
    const resetSettingsBtn: HTMLElement | null =
      document.querySelector('.reset-settings');
    //sliders
    let yearArray: string[] = [];
    let countsArray: string[] = [];

    //initial toy array
    const originalToys: Toy[] = [];
    data.forEach((item) => {
      const toyItem = new Toy(item);
      originalToys.push(toyItem);
    });
    //show filtered array
    const colorTypes: string[] = [];
    const sizeTypes: string[] = [];
    let shapeTypes: string[] = [];
    let favorite = false;
    let searchName = '';

    //functions
    function renderCards() {
      if (toysContainer !== null) toCleanUp(toysContainer);
      let filteredToys = originalToys.filter((toy) => {
        return (
          (searchName.length ? toy.toy.name.includes(searchName) : true) &&
          (sizeTypes.length ? sizeTypes.includes(toy.toy.size) : true) &&
          (shapeTypes.length ? shapeTypes.includes(toy.toy.shape) : true) &&
          (colorTypes.length ? colorTypes.includes(toy.toy.color) : true) &&
          (yearArray.length ? yearArray.includes(toy.toy.year) : true) &&
          (countsArray.length ? countsArray.includes(toy.toy.count) : true) &&
          (favorite ? toy.toy.favorite : true)
        );
      });
      const sortValue = (
        document.querySelector('.menu__sort-box') as HTMLSelectElement
      ).value;
      filteredToys = filteredToys.sort(compareByType(sortValue));

      filteredToys.forEach((toyItem) => {
        const toyTemplate = toyItem.createToyTemplate();
        toysContainer?.append(toyTemplate);
      });
      const msgEmpty = 'Извините, не нашлось подходящей игрушки';
      if (filteredToys.length == 0) {
        if (errorWindow !== null && errorMsgWrapper !== null)
          showError(errorWindow, errorMsgWrapper, msgEmpty); //show error if empty
      }

      const addBookmarkBtns: HTMLElement[] | null =
        Array.from(document.querySelectorAll<HTMLElement>('.bookmark')) || null;
      let bookmarks = localStorage.getItem('bookmarks')
        ? (JSON.parse(localStorage.getItem('bookmarks') || '') as string[])
        : [];
      addBookmarkBtns?.forEach((btn) => {
        const num = btn.dataset.number as string;
        if (bookmarks.includes(num)) {
          btn.classList.add('selected');
        }
        btn.addEventListener('click', (e) => {
          const numb = (e.target as HTMLElement).dataset.number as string;
          if (bookmarks.includes(numb)) {
            bookmarks = bookmarks.filter((b) => b !== numb);
            btn.classList.remove('selected');
          } else {
            if (bookmarks.length < 20) {
              btn.classList.add('selected');
              bookmarks.push(numb);
            } else {
              const msgOverBook =
                'Извините, но можно добавить в избранное только 20 видов игрушек';
              if (errorWindow !== null && errorMsgWrapper !== null)
                showError(errorWindow, errorMsgWrapper, msgOverBook);
            }
          }
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        });
      });

      if (filteredToys.length >= 1) {
        const filteredToysString = JSON.stringify(filteredToys);
        localStorage.setItem('filteredToys', filteredToysString);
      }
    }
    renderCards();

    function addFIlter(btn: HTMLElement, array: string[], feature: string) {
      btn.classList.toggle('chosen');
      if (array.includes(feature)) {
        const position = array.indexOf(feature);
        array.splice(position, 1);
        renderCards();
      } else {
        array.push(feature);
        renderCards();
      }
    }
    function renderOriginalCards() {
      if (toysContainer !== null) toCleanUp(toysContainer);
      originalToys.forEach((toyItem) => {
        const toyTemplate = toyItem.createToyTemplate();
        toysContainer?.append(toyTemplate);
      });
    }

    //SORT by ranges
    const countRange = document.querySelector<HTMLElement>('.count-range');
    const prodYearRange =
      document.querySelector<HTMLElement>('.prod-year-range');
    let countSLider: noUiSlider.API;
    let productionYearSlider: noUiSlider.API;
    if (countRange !== null) {
      countSLider = noUiSlider.create(countRange, {
        range: {
          min: 0,
          max: 12,
        },
        step: 1,
        start: DEFAULT_COUNT_IN_STOCK,
        connect: true,
        orientation: 'horizontal',
        behaviour: 'tap-drag',
        tooltips: true,
        format: {
          to: function (value) {
            return Math.round(value);
          },
          from: function (value) {
            return Number(value);
          },
        },
      });
      countSLider.on('end', function (e) {
        const min = +e[0];
        const max = +e[1];
        countsArray = [];
        for (let i: number = min; i <= max; i++) {
          countsArray.push(i.toString());
        }
        renderCards();
      });
    }
    if (prodYearRange !== null) {
      productionYearSlider = noUiSlider.create(prodYearRange, {
        range: {
          min: 1940,
          max: 2021,
        },
        step: 1,
        start: DEFAULT_BUY_YEAR,
        connect: true,
        orientation: 'horizontal',
        behaviour: 'tap-drag',
        tooltips: true,
        format: {
          to: function (value) {
            return value;
          },
          from: function (value) {
            return Number(value);
          },
        },
      });
      productionYearSlider.on('end', function (e) {
        const min = +e[0];
        const max = +e[1];
        yearArray = [];
        for (let i: number = min; i <= max; i++) {
          yearArray.push(i.toString());
        }
        renderCards();
      });
    }
    //search
    const searchNameInput: HTMLInputElement | null =
      document.querySelector('.search-txt');
    const searchBtn: HTMLInputElement | null =
      document.querySelector('.search-btn');
    searchNameInput?.addEventListener('click', () => {
      searchNameInput.classList.toggle('chosen');
      searchBtn?.addEventListener('click', () => {
        searchName = searchNameInput.value;
        renderCards();
      });
    });

    const sortSelect: HTMLSelectElement | null =
      document.querySelector('.menu__sort-box');
    sortSelect?.addEventListener('change', () => {
      renderCards();
    });

    sortFavsBtn?.addEventListener('click', () => {
      favorite = true;
      sortFavsBtn.classList.toggle('chosen');
      renderCards();
    });
    sortNotFavsBtn?.addEventListener('click', () => {
      favorite = false;
      sortNotFavsBtn.classList.toggle('chosen');
      renderCards();
    });

    //color
    sortColorWhite?.addEventListener('click', () => {
      addFIlter(sortColorWhite, colorTypes, 'белый');
    });
    sortColorYellow?.addEventListener('click', () => {
      addFIlter(sortColorYellow, colorTypes, 'желтый');
    });
    sortColorRed?.addEventListener('click', () => {
      addFIlter(sortColorRed, colorTypes, 'красный');
    });
    sortColorBlue?.addEventListener('click', () => {
      addFIlter(sortColorBlue, colorTypes, 'синий');
    });
    sortColorGreen?.addEventListener('click', () => {
      addFIlter(sortColorGreen, colorTypes, 'зелёный');
    });

    //shape
    shapesBtns.forEach((shape) => {
      shape.addEventListener('click', () => {
        addFIlter(shape, shapeTypes, shape.dataset.feature || '');
      });
    });

    //size
    sortSizeBig?.addEventListener('click', () => {
      addFIlter(sortSizeBig, sizeTypes, 'большой');
    });
    sortSizeMiddle?.addEventListener('click', () => {
      addFIlter(sortSizeMiddle, sizeTypes, 'средний');
    });
    sortSizeLittle?.addEventListener('click', () => {
      addFIlter(sortSizeLittle, sizeTypes, 'малый');
    });

    //btn-handlers
    const track = new SoundTrack('../assets/audio/audio.mp3');
    playAudioBtn?.addEventListener('click', () => {
      playAudioBtn.classList.toggle('pulsing');
      if (track.isPlaying()) {
        track.pauseAudio();
      } else {
        track.playAudio();
      }
    });
    snowingBtn?.addEventListener('click', () => {
      document.querySelector('.snowing')?.classList.toggle('hidden');
      snowingBtn.classList.toggle('rotating');
    });

    //reset settings
    const inputCollection = document.getElementsByTagName('input');
    const settingsCollection = document.getElementsByClassName('chosen');
    function resetFilters() {
      Array.from(inputCollection).forEach((input) => {
        if (input.type === 'checkbox') {
          input.checked = false;
        }
        if (input.type === 'radio' && input.id === 'show-all') {
          input.checked = true;
        }
      });
      Array.from(settingsCollection).forEach((chosenBtn) => {
        chosenBtn.classList.toggle('chosen');
      });
      countSLider.set(DEFAULT_COUNT_IN_STOCK);
      productionYearSlider.set(DEFAULT_BUY_YEAR);
      shapeTypes = [];

      renderOriginalCards();
    }
    resetFiltersBtn?.addEventListener('click', resetFilters);
    resetSettingsBtn?.addEventListener('click', resetFilters);
    //routing
    const goStartBtn = document.querySelector('.page__start');
    goStartBtn?.addEventListener('click', () => {
      track.pauseAudio();
      window.location.hash = '/';
    });
    const goTreeBtn = document.querySelector('.page__tree');
    goTreeBtn?.addEventListener('click', () => {
      track.pauseAudio();
      window.location.hash = '/tree';
    });
  },
};

export default OrnamentsPage;
