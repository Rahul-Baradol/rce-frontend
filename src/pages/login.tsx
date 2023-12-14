require('dotenv').config({ path: ".env.local" })

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'

const Login = (props: any) => {
  const [email, setValue] = useState("");
  const [pass, setPass] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalHeading, setModalHeading] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  const router = useRouter();

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push(process.env.HOME_URL ?? "");
    }
  }, [router])

  const login = (e: any) => {
    e.preventDefault();
    setLoggingIn(true);

    fetch("http://localhost:3000/api/sample").then(d => d.json()).then(res => {
      console.log(res);
    })

    fetch(process.env.LOGIN_API ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        pass: pass
      })
    }).then((res) => res.json())
    .then((data) => {
      setLoggingIn(false);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        props.setToken(data.token);
        router.push(process.env.HOME_URL ?? "");
      } else {
        setModalHeading("Invalid Credentials");
        setModalDesc("Couldn't log in due to invalid credentials.")
        onOpen();
      }
    }).catch((err) => {
      setLoggingIn(false);
      console.log(err);
      setModalHeading("Server Error");
      setModalDesc("Couldn't connect to the server. Please check your internet connection.")
      onOpen();
    })
  }

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
        <form onSubmit={login} className='flex flex-col h-fit gap-5 inp'>
          <Input
            disabled={loggingIn}
            value={email}
            type="email"
            label="Email"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            onValueChange={setValue}
            className='dark'
          />

          <Input
            autoComplete='on'
            disabled={loggingIn}
            label="Password"
            value={pass}
            onChange={onChangePass}
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

          <Button type='submit' isLoading={loggingIn} disabled={isInvalid || (email.length === 0) || (pass.length === 0)} className='h-[60px] disabled:opacity-50' color="primary" variant="ghost">  
            Login
          </Button>  
        </form>

        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{modalHeading}</ModalHeader>
                <ModalBody>
                  <p> 
                    {modalDesc}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default Login