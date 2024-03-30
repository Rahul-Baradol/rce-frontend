"use client"
import { Button, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useEffect, useMemo, useState } from "react"
import establishSocketConnection from '@/other/socket';
import { Socket } from "socket.io-client";

require('dotenv').config({ path: ".env.local" });

export default function EditorSection(props: any) {
  const [code, setCode] = useState("#include <iostream>\n\nusing namespace std;\n\nint main() {\n\n\treturn 0;\n}");
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketIsConnected, setSocketIsConnected] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["C++"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const languageExtensionMap = new Map<any, any>([
    ["C++", "cpp"],
    ["Java", "java"],
    ["JavaScript", "js"],
    ["Python", "py"],
    ["Go", "go"]
  ])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setSocketIsConnected(true);
        console.log("Socket connected...");
      });

      socket.on('disconnect', () => {
        setSocketIsConnected(false);
        console.log("Socket disconnected...");
      });

      socket.on('submitCode', (message: any) => {
        console.log(message);
      });

      socket.on('submissionStatus', (result: any) => {
        if (result.submissionStatus !== "NA") {
          setSubmitIsLoading(false);

          if (props.tab !== "submissions") {
            props.setTab("submissions");
          } else {
            console.log("comedy");
            props.setRefreshSubmisisonsFlag((ele: number) => !ele);
          }
        } else {
          setTimeout(() => {
            socket?.emit('submissionStatus', result.submissionId);
          }, 700);
        }
      });

      socket.on('health', (message: any) => {
        console.log(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    setSocket(establishSocketConnection());
  }, []);

  function submitCode() {
    const langSelected = languageExtensionMap.get(Array.from(selectedKeys)[0]);
    
    try {
      const data = {
        jwt: localStorage.getItem('auth'),
        lang: langSelected,
        code: code,
        problemTitle: props.problemTitle
      }

      if (socket) {
        if (socketIsConnected) {
          setSubmitIsLoading(true);
          socket?.emit('submitCode', JSON.stringify(data));
        } else {
          console.log("Socket not connected to the server");
        }
      } else {
        console.log("Socket instance not available");
      }
    } catch (error) {
      console.log("Couldn't send the message via socket.");
    }
  }

  return (
    <div className='w-[98vw] px-1 sm:px-2 mt-2 md:mt-1 mx-auto lg:w-[49vw] h-fit flex flex-col gap-3 items-start justify-between'>
      <div className="pl-1">
        <Dropdown className={`dark`}>
          <DropdownTrigger className={`dark`}>
            <Button variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection of programming languages"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="C++">C++</DropdownItem>
            <DropdownItem key="Java">Java</DropdownItem>
            <DropdownItem key="Python">Python</DropdownItem>
            <DropdownItem key="JavaScript">JavaScript</DropdownItem>
            <DropdownItem key="Go">Go</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <textarea
        value={code}
        onChange={ele => { setCode(ele.target.value) }}
        className='p-4 h-[68vh] w-full resize-none rounded-lg'
        style={{
          backgroundColor: "#18181b",
          outline: "none"
        }}>
      </textarea>

      <div className={`dark rounded-lg px-5 py-3 w-full h-fit flex flex-row-reverse items-center`} style={{
        backgroundColor: "#18181b",
      }}>
        <Button className={`h-11`} isLoading={submitIsLoading} onClick={submitCode} color="success" variant="ghost">
          {submitIsLoading ? "Running..." : "Submit"}
        </Button>
      </div>
    </div>
  )
}