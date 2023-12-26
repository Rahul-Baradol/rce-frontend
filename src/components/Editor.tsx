import React, { useState } from 'react'
import { Button, Code, Textarea } from "@nextui-org/react";
import { useEffect } from 'react';
import { socket } from '../socket'

require('dotenv').config({ path: ".env.local" })

export default function Editor(props: any) {
    const [code, setCode] = useState("");
    const [verdict, setVerdict] = useState({
        color: "primary",
        message: "Submit the code to see the verdict!"
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    function submitCode() {
        try {
            const data = {
                jwt: localStorage.getItem('auth'),
                code: code
            }

            if (props.isConnected) {
                socket.emit('submitCode', JSON.stringify(data));        
            } else {
                console.log("Not connected to the socket server.");
            }
        } catch(error) {
            console.log("Couldn't send the message via socket.");
        }
    }

    return (
        <>
            <div className='flex flex-col items-center gap-10 '>
                <Textarea
                    label="Code"
                    className="w-[80vw] dark"
                    value={code}
                    onChange={handleOnChange}
                />
                
                <div className='w-[80vw] flex flex-row items-center justify-between'>
                    <Code color="primary"> {verdict.message} </Code>
                    <Button onClick={submitCode} color="success">
                        Submit
                    </Button>
                </div>
            </div>
        </>
    )
}