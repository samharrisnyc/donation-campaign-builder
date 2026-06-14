import type { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'field',
    name: 'Field Notes',
    accent: '#3f6b4f',
    background: '#f6f1e7',
    surface: '#fffaf0',
    text: '#25231f',
    contrastStatus: 'Pass',
    contrastNote: 'Deep green on warm ivory clears the mock contrast check.',
  },
  {
    id: 'coral',
    name: 'Coral Relief',
    accent: '#ba4e3f',
    background: '#fff6f1',
    surface: '#fffdf9',
    text: '#2d211f',
    contrastStatus: 'Pass',
    contrastNote: 'Burnt coral is reserved for large buttons and strong labels.',
  },
  {
    id: 'ink',
    name: 'Ink & Gold',
    accent: '#a8792d',
    background: '#f4f4ee',
    surface: '#ffffff',
    text: '#171717',
    contrastStatus: 'Review',
    contrastNote: 'Gold accents should be checked before using on small text.',
  },
];

export const getTheme = (id: Theme['id']) => themes.find((theme) => theme.id === id) ?? themes[0];
