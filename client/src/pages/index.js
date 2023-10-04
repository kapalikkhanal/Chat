import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Login from './login';

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
    <div>
      <Login />
    </div>
  )
}

export default Home;
