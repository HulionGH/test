import { Toy } from '../../createToy';

interface ICallback {
  (a: Toy, b: Toy): number;
}

export function compareByType(type: string): ICallback | undefined {
  const fieldToSort: keyof Toy['toy'] = type.split('-')[0] as keyof Toy['toy'];

  return (a, b) => {
    if (type === 'year-ascending') {
      return +a.toy[fieldToSort] - +b.toy[fieldToSort];
    }
    if (type === 'year-descending') {
      return +b.toy[fieldToSort] - +a.toy[fieldToSort];
    }
    if (type === 'name-ascending') {
      return ('' + a.toy[fieldToSort]).localeCompare('' + b.toy[fieldToSort]);
    }
    return 0;
  };
}

export function toCleanUp(container: HTMLElement) {
  while (container?.lastElementChild) {
    container.removeChild(container?.lastElementChild);
  }
}

export function showError(box: HTMLElement, input: HTMLElement, msg: string) {
  box?.classList.remove('hidden');
  if (input !== null) {
    toCleanUp(input);
    input.innerText = msg;
  }
}
