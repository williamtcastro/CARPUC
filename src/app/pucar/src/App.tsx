import React from "react";
import Routes from "./routes/routes";
import "./pages/styles/global.css";
import "typeface-poppins";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import 'react-tippy/dist/tippy.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
