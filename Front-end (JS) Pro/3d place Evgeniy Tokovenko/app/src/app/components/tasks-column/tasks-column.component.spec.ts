import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnComponent } from './tasks-column.component';

describe('TasksColumnComponent', () => {
  let component: TasksColumnComponent;
  let fixture: ComponentFixture<TasksColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
