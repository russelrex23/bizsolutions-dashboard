export class Account {

  private _email: string;
  private _password: string;
  private _fistName: string;
  private _lastName: string;

  constructor() {
    this._email = '';
    this._password = '';
    this._fistName = '';
    this._lastName = '';
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._fistName;
  }

  set firstName(value: string) {
    this._fistName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
}
