import { Gateway } from "../../types/types";

interface IProps {
    gateway: Gateway;
}

export function GatewayComponent(props: IProps) {
    const { gateway } = props;

    return (
        <div className="designer-gateway">
            <div className="designer-component-header">Gateway</div>
        </div>
    )
}