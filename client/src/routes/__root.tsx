/* @global-imports */
import { Outlet, createRootRoute } from "@tanstack/react-router";
/* @local-imports */
import "./../index.css";
import Header from "@/components/temp-nav";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
    </>
  ),
});
