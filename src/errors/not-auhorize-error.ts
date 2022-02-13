import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string = 'Not Authorize') {
    super(message);
  }
  serializeErrors(): { message: string }[] {
    return [{ message: this.message }];
  }
}
