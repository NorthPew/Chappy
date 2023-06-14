import { UserContext } from "../ContextRoot"
import { useContext, useState } from "react";
import styled from "styled-components";
import deleteUser from "../data/deleteUser";
import { editUser } from "../data/editUser";

const Panel = styled.div`
    width: calc(10vw - 15px);
    height: 51px;
    background-color: #1e2124;
    position: absolute;
    bottom: 0px;
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 15px;
`

const UserName = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin: 0px;
    padding: 0px;
`

const PanelButton = styled.button`
    border-radius: 6.5px;
    background-color: #424549;
    cursor: pointer;
    border: none;
    padding: 1.25em;
    font-size: 4px;
`

const ButtonBox = styled.div`
    display: flex;
    flex-flow: row wrap;
    column-gap: 15px;
`

function AccountPanel() {
    const {saveUserName, saveUserId, localStorageUserKey, sessionStorageKey, setIsLoggedIn, setSaveUserId, setSaveUserName, isLoggedIn} = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function onClickSignOut() {
        localStorage.removeItem(localStorageUserKey)
        sessionStorage.removeItem(sessionStorageKey)

        setSaveUserId("")
        setSaveUserName("")

        setIsLoggedIn(false)

        console.log('Du är utloggad!');
    }

    function onClickDeleteAccount() {
        localStorage.removeItem(localStorageUserKey)
        sessionStorage.removeItem(sessionStorageKey)

        deleteUser(saveUserId)

        setSaveUserId("")
        setSaveUserName("")

        setIsLoggedIn(false)

        console.log('Kontot borttaget!');
    }

    
    function onClickEditAccount() {
        // Set useState and add a modal
    }

    async function onSubmitEditAccount() {
        localStorage.removeItem(localStorageUserKey)
        sessionStorage.removeItem(sessionStorageKey)

        if (userName !== "" && userPassword !== "") {
            const editStatus = await editUser({saveUserId, username: userName, password: userPassword})

            if(editStatus.edited === "Success") {
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
            }
        }

    }

    return (
        <>
            <Panel>
                {
                    isLoggedIn ? 
                    <>
                        <UserName title={`#${saveUserId}`}>{saveUserName}</UserName>
                    <ButtonBox>
                        <PanelButton title="Log out" onClick={() => onClickSignOut()}>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </PanelButton>
                        <PanelButton title="Delete account" onClick={() => onClickDeleteAccount()}>
                            <span className="material-symbols-outlined">
                                 delete
                            </span>
                        </PanelButton>
                        <PanelButton title="Edit account" onClick={() => onClickEditAccount()}>
                            <span className="material-symbols-outlined">
                                 edit
                            </span>
                        </PanelButton>
                    </ButtonBox>
                    </> : 
                    <UserName>Read mode</UserName>
                }
            </Panel>
        </>
    )
}

export default AccountPanel