import React from 'react';
import Main_page from "./components/Main-page/component"

export function App() {
    return (
        <div>
            <Main_page/>
        </div>
    )
}

if (module.hot) {
    module.hot.accept();
  }