import messageDaoFirebase from './Message/messageDaoFirebase.js'

import authDaofirebase from "./Auth/authDaofirebase.js"

let messageDao = null;
let AuthDao = null;

const type = process.env.PERS || "fs";

switch (type) {
  case "fs":
    messageDao = messageDaoFirebase.getInstance();
    AuthDao = authDaofirebase.getInstance();

    break;
}

export { messageDao,AuthDao };