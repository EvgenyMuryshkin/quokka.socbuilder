import { useEffect, useState } from "react";
import { State } from "../../state";
import { Interconnect, SoC } from "../../types";
import { textField } from "./fields";

interface IProps {
    soc: SoC;
    interconnect: Interconnect;
    onUpdate: (gateway: Interconnect) => void;
}

export function InterconnectProperties(props: IProps) {
    const { interconnect, onUpdate } = props;

    const [state, setState] = useState(interconnect);
    useEffect(() => setState(interconnect), [interconnect]);
    
    if (!interconnect) return null;

    const update = (diff: Partial<Interconnect>) => setState((state) => new Interconnect({
        ...state,
        ...diff
    }));

    return (
        <div>
            <div>
                {
                    textField(
                        "Name", 
                        state.Name, 
                        (value) => update({ Name: value })
                    )
                }
            </div>
            <hr/>
            <div>
                <button onClick={() => onUpdate(state)}>Update</button>
                <button onClick={() => State.Selection.value = null}>Cancel</button>
           </div>
        </div>
    )
}