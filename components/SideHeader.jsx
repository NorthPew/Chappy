import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../src/ContextRoot"
import { useContext } from "react";


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

// Include a map function to display buttons for all DMs!

const SideHeader = () => {
    const {isLoggedIn, setIsOnGroup} = useContext(UserContext);

    return (
        <NavBody>
            <NavLinkBtn onClick={() => setIsOnGroup(false)} to="/" title="Start">
                <span className="material-symbols-outlined">
                        chat
                </span> 
            </NavLinkBtn>
            {
                isLoggedIn && (
                    <>
                        <NavLinkBtn>
                            Testperson
                        </NavLinkBtn>
                        <HorizontalLine />
                    </>
                )
            }
            <NavLinkBtn onClick={() => setIsOnGroup(true)} to="/chappy" title="Chappy | Lättåtkomliga gruppchatten">
                <span className="material-symbols-outlined">
                    public
                </span>
            </NavLinkBtn>
        </NavBody>
    )
}


export default SideHeader