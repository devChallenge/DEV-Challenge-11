import { Component, Input } from '@angular/core';
import { Task } from './../../models';
import {TaskService} from './../../services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task;

  constructor(
    public taskService: TaskService
  ) {}

  onRemove(task) {
    this.taskService.removeItem(task);
  }
}
