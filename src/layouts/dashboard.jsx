import routes from "@/routes";
import { Routes, Route } from "react-router-dom";
import { useMaterialTailwindController } from "@/context";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";

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
