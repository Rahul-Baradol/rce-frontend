import { Button, Input } from '@nextui-org/react';
import React, { useMemo, useState } from 'react'

const Login = () => {
  const [email, setValue] = useState("");
  const [pass, setPass] = useState("");

  const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value)
  }

  const [isPassVisible, setisPassVisible] = useState(false);

  const toggleVisibility = () => setisPassVisible(!isPassVisible);

  return (
    <>
      <style>
        {`
          .inp {
            width: min(90vw, 450px);
          }
        `}
      </style>
      <div className='mx-auto flex flex-col items-center p-5 w-[90vw] h-[85vh] gap-8'>
        <div className='text-3xl underline'> Login </div>
        <div className='flex flex-col h-fit gap-5 inp'>
          <Input
            value={email}
            type="email"
            label="Email"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            onValueChange={setValue}
            className='dark'
          />

          <Input
            label="Password"
            value={pass}
            onChange={onChangePass}
            placeholder="Enter a password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isPassVisible ? (
                  <p className='text-gray-500 text-sm'>Hide</p>
                ) : (
                  <p className='text-gray-500 text-sm'>Show</p>
                )}
              </button>
            }
            type={isPassVisible ? "text" : "password"}
            className='dark'
          />

          <Button disabled={isInvalid || (email.length === 0) || (pass.length === 0)} className='h-[60px] disabled:opacity-50' color="primary" variant="ghost">  
            Login
          </Button>  
        </div>
      </div>
    </>
  )
}

export default Login