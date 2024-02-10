import { AXIComponent, Gateway, ISoCComponent, Interconnect, MemoryBlock, RISCV, Register, SoC } from "../../types";
import { DropComponent } from "./drop-component";
import { RegisterComponent } from "./register-component";
import { MemoryBlockComponent } from "./memory-block-component";
import { SoCBuilder } from "../../tools/socbuilder";
import { RISCVComponent } from "./riscv-component";
import { DesignerHeaderComponent } from "./designer-header";
import { State } from "../../state";
import { InterconectGatewayComponent } from "./interconnect-gateway-component";
import { ComponentsLibrary } from "../../tools";

interface IProps {
    componentsLibrary: ComponentsLibrary;
    soc: SoC;
    interconnect: Interconnect;
    onSoCModified: (soc: SoC) => void;
}

export function InterconnectComponent(props: IProps) {
    const { componentsLibrary, soc, interconnect, onSoCModified } = props;

    const interconnectComponents = interconnect.ComponentIds.map(id => soc.getComponent<ISoCComponent>(id));
    const masters = interconnectComponents.filter(c => componentsLibrary.isMaster(c));
    const slaves = interconnectComponents.filter(c => componentsLibrary.isSlave(c));

    const gateways = soc
        .Components
        .filter(c => c.$type === Gateway.type)
        .map(c => c as Gateway)
        .filter(gw => gw.FromInterconnectId === interconnect.Id || gw.ToInterconnectId === interconnect.Id)

    return (
        <div className="designer-bus">
            <DesignerHeaderComponent soc={soc} component={interconnect} onSoCModified={onSoCModified}/>

            <DropComponent 
                title="Drop interconnect components here"
                canDrop={(payload) => {
                    const component = payload as AXIComponent;
                    return [RISCV.type, Register.type, MemoryBlock.type].includes(component?.Name);
                }}
                onDrop={(payload) => {
                    const component = payload as AXIComponent;
                    const socBuilder = new SoCBuilder();

                    switch (component.Name) {
                        case Register.type: {
                            const withRegister = socBuilder.AddRegister(soc, interconnect);
                            const withUpdate = socBuilder.Update(
                                withRegister.soc, 
                                new Interconnect({
                                    ...interconnect,
                                    ComponentIds: [...interconnect.ComponentIds, withRegister.register.Id]
                                })    
                            );
                            onSoCModified(withUpdate.soc);
                            State.Selection.value = withRegister.register;
                        } break;
                        case MemoryBlock.type: {
                            const withMemoryBlock = socBuilder.AddMemoryBlock(soc, interconnect);
                            const withUpdate = socBuilder.Update(
                                withMemoryBlock.soc, 
                                new Interconnect({
                                    ...interconnect,
                                    ComponentIds: [...interconnect.ComponentIds, withMemoryBlock.memoryBlock.Id]
                                })    
                            );
                            onSoCModified(withUpdate.soc);     
                            State.Selection.value = withMemoryBlock.memoryBlock;                    
                        } break;
                        case RISCV.type: {
                            const withRISCV = socBuilder.AddRISCV(soc);
                            const withUpdate = socBuilder.Update(
                                withRISCV.soc, 
                                new Interconnect({
                                    ...interconnect,
                                    ComponentIds: [...interconnect.ComponentIds, withRISCV.riscv.Id]
                                })    
                            );
                            onSoCModified(withUpdate.soc);  
                            State.Selection.value = withRISCV.riscv;                      
                        } break; 
                    }
                }}                
            />   

            <div className="designer-bus-components">
                <div className="designer-bus-components-panel designer-bus-components-panel-bordered">
                    <div className="designer-component-header">Masters</div>
                    {
                        masters.map(r => {
                            const key = r.Id;

                            switch (r.$type) {
                                case Register.type: {
                                    return <RegisterComponent key={key} soc={soc} onSoCModified={onSoCModified} register={r as Register}/>
                                }
                                case MemoryBlock.type: {
                                    return <MemoryBlockComponent key={key} soc={soc} onSoCModified={onSoCModified} memoryBlock={r as MemoryBlock}/>
                                }
                                case RISCV.type: {
                                    return <RISCVComponent key={key} soc={soc} onSoCModified={onSoCModified} riscv={r as RISCV} />
                                }
                            }

                            return null;
                        })
                    }
                    {
                        gateways
                            .filter(gw => gw.ToInterconnectId === interconnect.Id)
                            .map(gw => {
                                const key = gw.Id;
                                return <InterconectGatewayComponent key={key} soc={soc} interconnect={interconnect} gateway={gw} onSoCModified={onSoCModified}/>
                            })
                    }
                </div>
                <div className="designer-bus-components-panel">
                    <div className="designer-component-header">Slaves</div>
                    {
                        slaves.map((r, idx) => {
                            const key = r.Id;

                            switch (r.$type) {
                                case Register.type: {
                                    return <RegisterComponent key={key} soc={soc} onSoCModified={onSoCModified} register={r as Register}/>
                                }
                                case MemoryBlock.type: {
                                    return <MemoryBlockComponent key={key} soc={soc} onSoCModified={onSoCModified} memoryBlock={r as MemoryBlock}/>
                                }
                                case RISCV.type: {
                                    return <RISCVComponent key={key} soc={soc} onSoCModified={onSoCModified} riscv={r as RISCV} />
                                }
                            }

                            return null;
                        })                        
                    }
                    {
                        gateways
                            .filter(gw => gw.FromInterconnectId === interconnect.Id)
                            .map(gw => {
                                const key = gw.Id;
                                return <InterconectGatewayComponent key={key} soc={soc} interconnect={interconnect} gateway={gw} onSoCModified={onSoCModified}/>
                            })
                    }
                </div>
            </div>
        </div>
    )
}