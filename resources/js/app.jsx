import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = import.meta.glob('./Pages/**/*.jsx')

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        // Try standalone file first
        const filePath = `./Pages/${name}.jsx`
        if (pages[filePath]) {
            return resolvePageComponent(filePath, pages)
        }
        // Fallback to nested index.jsx
        return resolvePageComponent(
            `./Pages/${name}/Index.jsx`,
            pages
        )
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
