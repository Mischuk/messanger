import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../../App';
import { Button } from '../../components/Button/Button';
import { useHttp } from '../../hooks/useHttp';
import { socket } from '../../socket';
import './Messanger.styles.scss';

interface Message {
    author: string;
    message: string;
    time: string;
}

const getCurrentTime = (): string => {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${hh}:${mm}`;
};

const Messanger = () => {
    const { store } = useContext(StoreContext);
    const [inputValue, setInputValue] = useState('');
    const listRef = useRef<HTMLDivElement>(null);
    const { request } = useHttp();

    const [data, setData] = useState<Message[]>([]);

    const getMessages = async () => {
        try {
            const data = await request('api/messages', 'GET');

            if (data) {
                setData(data.data.messages);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        socket.on('newMessageFromServer', ({ newMessage }) => {
            setData((prev) => [...prev, newMessage]);
        });
    }, []);

    const handleSubmit = () => {
        if (!inputValue) return;

        const time = getCurrentTime();
        const newMessage = { author: store.user.userName, time, message: inputValue };

        socket.emit('sendMessage', { newMessage });

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
    }, [data]);

    return (
        <div className='Messanger'>
            <div className='Messanger__list' ref={listRef}>
                {data.map((msg, idx) => {
                    return (
                        <div className='Messanger__item' key={idx}>
                            <div className='Messanger__item-wrapper'>
                                <div className='Messanger__header'>
                                    <div className='Messanger__author'>{msg.author}</div>
                                    <div className='Messanger__time'>{msg.time}</div>
                                </div>
                                <div className='Messanger__message'>{msg.message}</div>
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

export { Messanger };
