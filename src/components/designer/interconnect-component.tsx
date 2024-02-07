import { useState } from "react";
import { AXIComponent, IInterconnectComponent, Interconnect, MemoryBlock, RISCV, Register, SoC } from "../../types/types";
import { DropComponent } from "./drop-component";
import { RegisterComponent } from "./register-component";
import { MemoryBlockComponent } from "./memory-block-component";
import { SoCBuilder } from "../../lib/socbuilder";
import { RISCVComponent } from "./riscv-component";

interface IProps {
    soc: SoC;
    interconnect: Interconnect;
    onSoCModified: (soc: SoC) => void;
}

export function InterconnectComponent(props: IProps) {
    const { soc, interconnect, onSoCModified } = props;

    const interconnectComponents = interconnect.ComponentIds.map(id => soc.getComponent<IInterconnectComponent>(id));
    const masters = interconnectComponents.filter(c => c.IsMaster);
    const slaves = interconnectComponents.filter(c => c.IsSlave);

    return (
        <div className="designer-bus">
            <div className="designer-component-header">Interconnect</div>

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
                            const withRegister = socBuilder.AddRegister(soc);
                            const withUpdate = socBuilder.Update(
                                withRegister.soc, 
                                new Interconnect({
                                    ...interconnect,
                                    ComponentIds: [...interconnect.ComponentIds, withRegister.register.Id]
                                })    
                            );
                            onSoCModified(withUpdate.soc);
                        } break;
                        case MemoryBlock.type: {
                            const withMemoryBlock = socBuilder.AddMemoryBlock(soc);
                            const withUpdate = socBuilder.Update(
                                withMemoryBlock.soc, 
                                new Interconnect({
                                    ...interconnect,
                                    ComponentIds: [...interconnect.ComponentIds, withMemoryBlock.memoryBlock.Id]
                                })    
                            );
                            onSoCModified(withUpdate.soc);                        
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
                        } break; 
                    }
                }}                
            />   

            <div className="designer-bus-components">
                <div className="designer-bus-components-panel designer-bus-components-panel-bordered">
                    <div className="designer-component-header">Masters</div>
                    {
                        masters.map((r, idx) => {
                            switch (r.$type) {
                                case Register.type: {
                                    return <RegisterComponent key={idx} soc={soc} register={r as Register}/>
                                }
                                case MemoryBlock.type: {
                                    return <MemoryBlockComponent key={idx} soc={soc} memoryBlock={r as MemoryBlock}/>
                                }
                                case RISCV.type: {
                                    return <RISCVComponent key={idx} soc={soc} riscv={r as RISCV} />
                                }
                            }

                            return null;
                        })
                    }
                </div>
                <div className="designer-bus-components-panel">
                    <div className="designer-component-header">Slaves</div>
                    {
                        slaves.map((r, idx) => {
                            switch (r.$type) {
                                case Register.type: {
                                    return <RegisterComponent key={idx} soc={soc} register={r as Register}/>
                                }
                                case MemoryBlock.type: {
                                    return <MemoryBlockComponent key={idx} soc={soc} memoryBlock={r as MemoryBlock}/>
                                }
                                case RISCV.type: {
                                    return <RISCVComponent key={idx} soc={soc} riscv={r as RISCV} />
                                }
                            }

                            return null;
                        })                        
                    }
                </div>
            </div>
        </div>
    )
}