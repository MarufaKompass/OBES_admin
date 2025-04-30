import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";

import Questionnaire from "./pages/dashboard/questionnaire";
import QuestionnaireLists from "./pages/dashboard/QuestionnaireLists";
import UserLists from "./pages/userList/UserLists";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
    
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "*",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "add questionnaire",
        path: "/questionnaire",
        element: <Questionnaire />,
        children: [
          {
            name: "step 1",
            path: "step1",
            element: <div>Step 1 Content</div>,
          },
          {
            name: "step 2",
            path: "step2",
            element: <div>Step 2 Content</div>,
          },
        ],
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "questionnaire lists",
        path: "/questionnaireLists",
        element: <QuestionnaireLists />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "User lists",
        path: "/userLists",
        element: <UserLists />,
      },
    ],
  },

];

export default routes;
