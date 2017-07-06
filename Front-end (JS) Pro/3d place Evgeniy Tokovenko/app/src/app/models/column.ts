export class Column {
  id: number;
  title: string;
  position: number;

  static create(title, position = null) {
    return new Column({
      id: +new Date() + Math.random(),
      title,
      position
    });
  }

  constructor({id, title, position}) {
    this.id = id;
    this.title = title;
    this.position = position || 0;
  }

}

