import React, { useState } from 'react'
import { Button, Code, Textarea } from "@nextui-org/react";

export default function Editor() {
    const [code, setCode] = useState("");
    const [verdict, setVerdict] = useState({
        color: "primary",
        message: "Submit the code to see the verdict!"
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
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
                    <Button onClick={() => {
                        fetch("https://decise.vercel.app/api/evaluate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                code: code
                            })
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {
                            setVerdict({
                                color: data.color,
                                message: data.message
                            })
                        })
                    }} color="success">
                        Submit
                    
                    </Button>
                </div>
            </div>
        </>
    )
}