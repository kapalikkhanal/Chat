import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("userName", inputValue);
    } else {
      // Handle the case where localStorage is not available
      console.error("localStorage is not available.");
    }

    setInputValue('');
    router.push('/chatBox')
  };

  let res = '';
  if (typeof localStorage !== 'undefined') {
    res = localStorage.getItem("userName");
  }

  return (
    <div className='bg-gray-500 flex justify-center w-full h-screen items-center'>
      <div className='flex justify-center flex-col items-center space-y-2'>
        <div>
          <Input
            placeholder='Enter your username...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={handleSend}
            className='cursor-pointer'
          >
            Send
          </Button>
        </div>
      </div>
    </div >
  )
}

export default Home;
