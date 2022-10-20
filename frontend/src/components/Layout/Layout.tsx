import { Outlet } from 'react-router-dom';
import './Layout.styles.scss';

const Layout = () => {
    return (
        <div className='Layout'>
            <Outlet />
        </div>
    );
};

export { Layout };
