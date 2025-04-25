export function accessByName(rootObj, name) {
  if (!rootObj) {
    return { current: {}, key: "" };
  }

  const path = name.split(".");
  let current = rootObj;
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      return { current, key };
    } else {
      current = current[key];
    }
  });
}

export function setValueByName(rootObj, name, value) {
  const { current, key } = accessByName(rootObj, name);
  current[key] = value;
}

export function getValueByName(rootObj, name) {
  const { current, key } = accessByName(rootObj, name);
  return current[key];
}
