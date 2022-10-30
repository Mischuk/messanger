import { socket } from '@api';
import { Button } from '@components/Button/Button';
import { useAuthContext } from '@features/Auth/hooks/useAuthContext';
import { getCurrentTime } from '@utils/helpers';
import WS from '@utils/ws.events';
import { useEffect, useRef, useState } from 'react';
import './Messanger.styles.scss';
import { useMessages } from './useMessages';

const Messanger = () => {
    const [inputValue, setInputValue] = useState('');
    const listRef = useRef<HTMLDivElement>(null);
    const { data, addMessages } = useMessages();
    const { user } = useAuthContext();
    console.log(`data: `, data);

    useEffect(() => {
        socket.on(WS.FS_NEW_MESSAGE, ({ newMessage }) => {
            addMessages([newMessage]);
        });
    }, [addMessages]);

    const handleSubmit = () => {
        if (!inputValue) return;

        const time = getCurrentTime();

        const newMessage = {
            author: user.userName,
            time,
            message: inputValue,
        };

        socket.emit(WS.FC_NEW_MESSAGE, { newMessage });

        setInputValue('');
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div className='Messanger'>
            <div className='Messanger__list' ref={listRef}>
                {data &&
                    data.map((msg, idx) => {
                        return (
                            <div className='Messanger__item' key={idx}>
                                <div className='Messanger__item-wrapper'>
                                    <div className='Messanger__header'>
                                        <div className='Messanger__author'>
                                            {msg.author}
                                        </div>
                                        <div className='Messanger__time'>
                                            {msg.time}
                                        </div>
                                    </div>
                                    <div className='Messanger__message'>
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className='Messanger__form'>
                <input
                    type='text'
                    className='Messanger__input'
                    placeholder='Write a message...'
                    onKeyUp={handlePressEnter}
                    onChange={handleChangeMessage}
                    value={inputValue}
                />
                <div className='Messanger__send'>
                    <Button onClick={handleSubmit}>Send</Button>
                </div>
            </div>
        </div>
    );
};

export default Messanger;
