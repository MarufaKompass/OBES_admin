import { ChartBarStacked ,House,ShieldQuestion ,TableOfContents,ShieldUser,LayoutPanelLeft,BetweenHorizontalEnd,AlignStartVertical  , Twitch ,ListTodo ,Map ,CalendarSync  ,Youtube ,TramFront ,ClipboardPlus,Users  ,UserPlus  } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { PuffLoader } from "react-spinners";
import { Home } from "@/pages/dashboard";

import AddFaq from "./pages/faq/AddFaq";
import FaqList from "./pages/faq/FaqList";
import AddVideos from './pages/material/AddVideos';
import UserAnswerLists from './pages/ansList/UserAnswerLists';
import VideoList from './pages/video/VideoList';
import Steps from './pages/steps/Steps';
import AddNewsLetter from './pages/newsletter/AddNewsLetter';
import NewsletterList from './pages/newsletter/NewsletterList';
import AddDietChart from './pages/dietCharts/AddDietChart';
import DietChartList from './pages/dietCharts/DietChartList';
const AllAnswers = (lazy(() => import('./pages/ansList/AllAnswers')));
const Video = (lazy(() => import('./pages/video/Video')));
const AddDoctorInfo = (lazy(() => import('./pages/doctor/addDoctorInfo')));
const Questionnaire = (lazy(() => import("./pages/questionary/Questionnaire")));
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
      {
        icon: <LayoutPanelLeft   {...icon} />,
        name: "Category",
        path: "/category",
        // element: <Questionnaire />,
        children: [
          {
              icon: <ChartBarStacked  {...icon} />,
              name: "Add Category",
              path: "addCategory",
              element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>
          }>

              <PrivateRoute>  <AddCategories /> </PrivateRoute>
            </Suspense>
          },
          {
            icon: <BetweenHorizontalEnd   {...icon} />,
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
            icon: <Twitch       {...icon} />,
            name: "Questionnaires",
            path: "questionnaires",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <Questionnaire /> </PrivateRoute>
            </Suspense>
          },
          {
            icon: <AlignStartVertical    {...icon} />,
            name: "questionnaire lists",
            path: "questionnaireLists",
            element:
              <Suspense fallback={<div className="flex justify-center items-center h-screen">
                <PuffLoader color="rgb(123 30 25)" />
              </div>}>

                <PrivateRoute> <QuestionnaireLists /> </PrivateRoute>
              </Suspense>
          },
          
         {
        icon: <CalendarSync   {...icon} />,
        name: "Answer lists",
        path: "answerLists",
        element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
          <PuffLoader color="rgb(123 30 25)" />
        </div>}>

          <PrivateRoute> <AllAnswers /> </PrivateRoute>
        </Suspense>
      },
      //    {

      //   path: "answerDetails/:id",
      //   element: (
        
      //   <Suspense fallback={<div className="flex justify-center items-center h-screen">
      //     <PuffLoader color="rgb(123 30 25)" />
      //   </div>
      
      // }>

      //     <PrivateRoute> <UserAnswerLists /> </PrivateRoute>
      //   </Suspense>
      //   ),
      //         hidden: true,
      // },



        ],
      },



      
      {
        icon: <UserPlus   {...icon} />,
        name: "User Video",
        path: "/user",
        children: [
          {
            icon: <Youtube      {...icon} />,
            name: "Add Video",
            path: "video",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <Video /> </PrivateRoute>
            </Suspense>
          },
          // {
          //   icon: <Youtube      {...icon} />,
          //   name: "Video List",
          //   path: "videoList",
          //   element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
          //     <PuffLoader color="rgb(123 30 25)" />
          //   </div>}>

          //     <PrivateRoute>  <VideoList /> </PrivateRoute>
          //   </Suspense>
          // }
        ],
      },
      {
        icon: <ClipboardPlus   {...icon} />,
        name: "Doctor",
        path: "/doctor",
        children: [
          {
            icon: <Users      {...icon} />,
            name: "Add Doctor",
            path: "video",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddDoctorInfo /> </PrivateRoute>
            </Suspense>
          }
        ],
      },
      {
        icon: <TramFront   {...icon} />,
        name: "material",
        path: "/material",
        children: [
          {
            icon: <Youtube     {...icon} />,
            name: "Add Videos",
            path: "video",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddVideos /> </PrivateRoute>
            </Suspense>
          }
        ],
      },
      
      {
        icon: <ShieldUser  {...icon} />,
        name: "7 Steps List",
        path: "/steps",
        element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
          <PuffLoader color="rgb(123 30 25)" />
        </div>}>

          <PrivateRoute> <Steps /> </PrivateRoute>
        </Suspense>
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


       {
        icon: <TableOfContents  {...icon} />,
        name: "FAQ",
        path: "/faq",
        children: [
          {
            icon: <Map     {...icon} />,
            name: "Add Faq",
            path: "addFaq",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddFaq /> </PrivateRoute>
            </Suspense>
          },
          {
            icon: <ListTodo    {...icon} />,
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
        icon: <TableOfContents  {...icon} />,
        name: "Newsletter",
        path: "/newsletter",
        children: [
          {
            icon: <Map     {...icon} />,
            name: "Add Newsletter",
            path: "addNewsletter",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddNewsLetter /> </PrivateRoute>
            </Suspense>
          },
          {
            icon: <ListTodo    {...icon} />,
            name: "Newsletter Lists",
            path: "newsletterLists",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <NewsletterList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },
       {
        icon: <TableOfContents  {...icon} />,
        name: "Diet Chart",
        path: "/dietChart",
        children: [
          {
            icon: <Map     {...icon} />,
            name: "Add Diet Chart",
            path: "addDietChart",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <AddDietChart /> </PrivateRoute>
            </Suspense>
          },
          {
            icon: <ListTodo    {...icon} />,
            name: "Diet Chart Lists",
            path: "dietChartLists",
            element: <Suspense fallback={<div className="flex justify-center items-center h-screen">
              <PuffLoader color="rgb(123 30 25)" />
            </div>}>

              <PrivateRoute>  <DietChartList /> </PrivateRoute>
            </Suspense>
          },
        ],
      },


    ],
  },

];

export default routes;