import { Tools } from "../../lib";
import { Register, SoC } from "../../types"
import { DesignerHeaderComponent } from "./designer-header";
import { Address } from "./designer-tools";

interface IProps {
    soc: SoC; 
    register: Register;
    onSoCModified: (soc: SoC) => void;
}

export function RegisterComponent(props: IProps) {
    const { soc, register, onSoCModified} = props;
    return (
        <div className="designer-register">
            <DesignerHeaderComponent soc={soc} component={register} onSoCModified={onSoCModified}/>
            <Address address={register.Address}/>
        </div>
    )
}