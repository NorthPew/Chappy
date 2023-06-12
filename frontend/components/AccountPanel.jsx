import { UserContext } from "../ContextRoot"
import { useContext } from "react";
import styled from "styled-components";

const Panel = styled.div`
    width: 10vw;
    height: 54px;
    background-color: #1e2124;
    position: absolute;
    bottom: 0px;

`

function AccountPanel() {
    const {saveUserName} = useContext(UserContext);
    return (
        <>
            <Panel>{saveUserName}</Panel>
        </>
    )
}

export default AccountPanel