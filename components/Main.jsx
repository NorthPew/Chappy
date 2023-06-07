import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainBody = styled.main`
    height: 100%;
    width: calc(100% - 54px);
    float: left;
    display: grid;
`

const Main = () => (
    <MainBody>
        <Outlet />
    </MainBody>
)

export default Main