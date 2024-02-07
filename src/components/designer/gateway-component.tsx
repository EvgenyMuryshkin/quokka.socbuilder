import { Gateway, SoC } from "../../types/types";
import { DesignerHeaderComponent } from "./designer-header";

interface IProps {
    soc: SoC;
    gateway: Gateway;
    onSoCModified: (soc: SoC) => void;
}

export function GatewayComponent(props: IProps) {
    const { soc, gateway, onSoCModified } = props;

    return (
        <div className="designer-gateway">
            <DesignerHeaderComponent soc={soc} component={gateway} onSoCModified={onSoCModified}/>
        </div>
    )
}