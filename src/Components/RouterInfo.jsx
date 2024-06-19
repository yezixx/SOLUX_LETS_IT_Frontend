import ManageProj from "./../Screen/Teamboard/ManageProj/ManageProj";
import ProjInfo from "./../Screen/Teamboard/ProjInfo/ProjInfo";
import SetMember from "./../Screen/Teamboard/SetMember/SetMember";
import Teamboard from "./../Screen/Teamboard/Teamboard";

export const RouterInfo = [
  {
    path: "/",
    element: <Teamboard />,
    children: [
      {
        index: true,
        element: <ProjInfo />,
        label: "Project Information",
      },
      {
        path: "/SetMember",
        element: <SetMember />,
        label: "Set Member",
      },
      {
        path: "/ManageProj",
        element: <ManageProj />,
        label: "Manage Project",
      },
    ],
  },
];
