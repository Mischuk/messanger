import { observer } from 'mobx-react-lite';
import {
    Navigate,
    Route,
    Routes as Routers,
    useLocation,
} from 'react-router-dom';
import { Routes } from '.';
import { Layout } from '../components/Layout/Layout';
import Auth from '../features/Auth/Auth';
import Messanger from '../features/Messanger/Messanger';
import { NotFound } from '../features/NotFound/NotFound';
import store from '../store';

function RequireAuth({ children }: { children: JSX.Element }) {
    const { getAuthorisedStatus } = store;
    let location = useLocation();

    if (!getAuthorisedStatus) {
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

export default observer(RoutesContainer);
