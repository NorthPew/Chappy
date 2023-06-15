import { UserContext } from "../ContextRoot"
import { useContext, useState } from "react";
import styled from "styled-components";
import deleteUser from "../data/deleteUser";
import { editUser } from "../data/editUser";
import loginUser from "../data/loginUser";
import authorize from "../data/authorize";

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

const EditAccountPanel = styled.div`
    width: calc(10vw - 20px);
    height: calc(100vh);
    background-color: #282b30;
    float: left;
    position: absolute;
    padding-left: 10px;
    padding-right: 10px;
    color: #666a70;
`

const EditAccountInput = styled.input`
    border-radius: 7.5px;
    background-color: #424549;
    width: 8vw;
    border: none;
    padding: .85em .75em;
    outline: none;
`

const EditAccountButton = styled.button`
    border-radius: 6.5px;
    background-color: #424549;
    cursor: pointer;
    border: none;
    padding: .25em;
    font-size: 16px;
`

const EditAccountLabel = styled.label`
    cursor: pointer;
`

const PanelTitleBox = styled.div`
    border-bottom: 2.5px solid #1e2124;
`

const PanelTitle = styled.h1`
    font-size: 22px;
    font-weight: 600;
`

const Form = styled.form`
    display: grid;
    row-gap: 10px;
`

function AccountPanel() {
    const {saveUserName, saveUserId, localStorageUserKey, sessionStorageKey, setIsLoggedIn, setSaveUserId, setSaveUserName, isLoggedIn} = useContext(UserContext);

    const [editAccountModal, setEditAccountModal] = useState(false)

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

    async function onSubmitEditAccount(e) {
        e.preventDefault()

        localStorage.removeItem(localStorageUserKey)
        sessionStorage.removeItem(sessionStorageKey)

        if (userName !== "" && userPassword !== "") {
            const editStatus = await editUser(saveUserId, { username: userName, password: userPassword})

            if(editStatus.edited === "Success") {
                const loginStatus = await loginUser({username: userName, password: userPassword}) 

                console.log(loginStatus.loggedIn);
        
                if (loginStatus.loggedIn == "Success" ) {
        
                    let jwt = loginStatus.token
                    sessionStorage.setItem(sessionStorageKey, 'Bearer: ' + jwt)
        
                    let check = await authorize(sessionStorage.getItem(sessionStorageKey))
        
                    console.log(check);
        
                    if (check.tokenMessage = "Du är autentiserad") {
        
                        setIsLoggedIn(true)
                        setEditAccountModal(false)
    
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
                        setUserName("")
                        setUserPassword("")

                        return
                    }
                } else {
                    console.log('Gick inte att logga in!');
                }
            }
        }
    }

    
    function onChangeUserNameInput(e) {
        setUserName(e.target.value)
    }

    function onChangeUserPasswordInput(e) {
        setUserPassword(e.target.value)
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
                        <PanelButton title="Edit account" onClick={() => setEditAccountModal(!editAccountModal)}>
                            <span className="material-symbols-outlined">
                                 edit
                            </span>
                        </PanelButton>
                    </ButtonBox>
                    </> : 
                    <UserName>Read mode</UserName>
                }
            </Panel>
            {
                editAccountModal && (
                    <EditAccountPanel>
                        <PanelTitleBox>
                            <PanelTitle>
                                Edit Account
                            </PanelTitle>
                        </PanelTitleBox>
                        <Form onSubmit={onSubmitEditAccount}>
                            <EditAccountLabel htmlFor="userNameInput">Username:</EditAccountLabel>
                            <EditAccountInput id="userNameInput" type="text" placeholder={saveUserName} value={userName} onChange={onChangeUserNameInput}/>

                            <EditAccountLabel htmlFor="userPasswordInput">Password:</EditAccountLabel>
                            <EditAccountInput id="userPasswordInput" type="text" value={userPassword} onChange={onChangeUserPasswordInput}/>

                            <ButtonBox>
                                <EditAccountButton type="submit">Finish</EditAccountButton>
                                <EditAccountButton onClick={() => setEditAccountModal(!editAccountModal)}>Cancel</EditAccountButton>
                            </ButtonBox>

                        </Form>
                    </EditAccountPanel>
                )
            }
        </>
    )
}

export default AccountPanel