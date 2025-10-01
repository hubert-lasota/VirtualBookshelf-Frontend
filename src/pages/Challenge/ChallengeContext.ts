import { createContext, useContext } from "react";
import {
  ChallengeFilter,
  ChallengeResponse,
} from "../../common/models/challengeModels";

export const ChallengeContext = createContext<ChallengeResponse | null>(null);

export const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error(
      "useChallengeContext must be used within ChallengeContextProvider",
    );
  }
  return context;
};

type ChallengePageContextValue = {
  filter: ChallengeFilter;
  onFilterChange: (filter: ChallengeFilter) => void;
};

export const ChallengePageContext =
  createContext<ChallengePageContextValue | null>(null);

export const useChallengePageContext = () => {
  const context = useContext(ChallengePageContext);
  if (!context) {
    throw new Error(
      "useChallengePageContext must be used within ChallengePageContextProvider",
    );
  }
  return context;
};
