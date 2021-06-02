export class Account {

  private _email: string;
  private _password: string;
  private _contact: number;
  private _address: string;

  constructor() {
    this._email = '';
    this._password = '';
    this._contact = 0;
    this._address = '';
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

  get contact(): number {
    return this._contact;
  }

  set contact(value: number) {
    this._contact = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
