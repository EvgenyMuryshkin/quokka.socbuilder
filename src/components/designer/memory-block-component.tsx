import { MemoryBlock, SoC } from "../../types/types"
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
            0x10000000-0x10010000
        </div>
    )
}