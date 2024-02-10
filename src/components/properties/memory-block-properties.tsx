import { useEffect, useState } from "react";
import { State } from "../../state";
import { MemoryBlock, Register } from "../../types";
import { hexField, numberField, textField } from "./fields";

interface IProps {
    memoryBlock: MemoryBlock;
    onUpdate: (memoryBlock: MemoryBlock) => void;
}

export function MemoryBlockProperties(props: IProps) {
    const { memoryBlock, onUpdate } = props;

    const [state, setState] = useState(memoryBlock);
    useEffect(() => setState(memoryBlock), [memoryBlock]);
    
    if (!memoryBlock) return null;

    const update = (diff: Partial<MemoryBlock>) => setState((state) => new MemoryBlock({
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