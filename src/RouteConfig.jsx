import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "../routes/Root";
import Start from "../routes/Start";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Start />
            }
        ]
    }
])

export { router }