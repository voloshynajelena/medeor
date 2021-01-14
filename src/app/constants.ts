export const API_URL = 'https://api-medeor.herokuapp.com';

export const API_ENDPOINTS = {
    main: '/',
    user: '/user',
    login: '/login',
    client: '/client',
    clients: '/clients',
    tests: '/tests',
    testsTemplates: '/testsTemplates',
    testsGroups: '/testsGroups',
    testsGroupsTemplates: '/testsGroupsTemplates',
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
