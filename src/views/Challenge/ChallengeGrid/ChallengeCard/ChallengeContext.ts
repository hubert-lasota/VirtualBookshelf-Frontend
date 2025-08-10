import { createContext, useContext } from "react";
import { ChallengeResponse } from "../../../../common/models/challengeModels";

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
