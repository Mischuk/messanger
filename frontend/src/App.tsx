import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { AuthProvider } from './features/Auth/Auth.context';
import RoutesContainer from './routes/RoutesContainer';

const queryClient = new QueryClient();

function App() {
    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthProvider>
                        <Header />
                        <RoutesContainer />
                    </AuthProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
