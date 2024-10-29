import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StartPage from "./app/start-page";
import {RootStoreContext} from "./services/store/root-store-context.ts";
import RootStore from "./services/store/root-store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreContext.Provider value={new RootStore()}>
        <StartPage />
    </RootStoreContext.Provider>
  </StrictMode>,
)
