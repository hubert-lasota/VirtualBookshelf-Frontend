import Toolbar from "../../common/components/ui/Toolbar/Toolbar";

export default function ReadingSessionToolbar() {
  return (
    <Toolbar
      filterButtonProps={{
        content: "PL",
        onReset: () => {},
        onApply: () => {},
      }}
    />
  );
}
