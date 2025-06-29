import { ChartBarStacked ,House,ShieldQuestion ,TableOfContents,ShieldUser   } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Home } from "@/pages/dashboard";
import AddFaq from "./pages/faq/AddFaq";
import FaqList from "./pages/faq/FaqList";
import { PuffLoader } from "react-spinners";
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
        icon: <House  {...icon} />,
        name: "dashboard",
        path: "/",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center h-screen">
            <PuffLoader color="rgb(123 30 25)" />
          </div>}>
            <PrivateRoute> <Home /> </PrivateRoute></Suspense>
        )
      },

      //   {
      //     icon: <UserCircleIcon {...icon} />,
      //     name: "profile",
      //     path: "/profile",
      //     element: 
      //         <Suspense fallback={<Typography>Loading...</Typography>}>
      //           <PrivateRoute> <Profile /></PrivateRoute>,

      // </Suspense>
      //   },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <PrivateRoute>  <Tables /> </PrivateRoute>,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
      //     <PuffLoader color="rgb(123 30 25)" />
      //   </div>}>

      //     <PrivateRoute>  <Notifications /> </PrivateRoute>,
      //   </Suspense>
      // },
      //   {
      //     icon: <InformationCircleIcon {...icon} />,
      //     name: "add questionnaire",
      //     path: "/questionnaire",
      //     element:  
      // <Suspense fallback={<Typography>Loading...</Typography>}>
      //  <PrivateRoute>  <Questionnaire /> </PrivateRoute>
      // </Suspense> 
      //   },


      {
        icon: <ChartBarStacked  {...icon} />,
        name: "Category",
        path: "/category",
        // element: <Questionnaire />,
        children: [
          {
            name: "Add Category",
            path: "addCategory",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddCategories /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "Category Lists",
            path: "categoryLists",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <CategoriesList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },
      {
        icon: <ShieldQuestion  {...icon} />,
        name: "questionnaire ",
        path: "/questionary",
        children: [
          {
            name: "Questionnaires",
            path: "questionnaires",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <Questionnaire /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "questionnaire lists",
            path: "questionnaireLists",
            element:
              <Suspense fallback={<div className="flex justify-center items-center h-screen">
                <PuffLoader color="rgb(123 30 25)" />
              </div>}>

                <PrivateRoute> <QuestionnaireLists /> </PrivateRoute>
              </Suspense>
          },

        ],
      },
      {
        icon: <TableOfContents  {...icon} />,
        name: "FAQ",
        path: "/faq",
        children: [
          {
            name: "Add Faq",
            path: "addFaq",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddFaq /> </PrivateRoute>
            </Suspense>
          },
          {
            name: "FAQ Lists",
            path: "faqLists",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <FaqList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },

      {
        icon: <ShieldUser  {...icon} />,
        name: "User lists",
        path: "/userLists",
        element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
          <PuffLoader color="rgb(123 30 25)" />
        </div>}>

          <PrivateRoute> <UserLists /> </PrivateRoute>
        </Suspense>
      },
    ],
  },

];

export default routes;