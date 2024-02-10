import { useState } from "react";
import "./designer.scss"
import { AXIComponent, Gateway, Interconnect, RISCV, SoC } from "../../types";
import { DropComponent } from "./drop-component";
import { Tools } from "../../lib";
import { InterconnectComponent } from "./interconnect-component";
import { GatewayComponent } from "./gateway-component";
import { SoCBuilder } from "../../tools/socbuilder";
import { State } from "../../state";
import { ComponentsLibrary } from "../../tools";

interface IProps {
    componentsLibrary: ComponentsLibrary;
    soc: SoC;
    onSoCModified: (soc: SoC) => void;
}

export function Designer(props: IProps) {
    const { componentsLibrary, soc, onSoCModified } = props;

    const topLevelComponents = soc.Components.filter(c => componentsLibrary.isTopLevel(c));

    return (
        <div className="designer">   
            {topLevelComponents.map((b, idx) => {
                switch (b.$type) {
                    case Interconnect.type: {
                        return <InterconnectComponent 
                            componentsLibrary={componentsLibrary}
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
                            State.Selection.value = withInterconnect.interconnect;
                        } break;
                        case Gateway.type: {
                            const withGateway = socBuilder.AddGateway(soc);
                            onSoCModified(withGateway.soc);
                            State.Selection.value = withGateway.gateway;
                        }
                    }
                }}                
                />      

            <pre>{JSON.stringify(soc, null, 2)}</pre>
        </div>
    )
}