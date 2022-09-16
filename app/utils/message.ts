import { ResponseVO } from "../model/vo/responseVo";

enum StatusCode {
  success = 200,
}

class Result {
  private statusCode: number;
  private _code?: number;
  private message?: string;
  private data?: any;

  constructor(
    statusCode: number,
    data?: any,
    _code?: number,
    message?: string
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this._code = _code;
    this.message = message;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    let body = { ...this.data, _code: this._code, message: this.message };
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(body),
    };
  }
}

export class MessageUtil {
  static success(data: object): ResponseVO {
    const result = new Result(StatusCode.success, data);

    return result.bodyToString();
  }

  static error(code: number = 1000, message: string) {
    const result = new Result(StatusCode.success, null, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
}
