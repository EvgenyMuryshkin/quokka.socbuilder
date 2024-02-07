import { TypedObject } from "../../types/types"
import "./properties.scss";

interface IProps {
    selection: TypedObject;
}

export function PropertiesComponent(props: IProps) {
    const { selection } = props;
    
    return (
        <div className="properties">
            Selection: {selection?.$type}
        </div>
    )

    /*
          <div>
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
    */
}