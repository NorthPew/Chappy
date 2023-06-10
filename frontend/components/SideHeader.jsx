import { NavLink, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../ContextRoot"
import { useContext } from "react";
import AccountPanel from "./AccountPanel";

import loader from "../routes/GroupView"

const NavBody = styled.nav`
    display: flex;
    width: 54px;
    height: calc(100% - 51px);
    float: left;
    background-color: #1e2124;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column wrap;
    row-gap: 7.5px;
`

const NavLinkBtn = styled(NavLink)`
    width: 50px;
    height: 50px;
    background-color: #424549;
    border-radius: 15px;
    display: grid;
    place-content: center;
    color: #f1f1f1;
    text-decoration: none;

    &.active {
        background-color: #7289da;
    }

    &:hover {
        background-color: #7289da;
    }
`

const HorizontalLine = styled.div`
    width: 32px;
    background-color: #424549;
    height: 2px;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    border-radius: 7.5px;
`

const SideHeader = () => {
    const {setIsOnGroup} = useContext(UserContext);

    const groupData = useLoaderData();

    console.log(groupData);
    return (
        <>
            <NavBody>
                <NavLinkBtn onClick={() => setIsOnGroup(false)} to="/" title="Start">
                    <span className="material-symbols-outlined">
                            chat
                    </span> 
                </NavLinkBtn>
                <HorizontalLine />
                {
                    groupData.map((group) => (
                        <NavLinkBtn to={`/${group.name}`} title={group.title}>
                            <span className="material-symbols-outlined">
                                {group.icon}
                            </span> 
                        </NavLinkBtn>
                    ))
                }

        </NavBody>
        <AccountPanel />
        </>

    )
}


export default SideHeader