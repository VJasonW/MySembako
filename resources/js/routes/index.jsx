import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Page = () => {
    const routes = useRoutes(AppRoutes);
    return routes || <div style={{ padding: '20px' }}>Loading...</div>;
};

export default Page;