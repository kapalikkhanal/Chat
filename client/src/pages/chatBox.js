import React, { useEffect, useState, useRef } from 'react';
import socketIO from 'socket.io-client';
import SearchBox from './components/searchBox';
import Picker from '@emoji-mart/react';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom'
import { Button } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuDivider } from '@chakra-ui/react'
import { logout } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/router'

const socket = socketIO.connect('http://localhost:3001');
const ChatBox = () => {
    const { userDetails } = useSelector(state => state.user)
    // console.log("userDetails", userDetails)
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.user)

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


    let res = userDetails.userName;
    // console.log("userDetails Res", res)
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

    if (!isLoggedIn) {
        router.push('/')
    }

    return (
        <div className='bg-gray-900 text-white h-screen'>

            {/* Navbar */}
            <div className='h-[15%] flex items-center justify-between'>
                <h1 className='text-2xl text-center font-semibold p-4'>CHAT Application</h1>
                <div className='mr-10'>
                    <Menu width={'0px'} height={'50px'}>
                        <MenuButton
                            transition='all 0.1s'
                            borderRadius='full'
                            borderWidth='none'
                        >
                            <div className='flex justify-between space-x-5 ml-10'>
                                <div className='text-white flex items-center'>Hi, {res}</div>
                                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500">
                                    <svg className="absolute w-10 h-10 text-gray-400 -left-1" focusable="flase" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                </div>
                            </div>
                        </MenuButton>
                        <MenuList bgColor={'gray.900'}>
                            <div className='flex flex-col justify-center '>
                                <button onClick={() => router.push('/accountDetails')} className='bg-gray-900 hover:bg-gray-800 p-2'>My Account</button>
                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        router.push('/');
                                    }}
                                    className='bg-gray-900 hover:bg-gray-800 p-2'
                                >
                                    Logout
                                </button>

                            </div>
                        </MenuList>
                    </Menu>
                </div>
            </div>

            {/* Chat container  */}
            <div className='flex h-[75%]'>
                {/* Search box  */}
                <div className='w-1/4'>
                    <h1 className='text-center text-2xl font-bold p-2'>Peoples</h1>
                    <SearchBox />
                </div>

                {/* Divider line  */}
                <div className="flex flex-1">
                    <div
                        className="h-auto min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
                    </div>
                </div>

                {/* Message box part  */}
                <ScrollToBottom className='w-3/4 overflow-y-scroll scrollbar-thin rounded-lg'>
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
                </ScrollToBottom>
            </div>

            {/* Add an input field and send button for sending new messages */}
            <div className='fixed left-1/4 bottom-0 w-3/4'>
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
    );
};

export default ChatBox; 