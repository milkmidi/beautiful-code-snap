import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import "./index.css";

const rootEle = document.getElementById("root") as HTMLElement
createRoot(rootEle).render(
  <>
    <Toaster />
    <App />
  </>
);
