import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';
import { useLayoutContext } from 'src/shared/config';
import { Layout } from 'src/widgets/Layout';

const HomeCollectionOverlay = lazy(async () => {
  const homePage = await import('src/pages/Home');

  return { default: homePage.HomeCollectionOverlay };
});

const AppLayout = () => {
  const { isCollectionOpen, locale, onCollectionClose } = useLayoutContext();

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Suspense fallback={null}>
        {isCollectionOpen ? (
          <HomeCollectionOverlay locale={locale} onClose={onCollectionClose} />
        ) : null}
      </Suspense>
    </>
  );
};

export default AppLayout;
