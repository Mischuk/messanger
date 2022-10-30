import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { queryClient } from './api/instances';
import './App.scss';
import Header from './components/Header/Header';
import { AuthProvider } from './features/Auth/Auth.context';
import RoutesContainer from './routes/RoutesContainer';

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
