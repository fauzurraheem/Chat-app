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
    <TypeMessage>
        <Container>{message.message}</Container>
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '....'}
        </Timestamp>
    </TypeMessage>
  )
}

export default Message

const Container = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
`;

const MessageE = styled.p`
  width: fit-content;
  padding: 6px 12px;
  border-radius: 8px;
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
  font-size: 9px;
  text-align: right;
`;