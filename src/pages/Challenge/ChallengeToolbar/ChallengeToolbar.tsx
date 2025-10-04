import Toolbar from "../../../common/components/Toolbar/Toolbar";
import { ChallengeFilter } from "../../../common/models/challengeModels";
import { useChallengePageContext } from "../ChallengeContext";
import ChallengeFilterFields from "./ChallengeFilterFields";
import { ApiSort } from "../../../common/api/apiModels";

export default function ChallengeToolbar() {
  const { filter, onFilterChange } = useChallengePageContext();

  return (
    <Toolbar<ChallengeFilter>
      searchTextFieldProps={{
        onDebounceValueChange: (value) =>
          onFilterChange({ ...filter, query: value }),
      }}
      filterButtonProps={{
        onSubmit: (newFilter: ChallengeFilter) =>
          onFilterChange({ ...filter, ...newFilter }),
        content: <ChallengeFilterFields />,
      }}
      sortButtonProps={{
        onSubmit: (sort: ApiSort) => onFilterChange({ ...filter, sort }),
        fields: [],
      }}
    />
  );
}
