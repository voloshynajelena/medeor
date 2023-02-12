export const API_URL = 'https://api-medeor-one.vercel.app';
export const WIKI_URL = 'https://medeor.atlassian.net/wiki/spaces/MEDEOR/';
export const FF_AVATAR = false;

export const API_ENDPOINTS = {
  main: '/',
  user: '/user',
  login: '/login',
  client: '/client',
  clients: '/clients',
  tests: '/tests',
  testTemplates: '/testTemplates',
  testGroups: '/testsGroups',
  testGroupTemplates: '/testGroupTemplates',
  getClients: '/getClients',
  getClient: '/getClient',
};

export enum AllTagsEnum {
  diabetic = 'Diabetic',
  allergic = 'Allergic',
  multPregnancy = 'Multiple pregnancy',
  secondPregnancy = 'Second pregnancy',
  tenWeeksPregnancy = '10 weeks pregnancy',
  vegetarian = 'Vegetarian',
  covid = 'Covid',
  exCovid = 'ex Covid',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const dateFormat = 'd MMM, y';
