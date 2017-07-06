import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { Column } from './../models';

@Injectable()
export class ColumnService extends DataService {
  storageName = 'columns';
  updatedItems = new EventEmitter;

  itemsFactory(items) {
    this.items = items.map(item => new Column(item));
  }
}
