import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string = 'Not Found') {
    super(message);
  }
  serializeErrors(): { message: string }[] {
    return [{ message: this.message }];
  }
}
