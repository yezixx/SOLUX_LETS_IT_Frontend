import TeamLayout from "../Screen/Teamboard/Layout/TeamLayout";
import MemberProfile from "../Screen/Teamboard/MemberProfile/MemberProfile";
import TeamFeedback from "../Screen/Teamboard/TeamFeedback/TeamFeedback";
import UpdateProj from "../Screen/Teamboard/UpdateProj/UpdateProj";
import ManageProj from "./../Screen/Teamboard/ManageProj/ManageProj";
import ProjInfo from "./../Screen/Teamboard/ProjInfo/ProjInfo";
import SetMember from "./../Screen/Teamboard/SetMember/SetMember";
import Teamboard from "./../Screen/Teamboard/Teamboard";
import CreateBoard from "./../Screen/Teamboard/CreateBoard/CreateBoard";

export const RouterInfo = [
  {
    path: "/",
    element: <Teamboard />,
    children: [
      {
        element: <TeamLayout />,
        children: [
          {
            index: true,
            element: <ProjInfo />,
            label: "Project Information",
          },
          {
            path: "member",
            element: <SetMember />,
            label: "Set Member",
          },
          {
            path: "manage",
            element: <ManageProj />,
            label: "Manage Project",
          },
          {
            path: "manage/edit",
            element: <UpdateProj />,
            label: "Update Project",
          },
          {
            path: "member/profile",
            element: <MemberProfile />,
            label: "Member Profile",
          },
        ],
      },
      {
        path: "feedback",
        element: <TeamFeedback />,
        label: "Team Feedback",
      },
    ],
  },
  {
    path: "myproj/apply/createboard",
    element: <CreateBoard />,
    label: "Create Board",
  },
];
