import { Glyph, SoCBuilder } from "../../lib";
import { State } from "../../state";
import { Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC, SoCComponent, TypedObject } from "../../types/types";

interface IProps {
    soc: SoC;
    component: TypedObject;
    onSoCModified: (soc: SoC) => void;
}

const componentHeaders = {
    [Interconnect.type]: "Interconnect",
    [Register.type]: "Register",
    [MemoryBlock.type]: "MemoryBlock",
    [RISCV.type]: "RISCV",
    [Gateway.type]: "Gateway",
};

export function DesignerHeaderComponent(props: IProps) {
    const { component, soc, onSoCModified } = props;

    if (!componentHeaders[component?.$type]) return null;

    return (
        <div 
            className="designer-component-header" 
            onClick={() => State.Selection.value = component}>
            <div className="designer-component-header-title">{componentHeaders[component.$type]}</div>
            <div className="designer-component-header-actions">
                <Glyph icon="remove" onClick={() => {
                    const socBuilder = new SoCBuilder();
                    const removed = socBuilder.Remove(soc, component as SoCComponent);
                    onSoCModified(removed.soc);
                }}/>
            </div>
        </div>
    );
}