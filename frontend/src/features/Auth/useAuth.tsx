import { useContext } from 'react';
import { AuthContext } from './Auth.context';

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth };
