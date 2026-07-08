import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { AppProvider } from './app/providers/AppProvider';

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
        <AppProvider>
          {children}
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  return <Outlet />;
};

export default App;

export const ErrorBoundary = ({ error }: { readonly error: unknown }) => {
  let title = 'Что-то пошло не так';
  let details = 'Произошла неожиданная ошибка.';

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? 'Страница не найдена' : `Ошибка ${error.status}`;
    details = error.status === 404 ? 'Такой страницы не существует.' : error.statusText || details;
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
