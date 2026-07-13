import { Outlet } from 'react-router';
import { Layout } from 'src/widgets/Layout';

const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
