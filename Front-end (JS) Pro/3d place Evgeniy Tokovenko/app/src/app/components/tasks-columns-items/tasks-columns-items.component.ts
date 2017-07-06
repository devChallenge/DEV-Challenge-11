import { Component, Input } from '@angular/core';
import { Task, Column } from './../../models';
@Component({
  selector: 'app-tasks-columns-items',
  templateUrl: './tasks-columns-items.component.html',
  styleUrls: ['./tasks-columns-items.component.scss']
})
export class TasksColumnsItemsComponent {
  @Input() tasks: Task[];
  @Input() columns: Column[];
}
