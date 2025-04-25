export function isJsonParsable(jsonStr) {
  try {
    JSON.parse(jsonStr);
    return true;
  } catch {
    return false;
  }
}

export const isEvent = (value) =>
  value &&
  typeof value === "object" &&
  typeof value.stopPropagation === "function";
