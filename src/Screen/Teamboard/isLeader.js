export const isLeader = (members, userId) => {
  return (
    members.find((member) => member.userId === userId).position ===
    "Team_Leader"
  );
};
