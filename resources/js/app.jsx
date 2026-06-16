import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ThemeProvider } from './lib/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? title + ' - ' + appName : appName),
    resolve: (name) => {
        const pagesJsx = import.meta.glob('./pages/**/*.jsx');
        const pagesTsx = import.meta.glob('./pages/**/*.tsx');
        const keyJsx = './pages/' + name + '.jsx';
        const keyTsx = './pages/' + name + '.tsx';
        if (pagesJsx[keyJsx]) {
            return pagesJsx[keyJsx]();
        }
        return pagesTsx[keyTsx]();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            React.createElement(ThemeProvider, null,
                React.createElement(App, props)
            )
        );
    },
    progress: {
        delay: 0,
        color: '#a78bfa',
        includeCSS: true,
        showSpinner: true,
    },
});