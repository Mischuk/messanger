import { useContext } from 'react';
import { AuthContext } from './Auth.context';

function useAuthContext() {
    return useContext(AuthContext);
}

export { useAuthContext };
