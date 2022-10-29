import { observer } from 'mobx-react-lite';
import AuthStatus from '../../features/Auth/AuthStatus';
import store from '../../store';
import './Header.styles.scss';
const Header = () => {
    const { isAuthorised } = store;

    if (!isAuthorised) return null;

    return (
        <div className='Header'>
            <AuthStatus />
        </div>
    );
};

export default observer(Header);
