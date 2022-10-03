import { async } from '@firebase/util'
import { collection, doc, getDoc, getDocs, orderBy } from 'firebase/firestore'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import ChatScreeen from '../../components/ChatScreeen'
import Sidebar from '../../components/Sidebar'
import { db } from '../../firebase'




export async function getServerSideProps(context){
  const ref = doc(db, "chats",context.query.id,);

  const colRef = collection(ref, "message")

 
  //prep messages on server
  const docSnap = await getDocs(colRef, orderBy("timestamp", 'asc'));

  const messages = docSnap.docs.map((doc) => ({
    id:doc.id,
    ...doc.data(),
  })).map(messages => ({
    ...messages,
    timestamp:messages.timestamp.toDate().getTime()
  }));

  const chatref = await getDoc(ref);


  
  const chat = {
    id:chatref.id,
    ...chatref.data(),
  }
  
  

  return {
    props: {
      messages: messages,
      chat:chat
    }
  }
}










const ChatBox = ({messages, chat}) => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreeen chat={chat}  messages={messages}/>
      </ChatContainer>
    </Container>
  )
}

export default ChatBox



const Container = styled.div`
  display:flex;


`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

