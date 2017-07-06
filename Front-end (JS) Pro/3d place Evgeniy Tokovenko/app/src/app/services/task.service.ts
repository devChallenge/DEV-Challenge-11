import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { Task, User, Column, Category } from './../models';

@Injectable()
export class TaskService extends DataService {
  storageName = 'tasks';
  updatedItems = new EventEmitter;

  itemsFactory(items) {
    this.items = items.map((item) => {
     return new Task(
       item.id,
       item.title,
       item.description,
       item.category,
       item.user,
       item.column,
       item.history,
       item.tags,
       item.position
     );
    });
  }
}
