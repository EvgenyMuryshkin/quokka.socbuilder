import { Register } from "../../types";

interface IProps {
    register: Register;
}

export function RegisterProperties(props: IProps) {
    const { register } = props;
    if (!register) return null;
    
    return (
        <div>{register.Name}</div>
    )
}