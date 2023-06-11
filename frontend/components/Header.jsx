import { NavLink } from "react-router-dom"
import styled from "styled-components"


const NavPlaceholder = styled.header`
    width: 100%;
    height: 36px;
    float: left;
`

const NavBody = styled.nav`
    display: grid;
    width: calc(100% - 15px);
    height: inherit;
    top: 0;
    left: 0;
    background-color: #1e2124;
    justify-content: start;
    padding-left: 7.5px;
    padding-right: 7.5px;
`

const NavLogoBox = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    height: inherit;
`

const NavLogo = styled(NavLink)`
    font-size: 24px;
	text-decoration: none;
	height: inherit;
	display: grid;
	align-items: center;
    color: #f1f1f1;
`

const NavLogoText = styled.h1`
    font-weight: 800;
    font-size: 22px;
    height: inherit;
    margin: 0px;
    padding: 0px;
`


const Header = () => (
    <NavPlaceholder>
        <NavBody>
            <NavLogoBox>   
                <NavLogo>
                    <span className="material-symbols-outlined">
                        chat
                    </span>
                </NavLogo>
                <NavLogoText>
                    Chappy
                </NavLogoText>
            </NavLogoBox>
        </NavBody>
    </NavPlaceholder>
)

export default Header