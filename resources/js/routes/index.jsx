import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Page = () => {
    const routes = useRoutes(AppRoutes);
    
    if (!routes) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>404 - Page Not Found</h1>
                <p>Route tidak ditemukan</p>
            </div>
        );
    }
    
    return routes;
};

export default Page;