import axios from "axios";

const LOOKUP_API_URL = "http://ip-api.com/json/";
const FIELDS = "country,countryCode,lat,lon,currency";

export interface ILookupResponse {
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  currency: string;
}
export class LookupService {
  /**
   * Get IP information
   * @param ip
   */
  public async getInfo(ip: string): Promise<any> {
    return axios.get<ILookupResponse>(
      `${LOOKUP_API_URL}${ip}?fields=${FIELDS}`
    );
  }
}
