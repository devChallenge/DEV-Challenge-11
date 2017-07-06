import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { ColumnService } from './column.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';

import { Category, Column, User, Task } from './../models'; 

@Injectable()
export class InitService {
  storageName = 'is-run-before';

  constructor(
    public columnService: ColumnService,
    public categoryService: CategoryService,
    public taskService: TaskService,
    public userService: UserService
  ) {}

  isFirstRun() {
    return !localStorage.getItem(this.storageName);
  }

  onFirstRun() {

    const homer = User.create('Homer', '/assets/homer.png');
    const lisa = User.create('Lisa', '/assets/lisa.png');
    const bart = User.create('Bart', '/assets/bart.png');
    const maggie = User.create('Maggie', '/assets/maggie.png');
    const marge = User.create('Marge', '/assets/marge.png');
    this.userService.addItems([homer, lisa, bart, maggie, marge]);

    const toDoColumn = Column.create('To Do');
    const inProgressColumn = Column.create('In Progress');
    const doneColumn = Column.create('Done');
    this.columnService.addItems([toDoColumn, inProgressColumn, doneColumn]);

    const homeWorkCategory = Category.create('Home Work', '#4286f4');
    const restCategory = Category.create('Rest', '#309923');
    const adultStuffCategory = Category.create('Adult Stuff', '#912f5a');
    this.categoryService.addItems([homeWorkCategory, restCategory, adultStuffCategory]);

    const hommerTasks = [
      Task.create(
        'Drink Bear',
        'Drink some bear at work. Go to Moe',
        homeWorkCategory,
        homer,
        doneColumn,
        [],
        ['bear', 'yummy']
      ),
      Task.create(
        'Drink one more Bear',
        'Drink some bear at home',
        adultStuffCategory,
        homer,
        toDoColumn,
        [],
        ['Wow']
      )
    ];
    this.taskService.addItems(hommerTasks);


    const lisaTasks = [
      Task.create(
        'Nooby learning',
        'Read books, Write homework',
        homeWorkCategory,
        lisa,
        toDoColumn,
        [],
        ['study', 'smart']
      )
    ];
    this.taskService.addItems(lisaTasks);


    const bartTasks = [
      Task.create(
        'Karambaaa',
        'Skating, fart games, kick Homer balls',
        restCategory,
        bart,
        inProgressColumn,
        [],
        ['rest', 'games']
      )
    ];
    this.taskService.addItems(bartTasks);

    const margeTasks = [
      Task.create(
        'Find Hommer',
        'Try to find homer after second bear',
        adultStuffCategory,
        marge,
        toDoColumn,
        [],
        ['homer', 'as always']
      )
    ];
    this.taskService.addItems(margeTasks);

    const maggieTasks = [
      Task.create(
        'Be quiet',
        'Suck the nipple and be quiet',
        restCategory,
        maggie,
        inProgressColumn,
        [],
        ['quiet', 'suck :)']
      )
    ];
    this.taskService.addItems(maggieTasks);

    localStorage.setItem(this.storageName, 'yes');
  }

}
