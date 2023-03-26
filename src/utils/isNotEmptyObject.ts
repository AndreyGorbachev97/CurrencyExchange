export const isNotEmptyObject = <T>(obj: T): boolean =>
  obj ? Object.keys(obj).length > 0 : false;
