import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { AppProvider } from './app/providers/AppProvider';
import 'src/shared/ui/theme/fonts.css';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>flowers-frontend</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default App;

export const ErrorBoundary = ({ error }: { readonly error: unknown }) => {
  let title = 'Something went wrong';
  let details = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? 'Page not found' : `Error ${error.status}`;
    details = error.status === 404 ? 'The requested page does not exist.' : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main>
      <h1>{title}</h1>
      <p>{details}</p>
    </main>
  );
};
