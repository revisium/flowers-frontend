import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from 'react-router';

import { AppProvider } from './app/providers/AppProvider';

export const links: LinksFunction = () => [
  {
    href: '/greenhouse-leaf-logo.png',
    rel: 'icon',
    type: 'image/png',
  },
  {
    href: '/greenhouse-leaf-logo.png',
    rel: 'apple-touch-icon',
  },
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/NTSomic-Regular.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/NTSomic-Medium.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/NTSomic-Semibold.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
  {
    as: 'font',
    crossOrigin: 'anonymous',
    href: '/fonts/NTSomic-Bold.woff2',
    rel: 'preload',
    type: 'font/woff2',
  },
];

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Оранжерея. Моя личная коллекция.</title>
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
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
