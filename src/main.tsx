import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function applyThemeFromPreference() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

applyThemeFromPreference();

// Typography exploration: ?type=slab | poster | terminal | wide
const typeProposal = new URLSearchParams(window.location.search).get("type");
if (typeProposal && /^(slab|poster|terminal|wide)$/.test(typeProposal)) {
  document.documentElement.dataset.type = typeProposal;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
