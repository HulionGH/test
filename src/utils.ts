interface IRequest {
  resource: string | null;
  id: string | null;
  verb: string | null;
}

const Utils = {
  parseRequestURL: () => {
    const url: string = location.hash.slice(1).toLowerCase() || '/';
    const r: string[] = url.split('/');
    const request: IRequest = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];
    return request;
  },

  //  Simple sleep implementation
  sleep: (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  getRandomNum: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  shuffle: (array: []) => {
    return array.sort(() => Math.random() - 0.5);
  },
  toCleanUp: (container: HTMLElement) => {
    while (container?.lastElementChild) {
      container.removeChild(container?.lastElementChild);
    }
  },
};

export default Utils;
