import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "../routes/Root";
import Start from "../routes/Start";
import GroupView from "../routes/GroupView";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Start />
            },
            {
                path: '/chappy',
                element: <GroupView  />,
                children: [
                    {
                        path: '/chappy/chat1',
                        // element: Chat 1 here!
                    },
                    {

                    }
                    

                ]
            }
        ]
    }
])

export { router }