import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Home} from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)

//asersion not null
// ! = not null