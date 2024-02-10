import { Tools } from "../../lib";
import { Gateway, Interconnect, SoC } from "../../types";
import { DesignerHeaderComponent } from "./designer-header";
import { AddressRange } from "./designer-tools";

interface IProps {
    soc: SoC;
    gateway: Gateway;
    onSoCModified: (soc: SoC) => void;
}

export function GatewayComponent(props: IProps) {
    const { soc, gateway, onSoCModified } = props;
    const fromInterconnect = soc.getComponent<Interconnect>(gateway.FromInterconnectId);
    const toInterconnect = soc.getComponent<Interconnect>(gateway.ToInterconnectId);

    return (
        <div className="designer-gateway">
            <DesignerHeaderComponent soc={soc} component={gateway} onSoCModified={onSoCModified}/>
            {fromInterconnect && <div>From: {fromInterconnect.Name}</div>}
            {fromInterconnect && <AddressRange address={gateway.FromInterconnectAddress} range={gateway.Depth}/>}
            {toInterconnect && <div>To: {toInterconnect.Name}</div>}
            {toInterconnect && <AddressRange address={gateway.ToInterconnectAddress} range={gateway.Depth}/>}
       </div>
    )
}