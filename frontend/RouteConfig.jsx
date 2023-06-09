import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "./routes/Root";


// Loader
import {loader as groupsLoader}  from "./components/SideHeader";
import GroupChannelView, {loader as channelsLoader} from "./routes/GroupChannelView";

import {loader as usersLoader} from "./components/ChannelsOrFriends"

import Start from "./routes/Start";
import GroupView from "./routes/GroupView";
import ChatView, {loader as chatsLoader} from "./routes/ChatView";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: groupsLoader,
        children: [
            {
                path: '',
                element: <Start />,
                loader: usersLoader,
                children: [
                    {
                        path: '/:name/:id',
                        element: <ChatView />,
                        loader: chatsLoader
                    }
                ]
            },
            {
                path: '/group/:name',
                element: <GroupView />,
                loader: groupsLoader,
                children: [
                    {
                        path: '/group/:name/channel/:id',
                        element: <GroupChannelView />,
                        loader: channelsLoader,
                    }
                ]
            }
        ]
    }
])

export { router }