import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { Category } from './../models';

@Injectable()
export class CategoryService extends DataService {
  storageName = 'categories';
  updatedItems = new EventEmitter;

  itemsFactory(items) {
    this.items = items.map(item => new Category(item));
  }
}
