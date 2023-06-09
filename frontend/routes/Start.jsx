import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextRoot";
import styled from "styled-components";


import loginUser from "../data/loginUser";
import authorize from "../data/authorize";

// Login or Register
import ice from "../images/background.jpg"

const BackgroundBox = styled.div`
    background-image: url('${ice}');
    width: 100%;
    display: grid;
    place-content: center;
`

const Container = styled.div`
    border-radius: 7.5px;
    background-color:#36393e;
    width: 520px;
    height: 380px;
`

const Form = styled.form`
    display: grid;
    justify-content: center;
    row-gap: 7.5px;
`

const FormText = styled.h1`
    text-align: center;
`

const FormInput = styled.input`
    border-radius: 7.5px;
    background-color:#424549;
    padding: .5em .75em;
    border: none;
`

const FormLabel = styled.label`
    cursor: pointer;
`

const FormBtn = styled.button`
    border-radius: 7.5px;
    border: none;
    background-color: #099915;
    padding: .5em .75em;
    font-weight: 600;
    cursor: pointer;
`

const FakeLink = styled.p`
    cursor: pointer;
    color: #7289da;
    font-weight: 600;
`

// Start

const Wrapper = styled.div`
    width: inherit;
    height: inherit;
`

function UserStart() {

    return (
        <Wrapper>
            {
                // Here will there be a list of all friends/users
            }
        </Wrapper>
    )
}

function LoginOrRegister() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [register, setRegister] = useState(false)
    const {setIsLoggedIn, sessionStorageKey} = useContext(UserContext);



    async function onLogInSubmit(event) {
        event.preventDefault()

        const loginStatus = await loginUser({username: userName, password: userPassword}) 

        console.log(loginStatus.loggedIn);

        if (loginStatus.loggedIn == "Success" ) {

            let jwt = loginStatus.token
            sessionStorage.setItem(sessionStorageKey, 'Bearer: ' + jwt)

            let check = authorize(sessionStorage.getItem(sessionStorageKey))

            console.log(check);

            if (check.tokenMessage = "Du är autentiserad") {

                setIsLoggedIn(true)

                return
            }


        } else {
            console.log('Gick inte att logga in!');
        }


    }

    function onRegisterSubmit(event) {
        event.preventDefault()
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value)
    }

    return (
        <BackgroundBox>
            <Container>
                {
                    register ? 
                    <Form onSubmit={onLogInSubmit}>
                        <FormText>Logga In</FormText>
                        <FormLabel htmlFor="inputUserName">Användarnamn</FormLabel>
                        <FormInput value={userName} onChange={handleUserNameChange} type="text" id="inputUserName"></FormInput>
                        <FormLabel htmlFor="inputUserPassword">Lösenord</FormLabel>
                        <FormInput value={userPassword} onChange={handleUserPasswordChange} type="password" id="inputUserPassword"></FormInput>
                        <FormBtn type="submit">Logga In</FormBtn>
                        <div><p>En ny användare?</p><FakeLink onClick={() => setRegister(!register)} >Registera mig!</FakeLink></div>
                 </Form> : 
                 <Form onSubmit={onRegisterSubmit}>
                    <FormText>Registera</FormText>
                    <FormLabel htmlFor="inputUserName">Användarnamn</FormLabel>
                    <FormInput value={userName} onChange={handleUserNameChange} type="text" id="inputUserName"></FormInput>
                    <FormLabel htmlFor="inputUserPassword">Lösenord</FormLabel>
                    <FormInput value={userPassword} onChange={handleUserPasswordChange} type="password" id="inputUserPassword"></FormInput>
                    <FormBtn type="submit">Registera Konto</FormBtn>
                    <div><p>Inte en ny användare?</p><FakeLink onClick={() => setRegister(!register)} >Logga in mig!</FakeLink></div>
                </Form>
                }
                

            </Container>
        </BackgroundBox>
    )
}

function Start() {
    const {isLoggedIn} = useContext(UserContext);
    return (
        <>
            {isLoggedIn ? <UserStart /> : <LoginOrRegister />}
        </>
    )
}

export default Start