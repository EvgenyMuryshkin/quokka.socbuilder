import { RISCV, SoC } from "../../types";
import { DesignerHeaderComponent } from "./designer-header";

interface IProps {
    soc: SoC;
    riscv: RISCV;
    onSoCModified: (soc: SoC) => void;
}

export function RISCVComponent(props: IProps) {
    const { soc, riscv, onSoCModified } = props;

    return (
        <div className="designer-riscv">
            <DesignerHeaderComponent soc={soc} component={riscv} onSoCModified={onSoCModified}/>
        </div>
    )
}