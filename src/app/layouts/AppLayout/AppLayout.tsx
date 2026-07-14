import { Outlet } from 'react-router';
import { HomeCollectionOverlay } from 'src/pages/Home';
import { useLayoutContext } from 'src/shared/config';
import { Layout } from 'src/widgets/Layout';

const AppLayout = () => {
  const { isCollectionOpen, locale, onCollectionClose } = useLayoutContext();

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      {isCollectionOpen ? (
        <HomeCollectionOverlay locale={locale} onClose={onCollectionClose} />
      ) : null}
    </>
  );
};

export default AppLayout;
