import Main from "../components/Main"
import Header from "../components/Header"
import SideHeader, { loader } from "../components/SideHeader"

const Root = () => (
    <>
        <Header />
        <SideHeader loader={loader} />
        <Main />
    </>
)

export default Root