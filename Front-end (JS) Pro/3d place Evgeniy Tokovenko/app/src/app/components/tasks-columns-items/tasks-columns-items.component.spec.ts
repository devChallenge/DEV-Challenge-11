import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnsItemsComponent } from './tasks-columns-items.component';

describe('TasksColumnsItemsComponent', () => {
  let component: TasksColumnsItemsComponent;
  let fixture: ComponentFixture<TasksColumnsItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksColumnsItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksColumnsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
