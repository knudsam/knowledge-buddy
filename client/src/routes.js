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
    
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    
  },
  {
    path: "/register", 
    component: <Register />,
    
  },
  {
    path: "/login",
    component: <Login />,
    
  },
];
export default routes;
