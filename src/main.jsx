import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { Suspense } from "react";
import { store, persistor } from "@provider/store"
import RouteProvider from '@provider/RouteProvieder';
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense>
        <RouteProvider />
      </Suspense>
    </PersistGate>
  </Provider>
)
