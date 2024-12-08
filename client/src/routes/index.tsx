import { createFileRoute } from "@tanstack/react-router";

function HomePage() {
  return (
    <>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
