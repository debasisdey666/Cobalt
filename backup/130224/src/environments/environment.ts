// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { getFromLocalStorage } from './local-storage-util';

// export const environment = {
//   production: false,
//   baseUrl: 'http://89.117.62.190/COBALT/',
//   userId : localStorage.getItem('userId'),
//   studentId : localStorage.getItem('studenId'),
//   userName : localStorage.getItem('userName'),
//   ROLE_ID : localStorage.getItem('ROLE_ID'),
// };

export const environment = {
  production: false,
  // baseUrl: 'http://89.117.62.190/COBALT/',
  baseUrl: 'http://89.117.62.190/COBALT_DEV/',
  userId: getFromLocalStorage('userId'),
  studentId: getFromLocalStorage('studenId'),
  userName: getFromLocalStorage('userName'),
  ROLE_ID: getFromLocalStorage('ROLE_ID'),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
