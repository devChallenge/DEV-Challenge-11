import { Category } from './category';
import { User } from './user';
import { Column } from './column';

export class Task {
  isVisible = true;
  static create(
      title,
      description,
      category,
      user,
      column,
      history,
      tags,
      position = 0
  ) {
    return new Task(
      +new Date() + Math.random(),
      title,
      description,
      category,
      user,
      column,
      history,
      tags,
      position
    );
  }

  constructor(
    public id,
    public title,
    public description,
    public category,
    public user,
    public column,
    public history,
    public tags,
    public position = 0
  ) {
  }

  setColumn(column: Column) {
    this.column = column;
  }
}
