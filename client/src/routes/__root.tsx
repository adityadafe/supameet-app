/* @global-imports */
import { Outlet, createRootRoute } from "@tanstack/react-router";
/* @local-imports */
import "./../index.css";
import Header from "@/components/temp-nav";
import TypingTest from "@/components/typer";
import TypingKeyboard from "@/components/keyboard";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <TypingTest/>
      <TypingKeyboard/>
    </>
  ),
});
