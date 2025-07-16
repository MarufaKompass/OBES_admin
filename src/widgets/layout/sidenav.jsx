import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import logo from "../../../public/img/favicon.png";
export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div>
        <Link to="/" className="pt-6 pb-2 px-8 text-center block">
            <img src={logo} alt="logo" style={{width:'60px'}}/>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes.map(({ layout, title, pages }, index) => (
          <ul key={index} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}

            {pages.map(({ icon, name, path, children }) => (
              <li key={name}>
                {children ? (
                  <>
                    <Button
                      onClick={() => toggleSubmenu(name)}
                      variant="text"
                      color={
                        sidenavType === "dark" ? "white" : "#212529"
                      }
                      className="flex justify-between items-center gap-4 px-4 capitalize w-full"
                      fullWidth
                    >
                      <span className="  flex items-center gap-3">
                        {icon}
                        <Typography className="font-medium ">
                          {name}
                        </Typography>
                      </span>
                      {openSubmenus[name] ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </Button>
                    {openSubmenus[name] && (
                      <ul className="ml-9 mt-1 flex flex-col gap-1 ">
                        {children.map((child) => (
                          <li key={child.name} >
                            <NavLink to={`/${layout}${path}/${child.path}`} >
                              {({ isActive }) => (
                                <Button
                                  variant={isActive ? "filled" : "text"}
                                  className={`flex items-center gap-4 px-4 capitalize  text-[14px] ${isActive
                                      ? "bg-[#7B1E19] text-white"
                                      : sidenavType === "dark"
                                        ? "text-white"
                                        : "text-[#212529] hover:bg-[#f1f1f1]"
                                    }`}
                                  fullWidth
                                >
                      
                                   <span className="  flex items-center gap-3">
                        {child.icon}
                        <Typography className="font-medium ">
                          {child.name}
                        </Typography>
                      </span>
                                </Button>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (

                      <Button
                        variant={isActive ? "filled" : "text"}
                        className={`flex items-center gap-4 px-4 capitalize ${isActive
                            ? "bg-[#7B1E19] text-white"
                            : sidenavType === "dark"
                              ? "text-white"
                              : "text-[#212529] hover:bg-[#f1f1f1]"
                          }`}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}
