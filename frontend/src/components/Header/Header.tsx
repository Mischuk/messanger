import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/Auth/Auth.context';
import { Routes } from '../../routes';
import './Header.styles.scss';

const Header = () => {
    let navigate = useNavigate();
    const { signOut, user, isAuth } = useContext(AuthContext);

    const handleSignOut = () => signOut(() => navigate(Routes.Auth));

    if (!isAuth) return null;

    return (
        <div className='Header'>
            <div className='Header__status'>
                <div className='Header__status-name'>
                    Welcome, {user.userName}!
                </div>
                <button
                    className='Header__status-logout'
                    onClick={handleSignOut}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Header;
