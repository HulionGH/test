import data from '../../data';
import { drag } from './tree.helper';

export class Decoration {
  dir: string;

  constructor() {
    this.dir =
      'url(https://github.com/HulionGH/christmas-task-helper/blob/master/assets/';
  }

  initBackdrops(): DocumentFragment {
    const initialTBg = <HTMLElement>document.querySelector('.decorate-area');
    initialTBg.style.backgroundImage = this.dir + 'bg/6.jpg?raw=true)';

    const fragment = document.createDocumentFragment();
    let backdropArray: HTMLTemplateElement[] | null = null;
    backdropArray = Array.from(document.querySelectorAll('.backdrop-item'));
    backdropArray.forEach((item, i) => {
      const numberOfBg = i + 1;
      const srcInitialBg = this.dir + 'bg/' + numberOfBg + '.jpg?raw=true)';
      item.style.backgroundImage = srcInitialBg;
    });
    return fragment;
  }

  initTrees(): DocumentFragment {
    const initialTree = <HTMLElement>document.querySelector('.decorate-tree');
    initialTree.style.backgroundImage = this.dir + 'tree/1.png?raw=true)';

    const fragment = document.createDocumentFragment();
    let treesArray: HTMLTemplateElement[] | null = null;
    treesArray = Array.from(document.querySelectorAll('.tree-item'));
    treesArray.forEach((tree, i) => {
      const numberOfTree = i + 1;
      const srcInitialBg = this.dir + 'tree/' + numberOfTree + '.png?raw=true)';
      tree.style.backgroundImage = srcInitialBg;
    });
    return fragment;
  }

  initToysToDecor(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let toysContainer: HTMLTemplateElement | null = null;
    toysContainer = document.querySelector('.toys-container');

    let toyTemplate: HTMLTemplateElement | null = null;
    toyTemplate = document.querySelector('template.temp-toy');
    let clone: HTMLTemplateElement | null = null;

    let toyQuantity;
    let toyNumber;
    let countWrap: HTMLElement | null = null;

    let selectedToys = localStorage.getItem('bookmarks');
    if (selectedToys !== null) selectedToys = JSON.parse(selectedToys);

    if (toysContainer !== null) {
      for (let i = 0; i < 20; i++) {
        clone = toyTemplate?.content.cloneNode(true) as HTMLTemplateElement;

        if (selectedToys !== null) {
          toyNumber = selectedToys[i];
        }
        if (toyNumber || selectedToys == null) {
          const imgId = toyNumber ? toyNumber : i + 1;

          toyQuantity =
            data.find((obj) => {
              return obj.num == imgId.toString();
            })?.count || '';

          const toyClone = <HTMLElement>clone.querySelector('.selected-toy');
          countWrap = <HTMLElement>clone.querySelector('.selected-toy-count');
          countWrap.innerHTML = toyQuantity;

          toyClone.style.backgroundImage =
            this.dir + 'toys/' + imgId + '.png?raw=true)';
          //выше все ок
          toyClone?.addEventListener('dragstart', (event) => {
            const wrapItem = (event.target as HTMLElement).parentElement;
            const curCount = wrapItem?.querySelector('.selected-toy-count');
            if (curCount) {
              if (+curCount.innerHTML >= 1) {
                drag(toyClone, event, imgId.toString());
                curCount.innerHTML = (+curCount.innerHTML - 1).toString();
              }
            }
          });
        }
        toysContainer.append(clone);
      }
    }
    return fragment;
  }
  //TODO fix change count

  setBackdrop(url: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let decorationArea: HTMLTemplateElement | null = null;
    decorationArea = document.querySelector('.decorate-area');
    if (decorationArea !== null) decorationArea.style.backgroundImage = url;
    return fragment;
  }

  setTree(url: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let treeArea: HTMLTemplateElement | null = null;
    treeArea = document.querySelector('.decorate-tree');
    if (treeArea !== null) treeArea.style.backgroundImage = url;
    return fragment;
  }
}
