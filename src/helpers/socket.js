import { io } from "socket.io-client";
import constants from '../constants'

var socket = io(`https://${constants.host}:3003`, {
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
export default socket;
