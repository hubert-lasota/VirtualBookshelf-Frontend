import { Dialog, DialogContent, List } from "@mui/material";
import { useChallengeContext } from "../../ChallengeContext";
import ParticipantsHeader from "./ParticipantsHeader";
import ParticipantsPagination from "./ParticipantsPagination";
import { useState } from "react";
import { useGetChallengeParticipants } from "../../../../../../common/api/clients/challengeParticipantClient";
import ParticipantListItem from "./ParticipantListItem";

type Props = {
  onClose: () => void;
};

export default function ChallengeParticipantsDialog({ onClose }: Props) {
  const [page, setPage] = useState(0);
  const { id } = useChallengeContext();
  const { data: { participants = [], pageMeta } = {} } =
    useGetChallengeParticipants({ challengeId: id, page });

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <ParticipantsHeader onClose={onClose} />
      <DialogContent dividers sx={{ padding: 0 }}>
        <List sx={{ padding: 0 }}>
          {participants.map((participant) => (
            <ParticipantListItem participant={participant} />
          ))}
        </List>
      </DialogContent>
      <ParticipantsPagination
        page={page}
        onPageChange={setPage}
        totalPages={pageMeta?.totalPages ?? 0}
      />
    </Dialog>
  );
}
