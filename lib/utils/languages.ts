// lib/languages.ts

export interface Language {
  name: string;
  slug: string;
  flag: string;
}

export const staticLanguages: Language[] = [
  {
    name: 'English',
    slug: 'en',
    flag: 'https://flagcdn.com/us.svg',
  },
  {
    name: 'Español',
    slug: 'es',
    flag: 'https://flagcdn.com/es.svg',
  },
  {
    name: 'Italiano',
    slug: 'it',
    flag: 'https://flagcdn.com/it.svg',
  },
  {
    name: 'Français',
    slug: 'fr',
    flag: 'https://flagcdn.com/fr.svg',
  },
  {
    name: 'Português',
    slug: 'pt',
    flag: 'https://flagcdn.com/br.svg',
  },
];
