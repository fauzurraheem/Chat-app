import React from 'react'
import styled from 'styled-components'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import moment from 'moment'


const Message = ({message, user}) => {
  const [userloggedIn] = useAuthState(auth)

  const TypeMessage = user === userloggedIn.email ? Sender : Reciever
  console.log(message.timestamp)

  return (
    <Container>
        <TypeMessage>{message.message}</TypeMessage>
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '....'}
        </Timestamp>
    </Container>
  )
}

export default Message

const Container = styled.div`
  position: relative;
`;

const MessageE = styled.p`
  width: fit-content;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
  font-size: 15px;
`;

const Sender = styled(MessageE)`
  margin-left: auto;
  background-color: #dcf8ce;
`;
const Reciever = styled(MessageE)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color:gray;
  /* padding: 10px; */
  font-size: 9px;
  position: absolute;
  bottom:0;
  text-align: right;
  right: 0; 
  padding-right: 20px;
  
`;