import { queryClient } from '@api';
import { Header } from '@components/Header/Header';
import { AuthProvider } from '@features/Auth/Auth.context';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.scss';
import RoutesContainer from './routes/RoutesContainer';
// test commit
function App() {
    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <AuthProvider>
                        <BrowserRouter>
                            <Header />
                            <RoutesContainer />
                        </BrowserRouter>
                    </AuthProvider>
                </RecoilRoot>
            </QueryClientProvider>
        </div>
    );
}

export default App;
