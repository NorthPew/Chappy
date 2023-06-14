import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextRoot";
import styled from "styled-components";
import ChannelsOrFriends from "../components/ChannelsOrFriends"

import loginUser from "../data/loginUser";
import authorize from "../data/authorize";

// Login or Register
import ice from "../images/background.jpg"
import registerUser from "../data/registerUser";

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
            <ChannelsOrFriends />
        </Wrapper>
    )
}

function LoginOrRegister() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [register, setRegister] = useState(false)
    const {setIsLoggedIn, sessionStorageKey, localStorageUserKey, setSaveUserName, setSaveUserId} = useContext(UserContext);



    async function onLogInSubmit(event) {
        event.preventDefault()

        if (userName !== "" && userPassword !== "") {
            const loginStatus = await loginUser({username: userName, password: userPassword}) 

            console.log(loginStatus.loggedIn);
    
            if (loginStatus.loggedIn == "Success" ) {
    
                let jwt = loginStatus.token
                sessionStorage.setItem(sessionStorageKey, 'Bearer: ' + jwt)
    
                let check = await authorize(sessionStorage.getItem(localStorageUserKey))
    
                console.log(check);
    
                if (check.tokenMessage = "Du är autentiserad") {
    
                    setIsLoggedIn(true)

                    if(!localStorage.getItem(localStorageUserKey)) {
                        let userObject = {
                            username: loginStatus.username,
                            id: loginStatus.id
                        }
                        
                        let userString = JSON.stringify(userObject)

                        localStorage.setItem(localStorageUserKey, userString)
                        
                        return
                    }
                        
                    setSaveUserName(userName)
                    setSaveUserId(loginStatus.id)
    
                    return
                }
    
    
            } else {
                console.log('Gick inte att logga in!');
            }
        } else {
            console.log('Dessa fält får inte lämnas tomt!');
        }



    }

    async function onRegisterSubmit(event) {
        event.preventDefault()

        if (userName !== "" && userPassword !== "") {
            const registerStatus = await registerUser({username: userName, password: userPassword}) 

            console.log(registerStatus.registered);
    
            if (registerStatus.registered == "Success" ) {
    
                let jwt = registerStatus.token
                sessionStorage.setItem(sessionStorageKey, 'Bearer: ' + jwt)
    
                let check = await authorize(sessionStorage.getItem(localStorageUserKey))
    
                console.log(check);
    
                if (check.tokenMessage = "Du är autentiserad") {
    
                    setIsLoggedIn(true)

                    if(!localStorage.getItem(localStorageUserKey)) {
                        let userObject = {
                            username: registerStatus.username,
                            id: registerStatus.id
                        }
                        
                        let userString = JSON.stringify(userObject)

                        localStorage.setItem(localStorageUserKey, userString)
                        
                        return
                    }
                        
                    setSaveUserName(userName)
                    setSaveUserId(registerStatus.id)
    
                    return
                }
            } else {
                console.log('Gick inte att logga in!');
            }
        } else {
            console.log('Dessa fält får inte lämnas tomt!');
        }
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
    const {isLoggedIn, setIsOnGroup} = useContext(UserContext);

    setIsOnGroup(false)
    return (
        <>
            {isLoggedIn ? <UserStart /> : <LoginOrRegister />}
        </>
    )
}

export default Start