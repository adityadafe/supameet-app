/* @global-imports */
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
/* @local-imports */
import "./../index.css";
import Footer from "@/components/footer";
import Header from "@/components/temp-nav";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="mb-10">
        <Header/>
      </div>
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});
