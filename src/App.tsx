import { useSignals } from "@preact/signals-react/runtime";
import './App.scss';
import { State } from './state';
import { useState } from "react";
import { ComponentsList, Designer } from "./components";
import { AXIComponent } from "./types/types";

function format(value: number)
{
  return value.toString(16).toUpperCase().padStart(8, "0");
}
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
        </div>
        <div className="designer-pane">
          <div>
            <p>Designer</p>
            <Designer/>
          </div>
        </div>
        <div className="properties-editor-pane">
          <div>
            <p>Props</p>
            <div>Counter: {State.Counter.value}</div>
            <div>
              <button onClick={() => {
                State.Counter.value++;          
              }}>Increment</button>
            </div>
            <br/>
            <div>
              <div>AXI address range: [0x{format(from)} - 0x{format(to)}]</div>
              <div>From: <input type="range" min="0" max={0xFFFFFFFF} value={from} onChange={(v => setFrom(parseInt(v.target.value)))}></input></div>
              <div>To: <input type="range" min="0" max={0xFFFFFFFF} value={to} onChange={(v => setTo(parseInt(v.target.value)))}></input></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
