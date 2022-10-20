import { AuthStatus } from '../../features/Auth/AuthStatus';
import { useAuth } from '../../features/Auth/useAuth';
import './Header.styles.scss';

const Header = () => {
    let { user } = useAuth();

    if (!user) return null;

    return (
        <div className='Header'>
            <AuthStatus />
        </div>
    );
};

export { Header };
