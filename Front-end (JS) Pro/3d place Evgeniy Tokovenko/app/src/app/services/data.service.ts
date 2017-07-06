import { EventEmitter } from '@angular/core';

export abstract class DataService {
  items = [];
  abstract storageName: string;
  abstract updatedItems: EventEmitter<any>;

  abstract itemsFactory(items): void;

  getItems() {
    if (!this.items.length) { // :)
      const storageItems = localStorage.getItem(this.storageName);
      const items = JSON.parse(storageItems) || [];
      this.itemsFactory(items);
    }

    return this.items;
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.save();
  }

  addItem(item) {
    this.items.push(item);
    this.save();
  }

  addItems(items) {
    items.forEach(item => this.items.push(item));
    this.save();
  }

  save() {
    const storageData = JSON.stringify(this.items);
    localStorage.setItem(this.storageName, storageData);
    this.updatedItems.emit(this.items);
  }
}

