type DateTimestampRange = {
  from: number;
  to: number;
};
export function getTimestampFromString(date: string) {
  const datum = Date.parse(date);
  return datum / 1000;
}

export function isInRange(timestamp: number, range: DateTimestampRange) {
  return timestamp >= range.from && timestamp <= range.to;
}

export function isBetween(
  currentRange: DateTimestampRange,
  targetRange: DateTimestampRange
) {
  return (
    isInRange(currentRange.from, targetRange) &&
    isInRange(currentRange.to, targetRange)
  );
}

export function isCollide(
  currentRange: DateTimestampRange,
  targetRange: DateTimestampRange
) {
  return (
    isInRange(currentRange.from, targetRange) ||
    isInRange(currentRange.to, targetRange) ||
    (currentRange.from < targetRange.from && currentRange.to > targetRange.to)
  );
}
