export interface IVehicle {
  id?: string;
  brand: string;
  model: string;
  year: string;
}
export type VehicleFilters = {
  excluded: string[];
};
export class VehicleService {
  private vehicles: IVehicle[];

  constructor(vehicles: IVehicle[]) {
    this.vehicles = vehicles;
  }

  /**
   * Get available vehicles
   */
  protected async getAll(filters?: VehicleFilters): Promise<object> {
    if (filters) {
      const { excluded } = filters;
      if (excluded) {
        return this.vehicles.filter(
          (vehicle) => !excluded.includes(vehicle.id)
        );
      }
    }
    return this.vehicles;
  }
}
