import { IToy } from './domains';

export class Toy {
  toy: IToy;

  constructor(obj: IToy) {
    this.toy = obj;
  }

  createToyTemplate(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let toyTemplate: HTMLTemplateElement | null = null;
    toyTemplate = document.querySelector('template.toys__item');

    let toyClone: HTMLTemplateElement | null = null;
    toyClone = toyTemplate?.content.cloneNode(true) as HTMLTemplateElement;
    if (toyClone !== null) {
      const toyName = toyClone.querySelector('.toys__item-name');
      if (toyName !== null) toyName.textContent = this.toy.name;

      (<HTMLElement>(
        toyClone.querySelector('.toys__item-image')
      )).style.backgroundImage = `url('../../assets/toys/${this.toy.num}.png')`;

      const toyCount = toyClone.querySelector('.item-count');
      if (toyCount !== null)
        toyCount.textContent = `Количество: ${this.toy.count}`;

      const toyYear = toyClone.querySelector('.item-year-purchased');
      if (toyYear !== null)
        toyYear.textContent = `Год покупки: ${this.toy.year}`;

      const toyShape = toyClone.querySelector('.item-shape');
      if (toyShape !== null) toyShape.textContent = `Форма: ${this.toy.shape}`;

      const toyColor = toyClone.querySelector('.item-color');
      if (toyColor !== null) toyColor.textContent = `Цвет: ${this.toy.color}`;

      const toySize = toyClone.querySelector('.item-size');
      if (toySize !== null) toySize.textContent = `Размер: ${this.toy.size}`;

      const toyFavSign = toyClone.querySelector('.item-favorite-sign');
      if (toyFavSign !== null)
        toyFavSign.textContent = `Любимая: ${this.toy.favorite ? 'да' : 'нет'}`;

      const bookmark = toyClone.querySelector<HTMLElement>('.bookmark');
      if (bookmark !== null) bookmark.dataset.number = this.toy.num;
    }
    fragment.append(toyClone);
    return fragment;
  }
}
