import { useSignals } from "@preact/signals-react/runtime";
import './App.scss';
import { State } from './state';
import { ComponentsList, Designer } from "./components";
import { AXIComponent } from "./types";
import { PropertiesComponent } from "./components";
import { ComponentsLibrary, SoCBuilder } from "./tools";

function App() {
  useSignals();

  return (
    <div className="App">
      <div className="app-header">
        <div>Quokka SoC Builder</div>
        <div className="app-header-github"><a href="https://github.com/EvgenyMuryshkin/quokka.socbuilder" target="_blank" rel="noreferrer">https://github.com/EvgenyMuryshkin/quokka.socbuilder</a></div>
      </div>
      <div className="app-body">
        <div className="components-list-pane">
          <div>
            <button onClick={() => {
              const newComponets = [...State.Components.value.getComponents()];
              for (let i = 0; i < 100; i++)
                newComponets.push(new AXIComponent({ Name: i.toString() }))

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
