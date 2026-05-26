import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


// const AppWrapper = () => {
//   if (__APP_ENV__.DEV_MODE !== ctEnvSite.DEVELOP) {
//     console.log = () => { };
//     console.debug = () => { };
//     console.info = () => { };
//     console.warn = () => { };
//   }

//   return <App />;
// };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
