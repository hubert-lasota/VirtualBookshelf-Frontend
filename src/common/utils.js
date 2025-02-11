export function objectToParamsString(paramsObj) {
  if (!(typeof paramsObj === "object") && !Array.isArray(paramsObj))
    throw new Error(
      "Params needs to be object with properties. It cannot be array either.",
    );

  const props = Object.entries(paramsObj);
  if (props.length === 0)
    throw new Error("Params needs to have at least one property.");

  let paramsString = "?";
  for (let j = 0; j < props.length; j++) {
    const key = props[j][0];
    const value = props[j][1];
    paramsString += key + "=" + value;
    if (j < props.length - 1) {
      paramsString += "&";
    }
  }

  return paramsString;
}
