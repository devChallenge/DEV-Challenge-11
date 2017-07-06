import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { User } from './../models';

@Injectable()
export class UserService extends DataService {
  storageName = 'users';
  updatedItems = new EventEmitter;

  itemsFactory(items) {
    this.items = items.map(item => new User(item));
  }
}
