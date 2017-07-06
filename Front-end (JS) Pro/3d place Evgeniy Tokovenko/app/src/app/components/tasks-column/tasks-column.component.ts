import { Component, Input, OnInit } from '@angular/core';
import { Task, Column } from './../../models';
import { TaskService } from './../../services'

@Component({
  selector: 'app-tasks-column',
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss']
})
export class TasksColumnComponent implements OnInit {

  columnTasks: Task[];
  @Input() tasks: Task[];
  @Input() column: Column;

  constructor(
    public taskService: TaskService
  ) {}

  ngOnInit() {
    this.filterColumnTasks(this.tasks);
    this.taskService
      .updatedItems
      .subscribe((tasks) => {
        this.filterColumnTasks(tasks);
      });
  }

  filterColumnTasks(tasks) {
    this.columnTasks = tasks.filter(task => task.column.id === this.column.id);
  }

  onItemDrop(e) {
    const {dragData: task} = e;
    if (this.column === task.column) {
      return;
    }

    task.setColumn(this.column);
    this.taskService.save()
  }
}
