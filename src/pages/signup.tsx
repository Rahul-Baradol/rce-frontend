"use client"
require('dotenv').config({ path: ".env.local" })
import { Button, Input } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

require('dotenv').config({ path: ".env.local" })

const SignUp = () => {
  const [email, setValue] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirrm, setPassConfirm] = useState("");
  const [isPassVisible, setisPassVisible] = useState(false);
  const [isPassVisibleConfirm, setisPassVisibleConfirm] = useState(false);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [signingUp, setSigningUp] = useState(false);

  const [modalHeading, setModalHeading] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value)
  }

  const onChangePassConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassConfirm(e.target.value)
  }

  const toggleVisibility = () => setisPassVisible(!isPassVisible);
  const toggleVisibilityConfirm = () => setisPassVisibleConfirm(!isPassVisibleConfirm);

  const signUp = () => {
    setSigningUp(true);
    fetch(process.env.CREATE_PROFILE_API ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        pass: pass
      })
    }).then((res) => {
      setSigningUp(false);
      return res.json();
    }).then((data) => {
      if (data.status === "exist") {
        setModalHeading("Email already used!");
        setModalDesc("It turns out that the given email is already in use! Please use a different email!");
        onOpen();
      } else {
        setModalHeading("Let's go!");
        setModalDesc("Profile created successfully!");
        onOpen();
      }
      setSigningUp(false);
    }).catch((err) => {
      setModalHeading("Server Error");
      setModalDesc("Couldn't connect to the server. Please check your internet connection.");
      onOpen();
      setSigningUp(false);
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
        <div className='text-3xl underline'> Sign up </div>
        <div className='flex flex-col h-fit gap-5 inp'>
          <Input
            value={email}
            disabled={signingUp}
            type="email"
            label="Email"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            onValueChange={setValue}
            className='dark'
          />

          <Input
            label="Password"
            disabled={signingUp}
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

          <Input
            label="Confirm Password"
            disabled={signingUp}
            value={passConfirrm}
            onChange={onChangePassConfirm}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                {isPassVisibleConfirm ? (
                  <p className='text-gray-500 text-sm'>Hide</p>
                ) : (
                  <p className='text-gray-500 text-sm'>Show</p>
                )}
              </button>
            }
            type={isPassVisibleConfirm ? "text" : "password"}
            className='dark'
          />

          <Button isLoading={signingUp} onClick={signUp} disabled={isInvalid || (email.length === 0) || (pass.length === 0) || (passConfirrm.length === 0) || (pass !== passConfirrm)} className='h-[60px] disabled:opacity-50' color="primary" variant="ghost">  
            { !signingUp ? "Sign up" : "Creating Profile..." }
          </Button>  

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
      </div>
    </>
  )
}

export default SignUp