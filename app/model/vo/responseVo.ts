export class ResponseBodyVO {
  code: number;
  message: string;
  data?: object;
}

export class ResponseVO {
  statusCode: number;
  body: string;
}

export interface ICurrency {
  iso: string;
  symbol: string;
  conversion_rate: number;
}

export class ResponseTraceVO {
  ip: string;
  name: string;
  code: string;
  lat: string;
  lon: string;
  currencies: ICurrency[];
  distance_to_usa: number;
}
