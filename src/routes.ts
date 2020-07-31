// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// Componente principal do dashboard
import DashboardPage from "./views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
