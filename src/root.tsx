import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
  useRouteLoaderData,
} from 'react-router';

import { AppProvider } from './app/providers/AppProvider';
import {
  defaultLocale,
  getLocaleTitle,
  getRequestLocale,
  LayoutProvider,
} from './shared/config';

export const loader = ({ request }: { readonly request: Request }) => ({
  locale: getRequestLocale(request),
});

export const links: LinksFunction = () => [
  {
    href: '/greenhouse-leaf-logo.webp',
    rel: 'icon',
    type: 'image/png',
  },
  {
    href: '/greenhouse-leaf-logo.webp',
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
  const locale = useRouteLoaderData<typeof loader>('root')?.locale ?? defaultLocale;

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{getLocaleTitle(locale)}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider>
          <LayoutProvider initialLocale={locale}>{children}</LayoutProvider>
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
