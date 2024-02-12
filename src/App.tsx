import { useSignals } from "@preact/signals-react/runtime";
import './App.scss';
import { State } from './state';
import { ComponentsList, Designer } from "./components";
import { PropertiesComponent } from "./components";
import { ComponentsLibrary, SoCBuilder } from "./tools";
import { Glyph } from "./lib";
import { useEffect } from "react";
import { SoCComponentInfo } from "./types";
import { APIClient } from "./tools/api-client";

async function loadComponents() {
  State.Components.value = await APIClient.getComponents();
}

async function checkConnection() {
  State.Connection.value = await APIClient.checkConnection();
}

function App() {
  useSignals();
  useEffect(() => { 
    const urlParams = new URLSearchParams(window.location.search);
    const port = parseInt(urlParams.get("port")) ?? 0;
    console.log(port);
    APIClient.port = port;
    loadComponents();
    checkConnection();
  }, []);

  return (
    <div className="App">
      <div className="app-header">
        <div className="app-header-title">Quokka SoC Builder</div>
        <div className="app-header-toolbar">
          {
            State.Connection.value
            ? <div className="app-header-connection-online">ONLINE</div>
            : <div className="app-header-connection-offline">OFFLINE (Port: {APIClient.port})</div>
          }
          <Glyph 
            icon="refresh" 
            className="app-header-toolbar-command"
            onClick={async () => {
              await loadComponents();
            }} 
          />
          <Glyph 
            icon="upload" 
            className="app-header-toolbar-command"
            onClick={async () => {
              await APIClient.socUpdate(State.SoC.value);
            }} 
          />
        </div>
        <div className="app-header-github"><a href="https://github.com/EvgenyMuryshkin/quokka.socbuilder" target="_blank" rel="noreferrer">https://github.com/EvgenyMuryshkin/quokka.socbuilder</a></div>
      </div>
      <div className="app-body">
        <div className="components-list-pane">
          <div>
            <button onClick={() => {
              const newComponets = [...State.Components.value.getComponents()];
              for (let i = 0; i < 100; i++)
                newComponets.push(new SoCComponentInfo({ Name: i.toString() }))

              State.Components.value = new ComponentsLibrary(newComponets);
            }}>Add</button>
          </div>
          <ComponentsList componentsLibrary={State.Components.value}/>
        </div>
        <div className="designer-pane">
          <Designer 
            componentsLibrary={State.Components.value}
            soc={State.SoC.value} 
            onSoCModified={soc => State.SoC.value = soc}
          />
        </div>
        <div className="properties-editor-pane">
          <PropertiesComponent 
            soc={State.SoC.value}
            selection={State.Selection.value} 
            onUpdate={(component) => {
              const socBuilder = new SoCBuilder();
              const withUpdate = socBuilder.Update(State.SoC.value, component);
              State.SoC.value = withUpdate.soc;
            }}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
