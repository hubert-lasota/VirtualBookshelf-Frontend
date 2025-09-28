import Toolbar from "../../common/components/Toolbar/Toolbar";

export default function ChallengeToolbar() {
  return (
    <Toolbar
      filterButtonProps={{
        content: "xd",
        onReset: () => {},
        onApply: () => {},
      }}
    />
  );
}
