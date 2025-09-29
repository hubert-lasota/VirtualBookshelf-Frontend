import Toolbar from "../../../common/components/Toolbar/Toolbar";
import { ChallengeFilter } from "../../../common/models/challengeModels";
import { useEffect, useState } from "react";
import ChallengeFilterDialogContent from "./ChallengeFilterDialogContent";

type Props = {
  filter: ChallengeFilter;
  onFilterChange: (filter: ChallengeFilter) => void;
};

export default function ChallengeToolbar({ filter, onFilterChange }: Props) {
  const [unsavedFilter, setUnsavedFilter] = useState<ChallengeFilter>(filter);

  useEffect(() => {
    setUnsavedFilter(filter);
  }, [filter]);

  return (
    <Toolbar
      searchTextFieldProps={{
        onDebounceValueChange: (value) =>
          setUnsavedFilter((prev) => ({ ...prev, query: value })),
      }}
      filterButtonProps={{
        onReset: () => onFilterChange({ query: filter.query }),
        onApply: () => onFilterChange(unsavedFilter),
        content: (
          <ChallengeFilterDialogContent
            filter={unsavedFilter}
            onFilterChange={setUnsavedFilter}
          />
        ),
      }}
    />
  );
}
