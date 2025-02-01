import { useState } from "react";
import messages from "./messages.js";
import { useUserPreferencesContext } from "../../contexts/UserPreferencesContext.js";

export default function useMessageResolver(baseKey = "") {
  const [initialKey] = useState(() => {
    let val = baseKey;
    if (baseKey) {
      const lastChar = baseKey.charAt(baseKey.length - 1);
      if (lastChar !== ":") {
        val = baseKey + ":";
      }
    }
    return val;
  });
  const { languageTag } = useUserPreferencesContext();

  return function (key) {
    const fullKey = initialKey ? `${initialKey}${key}` : key;
    const keys = fullKey.split(":");
    let messageObj = messages;
    for (let k of keys) {
      if (messageObj[k]) {
        messageObj = messageObj[k];
      } else {
        throw new Error(
          `Could not find a message. baseKey='${baseKey}' key='${key}' error on key='${k}'`,
        );
      }
    }
    return messageObj[languageTag] || messageObj["en-US"];
  };
}
