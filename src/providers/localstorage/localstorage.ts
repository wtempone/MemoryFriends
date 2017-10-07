import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class LocalStorage {
  public CurrentCredential: string = '_CurrentCredential';

  constructor(public storage: Storage) {
  }

  setValue(key: string, value: any) {
    return this.storage.set(key, value);
  }

  getValue(key: string) {
    return this.storage.get(key);
  }

}
