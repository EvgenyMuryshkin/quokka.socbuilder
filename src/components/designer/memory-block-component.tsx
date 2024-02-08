import { Tools } from "../../lib";
import { MemoryBlock, SoC } from "../../types"
import { DesignerHeaderComponent } from "./designer-header";

interface IProps {
    soc: SoC;
    memoryBlock: MemoryBlock;
    onSoCModified: (soc: SoC) => void;
}

export function MemoryBlockComponent(props: IProps) {
    const { soc, memoryBlock, onSoCModified } = props;
    return (
        <div className="designer-memory-block">
            <DesignerHeaderComponent soc={soc} component={memoryBlock} onSoCModified={onSoCModified}/>
            {Tools.formatHex(memoryBlock.Address)}-{Tools.formatHex(memoryBlock.Address + memoryBlock.Depth - 4)}
        </div>
    )
}