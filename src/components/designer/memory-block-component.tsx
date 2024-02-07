import { MemoryBlock, SoC } from "../../types/types"

interface IProps {
    soc: SoC;
    memoryBlock: MemoryBlock;
}

export function MemoryBlockComponent(props: IProps) {
    return (
        <div className="designer-memory-block">
            <div className="designer-component-header">Memory Block</div>
            0x10000000-0x10010000
        </div>
    )
}