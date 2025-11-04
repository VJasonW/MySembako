import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Page = () => {
    const routes = useRoutes(AppRoutes);
    return routes;
};

export default Page;