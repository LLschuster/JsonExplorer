import { createRoot } from 'react-dom/client';
import {JsonExplorer} from './App'

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const body = document.getElementById('app') as HTMLElement
const root = createRoot(body);
root.render(<JsonExplorer />);
