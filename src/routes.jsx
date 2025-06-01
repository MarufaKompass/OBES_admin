import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import { lazy, Suspense } from 'react';
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { Typography } from "@material-tailwind/react";
import AddFaq from "./pages/faq/AddFaq";
import FaqList from "./pages/faq/FaqList";
const Questionnaire = (lazy(() => import("./pages/questionary/questionnaire")));
const QuestionnaireLists = (lazy(() => import("./pages/questionary/questionnaireLists")));
const UserLists = (lazy(() => import("./pages/userList/UserLists")));
const AddCategories = (lazy(() => import("./pages/category/AddCategories")));
const CategoriesList = (lazy(() => import("./pages/category/CategoriesList")));
const PrivateRoute = (lazy(() => import("./components/privateRoute/PrivateRoute")));

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
        element: (
          <Suspense fallback={<Typography>Loading...</Typography>}>
            <PrivateRoute> <Home /> </PrivateRoute></Suspense>
        )
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element:
          <Suspense fallback={<Typography>Loading...</Typography>}>
            <PrivateRoute> <Profile /></PrivateRoute>,

          </Suspense>
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <PrivateRoute>  <Tables /> </PrivateRoute>,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Suspense fallback={<Typography>Loading...</Typography>}>

      //     <PrivateRoute>  <Notifications /> </PrivateRoute>,
      //   </Suspense>
      // },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "add questionnaire",
        path: "/questionnaire",
        element:
          <Suspense fallback={<Typography>Loading...</Typography>}>

            <PrivateRoute>  <Questionnaire /> </PrivateRoute>
          </Suspense>
      },


      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Category",
        path: "/category",
        // element: <Questionnaire />,
        children: [
          {
            name: "Add Category",
            path: "addCategory",
            element: <Suspense fallback={<Typography>Loading...</Typography>}>

              <PrivateRoute>  <AddCategories /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "Category Lists",
            path: "categoryLists",
            element: <Suspense fallback={<Typography>Loading...</Typography>}>

              <PrivateRoute>  <CategoriesList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "questionnaire ",
        path: "/questionary",
        children: [
          {
            name: "Questionnaires",
            path: "questionnaires",
            element: <Suspense fallback={<Typography>Loading...</Typography>}>

              <PrivateRoute>  <Questionnaire /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "questionnaire lists",
            path: "questionnaireLists",
            element:
              <Suspense fallback={<Typography>Loading...</Typography>}>

                <PrivateRoute> <QuestionnaireLists /> </PrivateRoute>
              </Suspense>
          },

        ],
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "FAQ",
        path: "/faq",
        // element: <Questionnaire />,
        children: [
          {
            name: "Add Faq",
            path: "addFaq",
            element: <Suspense fallback={<Typography>Loading...</Typography>}>

              <PrivateRoute>  <AddFaq /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "FAQ Lists",
            path: "faqLists",
            element: <Suspense fallback={<Typography>Loading...</Typography>}>

              <PrivateRoute>  <FaqList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "User lists",
        path: "/userLists",
        element: <Suspense fallback={<Typography>Loading...</Typography>}>

          <PrivateRoute> <UserLists /> </PrivateRoute>
        </Suspense>
      },
    ],
  },

];

export default routes;
