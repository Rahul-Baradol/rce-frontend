import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { socket } from '../socket';

require('dotenv').config({ path: '.env.local' });

const jsonwebtoken = require('jsonwebtoken');

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Socket connected...");
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Socket disconnected...");
    }

    function onSubmitCode(message: any) {
      console.log(message);
    }

    function onSubmissionStatus(result: any) {
      if (result.submissionStatus !== "NA") {
        console.log(result); 
      } else {
        setTimeout(() => {
          socket.emit('submissionStatus', result.submissionId);
        }, 700); 
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('submitCode', onSubmitCode);
    socket.on('submissionStatus', onSubmissionStatus);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('submitCode');
      socket.off('submissionStatus');
    };
  }, [])

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthToken(localStorage.getItem('auth') ?? "");
      setUser(jsonwebtoken.verify(localStorage.getItem('auth'), process.env.JWT_KEY) ?? "");
    } else {
      setUser("");
    }
  }, [authToken])

  return (
    <main className='h-screen w-screen'>
      <Navbar user={user} setAuthToken={setAuthToken} />
      <Component {...pageProps} setAuthToken={setAuthToken} isConnected={isConnected} />
    </main>
  )
}