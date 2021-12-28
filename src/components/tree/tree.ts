import SoundTrack from '../../audio';
import { content, header } from '../../constants';
import { Decoration } from './decoration';
import { IRenderPage } from '../../domains';
import './tree.css';
import html from './tree.html';
import { allowDrop, drop, lightsOn } from './tree.helper';
import { SaveTree } from './saveTree';

const TreePage: IRenderPage = {
  render: async () => {
    if (content !== null) {
      content.innerHTML = html;
    }
    if (header !== null) {
      header.innerHTML = `<h2 class="page-title page__start">Главная</h2>
      <h1 class="page-title page__ornaments">Игрушки</h1>
      <h2 class="page-title page__tree active-title">Ёлочка</h2>`;
    }
  },

  afterRender: async () => {
    //snow and music
    const playAudioBtn: HTMLElement | null =
      document.querySelector('.btn-volume') || null;
    const snowingBtn: HTMLElement | null =
      document.querySelector('.btn-snow') || null;
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
    //INIT DECORATIONS
    const decor = new Decoration();
    decor.initTrees();
    decor.initBackdrops();
    decor.initToysToDecor();
    const backdrops = document.querySelectorAll('.backdrop-item');
    Array.from(backdrops as NodeListOf<HTMLElement>).forEach((btn) => {
      btn.addEventListener('click', () => {
        decor.setBackdrop(btn.style.backgroundImage);
      });
    });
    const trees = document.querySelectorAll('.tree-item');
    Array.from(trees as NodeListOf<HTMLElement>).forEach((btn) => {
      btn.addEventListener('click', () => {
        decor.setTree(btn.style.backgroundImage);
      });
    });
    //Drag-n-drop
    const christmasArea: HTMLElement | null =
      document.querySelector('.decorate-area') || null;
    const christmasTree: HTMLElement | null =
      document.querySelector('.decorate-tree') || null;
    christmasTree?.addEventListener('dragover', (event) => {
      allowDrop(event as DragEvent);
    });
    christmasTree?.addEventListener('drop', (event) => {
      drop(event as DragEvent);
    });
    //SAVE TREE

    document.querySelector('.save-tree')?.addEventListener('click', () => {
      document.querySelector('.instructions')?.classList.add('hidden');
      if (christmasArea !== null) {
        const saving = new SaveTree(christmasArea);
        saving.initSaving();
      }
    });
    document.querySelector('.reset-tree')?.addEventListener('click', () => {
      window.location.reload();
    });

    //GARLAND
    const garlandTypes = document.querySelectorAll('.garland-item');
    document.querySelector('.twinkle-green')?.addEventListener('click', () => {
      lightsOn('lightning');
    });
    document.querySelector('.pulsing-yellow')?.addEventListener('click', () => {
      lightsOn('pulsing');
    });
    document
      .querySelector('.garland-item.flashing')
      ?.addEventListener('click', () => {
        lightsOn('flashing');
      });

    //NAVIGATION

    const goStartBtn = document.querySelector('.page__start');
    goStartBtn?.addEventListener('click', () => {
      track.pauseAudio();
      window.location.hash = '/';
    });
    const goToysBtn = document.querySelector('.page__ornaments');
    goToysBtn?.addEventListener('click', () => {
      track.pauseAudio();
      window.location.hash = '/ornaments'; //поправить route
    });
  },
};

export default TreePage;
