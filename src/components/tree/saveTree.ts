export class SaveTree {
  area: HTMLElement;

  constructor(div: HTMLElement) {
    this.area = div;
  }

  initSaving(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let wrapper: HTMLElement | null = null;
    wrapper = document.querySelector('.saved-container');
    console.log(wrapper);
    let sample: HTMLTemplateElement | null = null;
    sample = document.querySelector('template.saved-tree');
    let clone: HTMLElement | null = null;
    clone = sample?.content.cloneNode(true) as HTMLElement;

    //settings
    const savedBG = this.area?.style.backgroundImage;
    const savedTree = this.area?.querySelector('.decorate-tree') as HTMLElement;
    (<HTMLElement>clone.querySelector('.chosen-bg')).style.backgroundImage =
      savedBG;
    (<HTMLElement>clone.querySelector('.chosen-tree')).style.backgroundImage =
      savedTree.style.backgroundImage;
    if (savedTree) wrapper?.append(clone);
    return fragment;
  }
}
