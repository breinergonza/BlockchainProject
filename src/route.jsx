import { lazy } from 'react';

const Inicio = lazy(() => import("./views/home/inicio"));

const RouteList = [
  /* Other pages */
  { exact: true, path: "/page/blockchain", name: "Inicio", component: Inicio }
];


export default RouteList
