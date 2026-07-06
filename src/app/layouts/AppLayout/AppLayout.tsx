import { Outlet } from 'react-router';

// Placeholder layout: no shared chrome (nav/footer) yet. Wired as a layout
// route in src/routes.ts so future shared chrome has a single place to land.
export function AppLayout() {
  return <Outlet />;
}
