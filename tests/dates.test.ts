import { isBetween, isCollide, isInRange } from "../app/utils/dates";

jest.setTimeout(10000);
describe("#dates utilities", () => {
  it("should return true", () => {
    const timestamp = 1669939200; // 2022-12-02;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isInRange(timestamp, range);

    expect(result).toEqual(true);
  });

  it("should return false", () => {
    const timestamp = 1669766400; // 2022-11-30;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isInRange(timestamp, range);

    expect(result).toEqual(false);
  });

  it("should return true if both dates are in range", () => {
    const currentRange = { from: 1669766400, to: 1669852800 }; // 2022-11-30 : 2022-12-02;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isBetween(currentRange, range);

    expect(result).toEqual(false);
  });

  it("should return true if one of the dates is in range", () => {
    const currentRange = { from: 1669766400, to: 1669852800 }; // 2022-11-30 : 2022-12-02;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isCollide(currentRange, range);

    expect(result).toEqual(true);
  });

  it("should return true if both dates collide the range", () => {
    const currentRange = { from: 1669766400, to: 1672531200 }; // 2022-11-30 : 2023-01-01;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isCollide(currentRange, range);

    expect(result).toEqual(true);
  });

  it("should return false if both dates do not collide the range", () => {
    const currentRange = { from: 1668902400, to: 1669766400 }; // 2022-11-20 : 2022-11-30 ;
    const range = {
      from: 1669852800, // 2022-12-01
      to: 1672444800, // 2022-12-31
    };
    const result = isCollide(currentRange, range);

    expect(result).toEqual(false);
  });
});
