import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Step1 from '@/features/onboarding/routes/Step1';
import Step2 from '@/features/onboarding/routes/Step2';
import Classroom from '@/features/classroom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'onboarding',
                children: [
                    { index: true, element: <Step1 /> },
                    { path: 'step1', element: <Step1 /> },
                    { path: 'step2', element: <Step2 /> },
                ],
            },
            {
                path: 'classroom',
                element: <Classroom />,
            },
            {
                path: '',
                element: <div>Welcome to New Edu!</div>,
            },
        ],
    },
]);

export { RouterProvider };
