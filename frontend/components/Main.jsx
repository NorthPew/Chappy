import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainBody = styled.main`
    height: calc(100% - 36px);
    width: 97vw;
    float: left;
    display: grid;
`

const Main = () => (
    <MainBody>
        <Outlet />
    </MainBody>
)

export default Main