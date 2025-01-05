// types
import { RouteProps } from "@/types/routes-types";

// pages
import HomePage from "@/pages/Home";

export const routes: RouteProps[] = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
  },
];
