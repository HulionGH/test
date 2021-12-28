export interface IToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
export interface ICallback<T> {
  (data: T): void;
}

export interface IRenderPage {
  render: () => Promise<void>;
  afterRender: () => Promise<void>;
}
