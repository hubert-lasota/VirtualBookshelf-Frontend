import loginMessages from "./loginMessages.js";
import searchModalMessages from "./searchModalMessages.js";
import homeMessages from "./homeMessages.js";

export default {
  App: {
    name: {
      "pl-PL": "Wirtualny Regał",
      "en-US": "Virtual Bookshelf",
    },
  },

  LoadingPage: {
    "pl-PL": "Ładowanie...",
    "en-US": "Loading...",
  },

  Label: {
    optional: {
      "pl-PL": " (Opcjonalnie)",
      "en-US": " (Optional)",
    },
  },

  ...loginMessages,
  ...homeMessages,
  ...searchModalMessages,
};
