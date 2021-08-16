export class Authorization {

  private _token: string;
  private _message: string;

  constructor() {
    this._token = '';
    this._message = '';
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
