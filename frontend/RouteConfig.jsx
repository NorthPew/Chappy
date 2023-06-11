import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "./routes/Root";


// Loader
import {loader as groupsLoader}  from "./components/SideHeader";



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
                path: '/group/:id',
                element: <GroupView />,
                loader: groupsLoader,
            }
        ]
    }
])

export { router }