export class User {
  id: number;
  name: string;
  photo: string;
  isVisible = true;

  static create(name, photo = null) {
    return new User({
      id: +new Date() + Math.random(),
      name,
      photo
    });
  }

  constructor({id, name, photo}) {
    this.id = id;
    this.name = name;
    this.photo = photo;
  }
}
