import React, { useState } from 'react'
import { Button, Textarea } from "@nextui-org/react";

export default function Editor() {
    const [code, setCode] = useState("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    return (
        <>
            <Textarea
                label="Code"
                className="mx-auto w-[80vw] dark"
                value={code}
                onChange={handleOnChange}
            />

            <Button color="success">
                Submit
            </Button>
        </>
    )
}