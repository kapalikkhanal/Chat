import React, { useEffect, useState, useRef } from 'react';
import socketIO from 'socket.io-client';
import SearchBox from './components/searchBox';
import Picker from '@emoji-mart/react';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';

const socket = socketIO.connect('http://localhost:3001');
const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const lastMessageRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);


    let res = '';
    if (typeof localStorage !== 'undefined') {
        res = localStorage.getItem("userName");
    }

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
        console.log('Selected Emoji:', emoji.native);
    };

    const sendMessage = () => {
        const combinedMessage = `${messageText} ${selectedEmoji ? selectedEmoji.native : ''}`;
        console.log("Text:", combinedMessage)
        socket.emit('sendMessage', {
            text: combinedMessage,
            userName: res,
        });
        setMessageText('');
        setSelectedEmoji(null);
    };

    return (
        <div className='bg-gray-900 text-white fixed w-full'>
            <div>
                <h1 className='text-2xl text-center font-semibold p-4'>CHAT Application</h1>

                <div className='flex justify-between min-h-screen'>
                    <div className='w-1/4'>
                        <h1 className='text-center text-2xl font-bold p-2'>Peoples</h1>
                        <SearchBox />
                        <div className=''>

                        </div>
                    </div>

                    {/* Divider line  */}
                    <div class="flex flex-1">
                        <div
                            className="h-auto min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
                        </div>
                    </div>

                    {/* Message box part  */}
                    <div className='w-3/4 overflow-y-auto mb-28'>
                        <div className="chat-container">
                            {messages.map((message, index) => (
                                <div key={index}>
                                    {res === message.userName ? (
                                        <div className='text-right mr-5 m-2'>
                                            <p className='text-sm p-1'>You</p>
                                            <div className='bg-blue-600 rounded-lg p-2 inline-block'>
                                                <p>{message.text}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='text-left ml-5 m-2'>
                                            <p className='text-sm first-letter:capitalize p-1'>{message.userName}</p>
                                            <div className='bg-gray-600 rounded-lg p-2 inline-block'>
                                                <p>{message.text}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Add an input field and send button for sending new messages */}
                            <div ref={lastMessageRef} />
                        </div>
                        <div className='fixed left-1/4 bottom-0 w-3/4 text-red-900'>
                            <div className='flex justify-around m-2 items-center'>
                                <div>
                                    <BsFillEmojiLaughingFill
                                        onClick={() => setShowPicker(!showPicker)}
                                        color='yellow' size={'2rem'}
                                    />
                                </div>
                                {/* <button onClick={() => setShowPicker(!showPicker)}>Emoji</button> */}
                                {showPicker && (
                                    <div className='flex'>
                                        <Picker onEmojiSelect={handleEmojiSelect} />
                                    </div>
                                )}
                                <input
                                    placeholder='Aa'
                                    className='w-full p-3 text-left bg-transparent border border-gray-800 text-gray-300 pl-5 ml-2 rounded-l-full focus:outline-none caret-white'
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { // Call the sendMessage function when Enter is pressed
                                            sendMessage();
                                        }
                                    }}
                                />
                                <button
                                    onClick={sendMessage}
                                    className='border border-gray-800 bg-blue-700 text-white cursor-pointer p-3 pl-6 pr-6 font-medium text-lg text-center rounded-r-full'
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox; 