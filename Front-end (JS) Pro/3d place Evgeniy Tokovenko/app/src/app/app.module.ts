import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdSelectModule, MdInputModule, MdListModule, MdIconModule, MdDialogModule, MdToolbarModule } from '@angular/material';
import 'hammerjs';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { AppComponent } from './app.component';
import { CategoryService } from './services/category.service';
import { ColumnService } from './services/column.service';
import { TaskService } from './services/task.service';
import { InitService } from './services/init.service';
import { UserService } from './services/user.service';
import { TasksColumnComponent } from './components/tasks-column/tasks-column.component';
import { TasksColumnsItemsComponent } from './components/tasks-columns-items/tasks-columns-items.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksColumnComponent,
    TasksColumnsItemsComponent,
    TasksListComponent,
    TaskComponent,
    CreateTaskDialogComponent
  ],
  entryComponents: [
    CreateTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdDialogModule,
    FlexLayoutModule,
    MdToolbarModule,
    Ng2DragDropModule,
    MdInputModule,
    MdSelectModule
  ],
  bootstrap: [AppComponent],
  providers: [InitService, CategoryService, ColumnService, TaskService, UserService]
})
export class AppModule { }
