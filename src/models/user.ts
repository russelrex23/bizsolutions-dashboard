export class User {

  public _id: number;
  public _name: string;
  public _pwd:string;
  public _email:string;

  constructor() {
    this._id = 0;
    this._name = '';
    this._pwd = '';
    this._email = '';
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

}
