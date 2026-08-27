import { v4 as uuid } from "uuid";

export const generateUniqueCode = (): string => {
  return uuid().replace(/-/g, "").substring(0, 25);
};
