import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UserService, CategoryService, ColumnService, TaskService } from './../../services';
import { User, Category, Task } from './../../models';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  taskName: string;
  taskDescription: string;
  taskUser: User;
  taskCategory: Category;
  taskTags = '';
  users = [];
  categories = [];
  columns = [];

  constructor(
    public dialogRef: MdDialogRef<CreateTaskDialogComponent>,
    public userService: UserService,
    public categoryService: CategoryService,
    public columnService: ColumnService,
    public taskService: TaskService
  ) { }

  ngOnInit(
  ) {
    this.users = this.userService.getItems();
    this.categories = this.categoryService.getItems();
    this.columns = this.columnService.getItems();
  }

  onSave() {
    const task = Task.create(
      this.taskName,
      this.taskDescription,
      this.taskCategory,
      this.taskUser,
      this.columns[0],
      [{
        date: new Date,
        column: this.columns[0].title
      }],
      this.taskTags.split(',')
    );
    this.taskService.addItem(task);
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

}
