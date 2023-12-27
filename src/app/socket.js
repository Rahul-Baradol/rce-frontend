import { io } from 'socket.io-client';

const URL = process.env.JUDGESOCKETURL;

export const socket = io(URL);