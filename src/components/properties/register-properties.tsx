import { useEffect, useState } from "react";
import { State } from "../../state";
import { Register } from "../../types";
import { hexField, textField } from "./fields";

interface IProps {
    register: Register;
    onUpdate: (register: Register) => void;
}

export function RegisterProperties(props: IProps) {
    const { register, onUpdate } = props;

    const [state, setState] = useState(register);
    useEffect(() => setState(register), [register]);
    
    if (!register) return null;

    const update = (diff: Partial<Register>) => setState((state) => new Register({
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
                    hexField(
                        "Address (hex)",
                        state.Address,
                        (value) => update({ Address: value })
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