import ManageProj from "./Teamboard/ManageProj/ManageProj";
import ProjInfo from "./Teamboard/ProjInfo/ProjInfo";
import SetMember from "./Teamboard/SetMember/SetMember";
import Teamboard from "./Teamboard/Teamboard";

export const RouterInfo = [
  {
    path: "/",
    element: <Teamboard />,
    children: [
      {
        path: "/ProjInfo",
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
