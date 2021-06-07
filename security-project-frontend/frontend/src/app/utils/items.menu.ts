import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
];

export const PROFILE_ITEMS: NbMenuItem[] = [
  {
    title: 'Cerrar sesión',
    icon: 'log-out-outline',
    link: '/logout',
  },
];
