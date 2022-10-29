import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import store from '../../store';
import './AuthStatus.styles.scss';

const AuthStatus = () => {
    const { logOut, getUser } = store;
    let navigate = useNavigate();

    const handleSignOut = () => {
        logOut(() => navigate(Routes.Auth));
    };

    return (
        <div className='AuthStatus'>
            <div className='AuthStatus__name'>Welcome, {getUser.userName}!</div>
            <button className='AuthStatus__logout' onClick={handleSignOut}>
                Sign out
            </button>
        </div>
    );
};

export default observer(AuthStatus);
