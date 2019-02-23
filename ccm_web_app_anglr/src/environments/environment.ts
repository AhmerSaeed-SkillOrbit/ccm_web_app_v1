// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  // authBaseUrl : 'https://4f7d8b86-e198-434a-9f08-849faa7f6179.mock.pstmn.io/api/v1.1.0/',
  // apiBaseUrl : 'https://4f7d8b86-e198-434a-9f08-849faa7f6179.mock.pstmn.io/api/v1.1.0/',

  // authBaseUrl: 'http://10.11.7.230/uat.webapi/api/',
  // apiBaseUrl: 'http://10.11.7.230/uat.webapi/api/',

  // dev
  // authBaseUrl: 'http://13.229.102.246/identityserver/',
  // apiBaseUrl: 'http://13.229.102.246/dev.webapi/api/',

  // demo LC
  // http://13.229.102.246/demo.lms.webapi/
  authBaseUrl: 'http://13.229.102.246/demo.lms.identity/',
  apiBaseUrl: 'http://13.229.102.246/demo.lms.webapi/api/',

  // qa
  // authBaseUrl: 'http://13.229.102.246/identityserver_qa/',
  // apiBaseUrl: 'http://13.229.102.246/qa.webapi/api/',

  // authBaseUrl: 'http://192.168.1.130/identityserver/',
  // apiBaseUrl: 'http://192.168.1.130/dev.webapi/api/',

  // authBaseUrl : 'http://uatappdb/uat.identityserver/',
  // apiBaseUrl : 'http://uatappdb/uat.webapi/api/',

  webAppUrl: '',
  device: 'web',
  grant_type: 'password',
  client_id: 'ro.web.client',
  client_secret: 'secret',
  scope: 'API'
};

