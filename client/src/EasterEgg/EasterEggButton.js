import React, { createContext, useContext } from 'react';

const EasterEggContext = createContext();

export function useEasterEgg() {
  return useContext(EasterEggContext);
}

export function EasterEggProvider({ children }) {
  function triggerEasterEgg() {
    console.log("🥚 You found the easter egg! 🐰");
  }

  return (
    <EasterEggContext.Provider value={triggerEasterEgg}>
      {children}
    </EasterEggContext.Provider>
  );
}
