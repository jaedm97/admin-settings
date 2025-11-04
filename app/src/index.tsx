import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('wp-react-panel-root')

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
} else {
    console.error("Root element 'wp-react-panel-root' not found!")
}