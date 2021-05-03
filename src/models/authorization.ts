export class Authorization {

  private _token: string;

  constructor() {
    this._token = '';
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
