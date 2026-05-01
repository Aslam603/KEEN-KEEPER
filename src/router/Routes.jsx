import { createBrowserRouter } from 'react-router'; 
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import HomePage from '../pages/HomePage/HomePage';
import Stats from '../pages/Stats/Stats';
import Timeline from '../pages/Timeline/Timeline';
import RootLayout from '../layout/RootLayout';
import Details from '../pages/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />, 
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "Timeline", 
        element: <Timeline />, 
      },
      {
        path: "friend/:id", 
        element: <Details />
      },
      {
        path: "Stats",
        element: <Stats />,
      },
    ],
  },
]);