import { useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import styled from "styled-components";

import ice from "../images/background.jpg"


const BackgroundBox = styled.div`
    background-image: url('${ice}');
    width: 100%;
    display: grid;
    place-content: center;
`

const Container = styled.div`
    border-radius: 6.5px;
    background-color: #282b30;
    width: 520px;
    height: 420px;
`

function UserStart() {

    return (
        <></>
    )
}

function LoginOrRegister() {
    return (
        <BackgroundBox>
            <Container>
                <form>
                    <h1>Registera</h1>
                    <label htmlFor="inputUserName">Användarnamn</label>
                    <input type="text" id="inputUserName"></input>
                    <label htmlFor="inputUserPassword">Lösenord</label>
                    <input type="password" id="inputUserPassword"></input>
                    <button type="submit">Registera konto</button>
                </form>
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