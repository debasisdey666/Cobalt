import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageWrapperService {

  constructor() { }


  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret-key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  encryptAllKeysAndValues(data: { [key: string]: any }): void {
    Object.keys(data).forEach(key => {
      const encryptedKey = this.encrypt(key);
      const encryptedValue = this.encrypt(data[key]);
      localStorage.setItem(encryptedKey, encryptedValue);
    });
  }

  decryptAllKeysAndValues(): { [key: string]: any } {
    const decryptedData: { [key: string]: any } = {};
    Object.keys(localStorage).forEach(encryptedKey => {
      const key = this.decrypt(encryptedKey);
      const encryptedValue = localStorage.getItem(encryptedKey);
      // const value = this.decrypt(encryptedValue);
      // decryptedData[key] = value;
    });
    return decryptedData;
  }


}
