import { useSignals } from "@preact/signals-react/runtime";
import './App.scss';
import { State } from './state';
import { useState } from "react";
import { ComponentsList, Designer } from "./components";
import { AXIComponent } from "./types";
import { PropertiesComponent } from "./components";

function App() {
  useSignals();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0xFFFFFFFF);

  return (
    <div className="App">
      <div className="app-header">
        <div>Quokka SoC Builder</div>
      </div>
      <div className="app-body">
        <div className="components-list-pane">
          <div>
            <button onClick={() => {
              const newComponets = [...State.Components.value];
              for (let i = 0; i < 100; i++)
                newComponets.push(new AXIComponent({ Name: i.toString() }))

              State.Components.value = newComponets;
            }}>Add</button>
          </div>
          <ComponentsList components={State.Components.value}/>
        </div>
        <div className="designer-pane">
          <Designer soc={State.SoC.value} onSoCModified={soc => State.SoC.value = soc}/>
        </div>
        <div className="properties-editor-pane">
          <PropertiesComponent selection={State.Selection.value} />
        </div>
      </div>
    </div>
  );
}

export default App;
