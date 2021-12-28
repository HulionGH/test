'use strict';
import OrnamentsPage from './components/ornaments/ornaments-load';
import TreePage from './components/tree/tree';
import { IRenderPage } from './domains';
import Utils from './utils';
import '../styles/global.css';
import '../styles/animations.css';
import '../styles/flex.css';
import '../styles/normalize.css';
import StartPage from './components/start/start';

const routes: Record<string, IRenderPage> = {
  '/': StartPage,
  '/ornaments': OrnamentsPage,
  '/tree': TreePage,
};

export const router = async () => {
  const request = Utils.parseRequestURL();
  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');
  const component = routes[parsedURL];
  await component.render();
  await component.afterRender();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
