import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import './AuthStatus.styles.scss';
import { useAuth } from './useAuth';

const AuthStatus = () => {
    let { user, signout } = useAuth();
    let navigate = useNavigate();

    const handleSignOut = () => {
        signout(() => navigate(Routes.Auth));
    };

    return (
        <div className='AuthStatus'>
            <div className='AuthStatus__name'>Welcome, {user}!</div>
            <button className='AuthStatus__logout' onClick={handleSignOut}>
                Sign out
            </button>
        </div>
    );
};

export { AuthStatus };
