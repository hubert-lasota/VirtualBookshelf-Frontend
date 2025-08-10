import Toolbar from "../../common/components/ui/Toolbar/Toolbar";

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
