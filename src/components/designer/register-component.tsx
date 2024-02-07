import { Register, SoC } from "../../types/types"

interface IProps {
    soc: SoC; 
    register: Register;
}

export function RegisterComponent(props: IProps) {
    return (
        <div className="designer-register">
            <div className="designer-component-header">Register</div>
            0x10000000
        </div>
    )
}