import { Response } from 'express';

export class CustomResponse {
  // Note that data here is marked as `any`, because we can't predict it
  static send(res: Response, data: any, message = 'done', status: number = 200) {
    res.status(status).json({ data, message, status });
  }

  static sendWithoutData(res: Response, message = 'done', status = 200) {
    res.status(status).json({ status, message });
  }

  static sendWithError(res: Response, message: string, status = 400) {
    res.status(status).json({ status, message });
  }
}
