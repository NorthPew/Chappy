import { UserContext } from "../ContextRoot"
import { useContext } from "react";
import styled from "styled-components";

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
    const {saveUserName, saveUserId} = useContext(UserContext);
    return (
        <>
            <Panel>
                <UserName title={`#${saveUserId}`}>{saveUserName}</UserName>
                <ButtonBox>
                    <PanelButton title="Log out">
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                    </PanelButton>
                    <PanelButton title="Delete account">
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </PanelButton>
                    </ButtonBox>
            </Panel>
        </>
    )
}

export default AccountPanel