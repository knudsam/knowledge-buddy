import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Index from "views/Index";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-collection text-info",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-user-run text-red",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
