import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainBody = styled.main`
    height: calc(100% - 36px);
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