import { RISCV, SoC } from "../../types/types";

interface IProps {
    soc: SoC;
    riscv: RISCV;
}

export function RISCVComponent(props: IProps) {
    const { soc, riscv } = props;

    return (
        <div className="designer-riscv">
            <div className="designer-component-header">RISCV</div>
        </div>
    )
}