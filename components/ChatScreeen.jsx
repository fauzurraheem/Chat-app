import { Avatar, IconButton } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components';
import { auth, db } from '../firebase';
import MoreVertIcon from '@material-ui/icons/More';
import { AttachFile, Mic } from '@material-ui/icons';
import { InsertEmoticon } from '@material-ui/icons';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import Message from './Message.jsx'
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreeen = ({messages, chat}) => { 
  const endOfMessageRef = useRef(null)
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const router = useRouter();

  const ref = collection(db, "chats", router.query.id, "message");
  
  const [messageSnap] = useCollection(query(ref, orderBy("timestamp","asc")))

  const Ref = collection(db, "users");

  const [recipientSnap] = useCollection(query(Ref, where('email', '==', getRecipientEmail(chat.users, user))))


  const showMessages = () => {
    if(messageSnap){
      return messageSnap.docs.map(message => (
        <Message key={message.id} user={message.data().user} message={{...message.data(), timestamp:message.data().timestamp?.toDate().getTime()}} />

      )) 
    }else {
      return messages.map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behaviour:"smooth",
      block:"start",
    })
  }

  const sendMessage = async(e) => {
    e.preventDefault()
    //update last seen

    const cityRef = doc(db, 'users', user.uid);
    setDoc(cityRef, {
      lastSeen: serverTimestamp(),
    }, { merge: true });

    const ref = collection(db, "chats", router.query.id, "message");

    await addDoc(ref, {
      timestamp:serverTimestamp(),
      message:input,
      user:user.email,
      photoURL:user.photoURL
    })

    setInput('')
    scrollToBottom()




  }

  const recipient = recipientSnap?.docs?.[0]?.data()

  const recipientEmail = getRecipientEmail(chat.users, user)


  return (
    <Container>
      <Header>
      {recipient ? (<Avatar src={recipient?.photoURL} />) :
      (<Avatar>{recipientEmail[0]}</Avatar>)

      }

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnap ? (<p style={{marginTop:0}}>Last Active:{''}{recipient?.lastSeen?.toDate() ? <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> :  "unavailable"}</p>) : (
            <p style={{marginTop:0}}>Loading Last active</p>
          )}
        </HeaderInformation>
        <HeaderIcon>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>

        </HeaderIcon>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfmessage  ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)}/>
        <button hidden disabled={!input} type='submit' onClick={sendMessage}>Send Message</button>
        <Mic />
      </InputContainer>
    </Container>
  )
}

export default ChatScreeen

const Container = styled.div``;

const Header = styled.div`
  position: static;
  background-color: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;

`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color:gray;
  }

`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
  padding: 15px;
  background-color: #e5ded8;
  min-height: 90vh;
`;


const EndOfmessage = styled.div`
  margin-bottom: 50px;

`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index:100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  `;




