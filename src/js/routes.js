import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import ProfilePage from '../pages/profile.vue';
import NewGamePage from '../pages/new-game.vue';
import GamePage from '../pages/game.vue';

import NotFoundPage from '../pages/404.vue';


var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/profile/',
    component: ProfilePage,
  },
  {
    path: '/new-game/',
    component: NewGamePage,
  },
  {
    path: '/game/:id',
    component: GamePage,
  },

  // Default error handler
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
