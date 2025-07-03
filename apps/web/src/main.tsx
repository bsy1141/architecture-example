import React from 'react';
import ReactDOM from 'react-dom/client';
import { TanstackQuerySettings } from '@/app/providers/TanstackQuerySettings';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TanstackQuerySettings>
            <RouterProvider router={router} />
        </TanstackQuerySettings>
    </React.StrictMode>,
);
