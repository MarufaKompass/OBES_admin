import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "@/pages/auth";
import {
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export function Auth() {
  const navbarRoutes = [
    {
      title: "auth pages",
      layout: "auth",
      pages: [
        {
          icon: <ServerStackIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
 
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {navbarRoutes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
