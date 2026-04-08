import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { OrdersProvider } from './context/OrdersContext'
import { LangProvider } from './context/LangContext'
import App from './App'
import './index.css'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <ThemeProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </ThemeProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
)
