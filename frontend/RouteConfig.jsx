import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "./routes/Root";


// Loader
import {loader as groupsLoader}  from "./components/SideHeader";
import GroupChannelView, {loader as channelsLoader} from "./routes/GroupChannelView";


import Start from "./routes/Start";
import GroupView from "./routes/GroupView";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: groupsLoader,
        children: [
            {
                path: '',
                element: <Start />
            },
            {
                path: '/group/:name',
                element: <GroupView />,
                loader: groupsLoader,
            },
            {
                path: '/group/:name/channel/:id',
                element: <GroupChannelView />,
                loader: channelsLoader,
            }
        ]
    }
])

export { router }