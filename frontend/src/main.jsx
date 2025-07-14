import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserContextProvider from './contexts/userContext'
import CartContextProvider from './contexts/cartContext'
import AlertContextProvider from './contexts/alertContext'
import './index.css'
import App from './App'
import { PostHogProvider } from 'posthog-js/react'
// import '../mixpanel'
// import '../openreplay'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertContextProvider>
    <UserContextProvider>
      <CartContextProvider>
            {/* <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}> */}
     <App/>
         {/* </PostHogProvider> */}
     </CartContextProvider>
    </UserContextProvider>
    </AlertContextProvider>
  </StrictMode>
)
