import { useState } from "react";
import { useUpdateEffect } from "../../hooks.js";
import { isEvent } from "../../utils.js";
import { getValueByName, setValueByName } from "./accessors.js";
import { VALIDATE_MODES } from "./config.js";
import validate from "./validator.js";

const { ON_BLUR, ON_CHANGE, ON_SUBMIT } = VALIDATE_MODES;

function getDefaultValues(fields, defaultValues) {
  const values = {};
  fields.forEach(({ name }) => {
    const value = getValueByName(defaultValues, name) || "";
    setValueByName(values, name, value);
  });
  return values;
}

export default function useForm(
  fields,
  {
    validateMode = ON_BLUR,
    reValidateMode = ON_CHANGE,
    defaultValues = null,
  } = {},
) {
  const [values, setValues] = useState(getDefaultValues(defaultValues));
  const [errors, setErrors] = useState({});

  useUpdateEffect(() => {
    setValues(getDefaultValues(fields, defaultValues));
    setErrors({});
  }, [fields]);

  const runValidate = (value, name, error, mode) => {
    const shouldRunValidate =
      mode === validateMode || (error?.hadError && reValidateMode === mode);
    if (!shouldRunValidate) return true;

    const field = fields.find((field) => field.name === name);
    const errorMessage = validate(value, field.constrains);
    if (errorMessage) {
      error.message = errorMessage;
      error.hadError = true;
      setErrors((prev) => ({ ...prev, ...errors }));
      return false;
    }
  };

  const handleChange = (eventOrValue, name) => {
    const value = isEvent(eventOrValue)
      ? eventOrValue.target.value
      : eventOrValue;
    const error = getValueByName(errors, name);
    runValidate(value, name, error, ON_CHANGE);
    setValueByName(values, name, value);
    setValues((prev) => ({ ...prev, ...values }));
  };

  const handleBlur = (event, name) => {
    const value = getValueByName(values, name);
    const error = getValueByName(errors, name);
    runValidate(value, name, error, ON_BLUR);
  };

  const getFieldProps = (name) => {
    const error = getValueByName(errors, name);
    return {
      value: getValueByName(values, name),
      onChange: (eventOrValue) => handleChange(eventOrValue, name),
      onBlur: (event) => handleBlur(event, name),
      error: error.message,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const resetValues = (keepValues) => {
    setValues(keepValues);
    setErrors({});
  };

  return { getFieldProps, handleSubmit, resetValues };
}
