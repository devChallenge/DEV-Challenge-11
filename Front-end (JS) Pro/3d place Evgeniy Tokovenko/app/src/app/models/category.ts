export class Category {
  id: number;
  title: string;
  color: string;

  static create(title, color = '#fff') {
    return new Category({
      id: +new Date() + Math.random(),
      title,
      color
    });
  }

  constructor({id, title, color}) {
    this.id = id;
    this.title = title;
    this.color = color || '#000';
  }
}
