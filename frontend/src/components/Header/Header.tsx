import { AuthStatus } from '../../features/Auth/AuthStatus';
import { useAuthContext } from '../../features/Auth/useAuthContext';
import './Header.styles.scss';

const Header = () => {
    let { user } = useAuthContext();

    if (!user.userName) return null;

    return (
        <div className='Header'>
            <AuthStatus />
        </div>
    );
};

export { Header };
