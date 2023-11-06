export default class ApiError extends Error {
  name = 'API_ERROR';

  constructor(code) {
    super();
    this.code = code;
  }
}
