import {
    Navigate,
    Route,
    Routes as Routers,
    useLocation,
} from 'react-router-dom';
import { Routes } from '.';
import { Layout } from '../components/Layout/Layout';
import Auth from '../features/Auth/Auth';
import { useAuthContext } from '../features/Auth/hooks/useAuthContext';
import Messanger from '../features/Messanger/Messanger';
import { NotFound } from '../features/NotFound/NotFound';

function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();
    const { isAuth } = useAuthContext();

    if (!isAuth) {
        return <Navigate to={Routes.Auth} state={{ from: location }} replace />;
    }

    return children;
}

const RoutesContainer = () => {
    return (
        <Routers>
            <Route element={<Layout />}>
                <Route
                    path={Routes.Messanger}
                    element={
                        <RequireAuth>
                            <Messanger />
                        </RequireAuth>
                    }
                />
                <Route path={Routes.Auth} element={<Auth />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routers>
    );
};

export default RoutesContainer;
