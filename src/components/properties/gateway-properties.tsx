import { useEffect, useState } from "react";
import { State } from "../../state";
import { Gateway, Interconnect, Register, SoC } from "../../types";
import { hexField, numberField, socIdField, textField } from "./fields";

interface IProps {
    soc: SoC;
    gateway: Gateway;
    onUpdate: (gateway: Gateway) => void;
}

export function GatewayProperties(props: IProps) {
    const { soc, gateway, onUpdate } = props;

    const [state, setState] = useState(gateway);
    useEffect(() => setState(gateway), [gateway]);
    
    if (!gateway) return null;

    const update = (diff: Partial<Gateway>) => setState((state) => new Gateway({
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
                <hr/>
                {
                    socIdField(
                        soc,
                        "From Interconnect",
                        Interconnect.type,
                        state.FromInterconnectId,
                        (value) => update({ FromInterconnectId: value })
                    )
                }
                {
                    hexField(
                        "From Interconnect Address (hex)",
                        state.FromInterconnectAddress,
                        (value) => update({ FromInterconnectAddress: value })
                    )
                }    
                <hr/>            
                {
                    socIdField(
                        soc,
                        "To Interconnect",
                        Interconnect.type,
                        state.ToInterconnectId,
                        (value) => update({ ToInterconnectId: value })
                    )
                } 
                {
                    hexField(
                        "To Interconnect Address (hex)",
                        state.ToInterconnectAddress,
                        (value) => update({ ToInterconnectAddress: value })
                    )
                }       
                <hr/>            
                {
                    numberField(
                        "Depth (dec)",
                        state.Depth,
                        (value) => update({ Depth: value })
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