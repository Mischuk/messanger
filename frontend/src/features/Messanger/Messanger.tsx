import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { socket } from '../../socket';
import store from '../../store';
import { getCurrentTime } from '../../utils/helpers';
import WS from '../../utils/ws.events';
import './Messanger.styles.scss';
import { useMessages } from './useMessages';

const Messanger = () => {
    const { getUser } = store;
    const [inputValue, setInputValue] = useState('');
    const listRef = useRef<HTMLDivElement>(null);
    const messages = useMessages();

    useEffect(() => {
        socket.on(WS.FS_NEW_MESSAGE, ({ newMessage }) => {
            messages.addMessages([newMessage]);
        });
    }, [messages]);

    const handleSubmit = () => {
        if (!inputValue) return;

        const time = getCurrentTime();

        const newMessage = {
            author: getUser.userName,
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

    useEffect(() => {
        const el = listRef.current;
        if (el) {
            el.scrollTo(0, el.offsetHeight);
        }
    }, [messages.data]);

    return (
        <div className='Messanger'>
            <div className='Messanger__list' ref={listRef}>
                {messages.data &&
                    messages.data.map((msg, idx) => {
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

export default observer(Messanger);
