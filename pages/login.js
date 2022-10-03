import { Button } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import whatsapp from '../assets/whatsapp-logo.png'
import { auth, provider } from '../firebase'
import { signInWithPopup } from "firebase/auth";



 
const Login = () => {
  const signIn = () => {
    signInWithPopup(auth,provider).catch(alert)
  }


  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Image src={whatsapp} width={200} height={200} />
        <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -13px rgba(0,0,0,0.7);

`;

// const Logo = styled.img`
//   width: 200px;
//   height: 200px;
// `;
 