import { content, header } from '../../constants';
import { IRenderPage } from '../../domains';
import './start.css';
import html from './start.html';

const StartPage: IRenderPage = {
  render: async () => {
    if (content !== null) {
      content.innerHTML = html;
    }
    if (header !== null) {
      header.innerHTML = `<h2 class="page-title page__start  active-title">Главная</h2>
      <h1 class="page-title page__ornaments">Игрушки</h1>
      <h2 class="page-title page__tree">Ёлочка</h2>`;
    }
  },

  afterRender: async () => {
    const startBtn: HTMLElement | null =
      document.querySelector('.start-button') || null;
    //routing
    startBtn?.addEventListener('click', () => {
      window.location.hash = '/ornaments';
    });
  },
};

export default StartPage;
