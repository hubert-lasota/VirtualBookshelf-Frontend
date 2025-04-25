export default {
  SearchButton: {
    "pl-PL": "Szukaj...",
    "en-US": "Search...",
  },
  SearchModal: {
    input: {
      placeholder: (languageTag, searchBy) => {
        switch (searchBy) {
          case "title":
            switch (languageTag) {
              case "pl-PL":
                return "Szukaj po tytule...";
              case "en-US":
                return "Search by title...";
              default:
                console.warn(`Unresolved languageTag = '${languageTag}'`);
                return "Search by title...";
            }
          case "author":
            switch (languageTag) {
              case "pl-PL":
                return "Szukaj po autorze...";
              case "en-US":
                return "Search by author...";
              default:
                console.warn(`Unresolved languageTag = '${languageTag}'`);
                return "Search by author...";
            }
          case "all":
            switch (languageTag) {
              case "pl-PL":
                return "Szukaj...";
              case "en-US":
                return "Search...";
            }
        }
      },
    },
    TabSelector: {
      tab: {
        all: {
          "pl-PL": "Wszystko",
          "en-US": "All",
        },
        title: {
          "pl-PL": "Tytuł",
          "en-US": "Title",
        },
        author: {
          "pl-PL": "Autor",
          "en-US": "Author",
        },
      },
    },
    Result: {
      "start-searching": {
        "pl-PL": "Zacznij pisać, aby wyszukać...",
        "en-US": "Start typing to search...",
      },
    },
  },
};
