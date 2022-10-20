import { useState } from 'react';
import './App.scss';
import { Auth } from './features/Auth/Auth';
import { Messanger } from './features/Messanger/Messanger';
import { User } from './models';
import { socket } from './socket';

function App() {
    const [currentUser, setCurrentUser] = useState({ userId: '', userName: '' });

    const signIn = (data: User) => {
        setCurrentUser(data);
        socket.emit('joinClient', data);
    };

    return (
        <div className='App'>
            {!currentUser.userId && <Auth onSuccess={signIn} />}
            {currentUser.userId && <Messanger user={currentUser} />}
        </div>
    );
}

export default App;
