import { useState } from "react";
import "./designer.scss"
import { AXIComponent, Gateway, Interconnect, RISCV, SoC } from "../../types/types";
import { DropComponent } from "./drop-component";
import { Tools } from "../../lib";
import { InterconnectComponent } from "./interconnect-component";
import { GatewayComponent } from "./gateway-component";
import { SoCBuilder } from "../../lib/socbuilder";

interface IProps {
    soc: SoC;
    onSoCModified: (soc: SoC) => void;
}

export function Designer(props: IProps) {
    const { soc, onSoCModified } = props;

    const topLevelComponents = soc.Components.filter(c => c.IsTopLevel);

    return (
        <div className="designer">   
            {topLevelComponents.map((b, idx) => {
                switch (b.$type) {
                    case Interconnect.type: {
                        return <InterconnectComponent 
                            key={idx} 
                            soc={soc} 
                            interconnect={b as Interconnect} 
                            onSoCModified={onSoCModified}
                        />
                    }
                    case Gateway.type: {
                        return <GatewayComponent 
                            key={idx} 
                            soc={soc}
                            gateway={b as Gateway}
                            onSoCModified={onSoCModified}
                        /> 
                    }
                    default: return null;
                }
            })}

            <DropComponent 
                title="Drop top level component here" 
                canDrop={(payload) => {
                    const component = payload as AXIComponent;
                    return component.IsTopLevel;
                }}
                onDrop={(payload) => {
                    const component = payload as AXIComponent;
                    const socBuilder = new SoCBuilder();
                    
                    switch (component?.Name) {
                        case Interconnect.type: {
                            const withInterconnect = socBuilder.AddInterconnect(soc);
                            onSoCModified(withInterconnect.soc);
                        } break;
                        case Gateway.type: {
                            const withGateway = socBuilder.AddGateway(soc);
                            onSoCModified(withGateway.soc);
                        }
                    }
                }}                
                />      

            <pre>{JSON.stringify(soc, null, 2)}</pre>
        </div>
    )
}