import { createContext, useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { AuthProvider } from './features/Auth/Auth.context';
import { RoutesContainer } from './routes/RoutesContainer';

export const StoreContext = createContext({ store: {}, updateStore: () => {} } as any);

function App() {
    const [store, setStore] = useState({
        user: { userId: '', userName: '' },
    });

    const updateStore = useCallback((key: string, value: any) => {
        setStore((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }, []);

    return (
        <div className='App'>
            <StoreContext.Provider value={{ store, updateStore }}>
                <BrowserRouter>
                    <AuthProvider>
                        <Header />
                        <RoutesContainer />
                    </AuthProvider>
                </BrowserRouter>
            </StoreContext.Provider>
        </div>
    );
}

export default App;
