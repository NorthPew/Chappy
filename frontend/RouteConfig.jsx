import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "./routes/Root";
import Start from "./routes/Start";
import GroupView, {loader as groupsLoader} from "./routes/GroupView";

// Group Chat Routes
import GroupChatOneView, {loader as GroupChatOneLoader} from "./routes/group routes/GroupChatOneView";
import GroupChatTwoView from "./routes/group routes/GroupChatTwoView";


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
                path: '/chappy',
                element: <GroupView  />,
                loader: groupsLoader,
                children: [
                    {
                        path: '/chappy/',
                        element: <GroupChatOneView />,
                        loader: GroupChatOneLoader
                    },
                    {
                        path: '/chappy/private',
                        element: <GroupChatTwoView />
                    }
                ]
            }
        ]
    }
])

export { router }