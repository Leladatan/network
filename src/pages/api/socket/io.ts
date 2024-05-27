// import {NextApiRequest} from "next";
// import {Server} from "socket.io";
//
// const ioHandler = (req: NextApiRequest, res: any): void => {
//   const io = new Server(res.socket.server);
//   res.socket.server.io = io;
//
//   io.on("connection", (socket): void => {
//     console.log("connect");
//     socket.on("send-messages", (obj): void => {
//       io.emit("receive-messages", obj);
//     });
//   });
//
//   res.end();
// };
//
// export default ioHandler;

import {Server as NetServer} from "http";
import {NextApiRequest} from "next";
import {Server as ServerIO} from "socket.io";
import {NextApiResponseServerIO} from "@/types/socket";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO): void => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    res.socket.server.io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
  }

  res.end();
};

export default ioHandler;