// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  showLog: true,

  // dev
  // authBaseUrl: 'https://api.businessdirectory360.com/api/',
  // apiBaseUrl: 'https://api.businessdirectory360.com/api/',

  // LC
  authBaseUrl: 'http://127.0.0.1:8000/api/',
  apiBaseUrl: 'http://127.0.0.1:8000/api/',

  webAppUrl: '',
  device: 'web',
  grant_type: 'password',
  client_id: 'ro.web.client',
  client_secret: 'secret',
  scope: 'API'
};

