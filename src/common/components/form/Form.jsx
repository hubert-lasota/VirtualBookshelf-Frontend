/*
 * fields = { name, label, constraints = {required: str | bool, validate: (value) => str | bool}, component, props}
 * */
import { useState } from "react";

function getDefaultFormData(fields) {}

export default function Form({
  fields,
  onSubmit = () => {},
  headerProps = null,
  submitButtonProps = null,
}) {
  const [formData, setFormData] = useState({});
}
