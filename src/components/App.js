import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import DoubleTrouble from "./doubleTrouble";
import { DoubleTroubleProvider } from "../providers/DoubleTrouble";

const App = () => {
  return (
    <DoubleTroubleProvider>
      <DoubleTrouble />
    </DoubleTroubleProvider>
  );
};

export default App;
