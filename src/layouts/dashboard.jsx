 import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {Sidenav,DashboardNavbar,Configurator,Footer} from "@/widgets/layout";

import routes from "@/routes";

export function Dashboard() {

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

<Routes>
  {routes.map(({ layout, pages }) =>
    layout === "dashboard" &&
    pages.map(({ path, element, children }) => {
      if (children) {
        // Include submenu child routes
        return children.map((child) => (
          <Route
            key={`${path}/${child.path}`}
            path={`${path}/${child.path}`}
            element={child.element}
          />
        ));
      }
      return (
        <Route key={path} path={path} element={element} />
      );
    })
  )}
</Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
