import React from 'react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socket } from '../other/socket';
import { setIsConnected } from '../features/judgeSocketConnectionSlice'

require('dotenv').config({ path: '.env.local' });

function Problem() {
   const dispatch = useDispatch();

   useEffect(() => {
      function onConnect() {
         dispatch(setIsConnected(true))
         console.log("Socket connected...");
      }

      function onDisconnect() {
         dispatch(setIsConnected(false))
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
   }, [dispatch])

   return (
      <></>
   )
}

export default Problem;