import { useEffect, useState } from "react";
import { getSocketIo } from "../../socketio";
import { Items } from "../items";


export const Home = (props) => {
    const [clothing, setClothing] = useState([]);
    useEffect(() => {
        getSocketIo().emit('get_clothing', "hey server are you getting this?");
        getSocketIo().on('send_clothing', setClothing);
    }, [])
  
    return (
    <>
      <Items clothing = {clothing}/>
    </>
  );
};