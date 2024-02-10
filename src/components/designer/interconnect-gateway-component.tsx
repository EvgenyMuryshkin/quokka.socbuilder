import { Gateway, Interconnect, SoC } from "../../types";
import { DesignerHeaderComponent } from "./designer-header";
import { AddressRange } from "./designer-tools";

interface IProps {
    soc: SoC;
    interconnect: Interconnect;
    gateway: Gateway;
    onSoCModified: (soc: SoC) => void;
}

export function InterconectGatewayComponent(props: IProps) {
    const { soc, interconnect, gateway, onSoCModified } = props;

    const fromInterconnect = soc.getComponent<Interconnect>(gateway.FromInterconnectId);
    const toInterconnect = soc.getComponent<Interconnect>(gateway.ToInterconnectId);

    return (
        <div className="designer-interconnect-gateway">
            <DesignerHeaderComponent soc={soc} component={gateway} onSoCModified={onSoCModified}/>
            {fromInterconnect?.Id === interconnect.Id && <AddressRange address={gateway.FromInterconnectAddress} range={gateway.Depth}/>}
            {fromInterconnect?.Id === interconnect.Id && <div>To: {toInterconnect?.Name}</div>}
            {toInterconnect?.Id === interconnect.Id && <AddressRange address={gateway.ToInterconnectAddress} range={gateway.Depth}/>}       
            {toInterconnect?.Id === interconnect.Id && <div>From: {fromInterconnect?.Name}</div>}
        </div>
    )
}