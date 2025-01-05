// packages
import { ComponentType } from "react";

export type RouteProps = {
  name: string;
  path?: string;
  component?: ComponentType;
};
