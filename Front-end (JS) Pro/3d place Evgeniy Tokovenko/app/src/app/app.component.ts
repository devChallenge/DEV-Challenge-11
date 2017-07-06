import { Component, OnInit } from '@angular/core';
import { CategoryService, ColumnService, TaskService, InitService, UserService } from './services';
import { Category, Column, User, Task } from './models';
import { MdDialog } from '@angular/material';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  searchText: string;
  filterUser: User;
  filterCategory: Category;

  users = [];
  categories = [];
  columns = [];
  tasks = [];
  constructor(
    private columnService: ColumnService,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private userService: UserService,
    private initService: InitService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {

    if (this.initService.isFirstRun()) {
      this.initService.onFirstRun();
    }

    this.loadData();
    this.taskService
      .updatedItems
      .subscribe((tasks) => {
        this.loadData();
      });
  }

  loadData() {
    this.users = this.userService.getItems();
    this.columns = this.columnService.getItems();
    this.categories = this.categoryService.getItems();
    this.tasks = this.taskService.getItems();
    this.searchText = '';
    this.filterUser = null;
  }


  onAddNewTask() {
    this.dialog.open(CreateTaskDialogComponent);
  }

  onSerchText($event) {
    const text = $event.target.value;
    const pattern = new RegExp(`${text}`, 'i');
    this.tasks.forEach(task => {
      task.isVisible = !text || (task.title && task.title.match(pattern));
    });
  }

  onSerchFamily($event) {
    const user = $event.value;
    this.tasks.forEach(task => {
      task.isVisible = !user || (task.user && task.user.id === user.id);
    });
  }

  onSerchCategory($event) {
    const category = $event.value;
    this.tasks.forEach(task => {
      task.isVisible = !category || (task.category && task.category.id === category.id);
    });
  }

}
