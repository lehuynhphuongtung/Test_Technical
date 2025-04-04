import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DarkModeProvider from './context/darkmode.tsx'
import FlagFilterProvider from './context/filter.tsx'

createRoot(document.getElementById('root')!).render(
  <DarkModeProvider>
    <FlagFilterProvider>
      <App />
    </FlagFilterProvider>
  </DarkModeProvider>
)
