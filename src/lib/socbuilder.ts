import { Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC, SoCComponent } from "../types/types";

export class SoCBuilder {
    constructor() {

    }

    AddInterconnect(source: SoC) {
        const soc = new SoC();
        const interconnect = new Interconnect();
        soc.Components = [...source.Components, interconnect];
        return { soc, interconnect };
    }

    AddGateway(source: SoC) {
        const soc = new SoC();
        const gateway = new Gateway()
        soc.Components = [...source.Components, gateway];
        return { soc, gateway };
    }

    AddRegister(source: SoC) {
        const soc = new SoC();
        const register = new Register()
        soc.Components = [...source.Components, register];
        return { soc, register };
    }

    AddMemoryBlock(source: SoC) {
        const soc = new SoC();
        const memoryBlock = new MemoryBlock()
        soc.Components = [...source.Components, memoryBlock];
        return { soc, memoryBlock };
    }

    AddRISCV(source: SoC) {
        const soc = new SoC();
        const riscv = new RISCV()
        soc.Components = [...source.Components, riscv];
        return { soc, riscv };
    }

    Update(source: SoC, component: SoCComponent) {
        const soc = new SoC();
        soc.Components = source.Components.map(c => c.Id == component?.Id ? component : c);
        return { soc, component };
    }

    Remove(source: SoC, component: SoCComponent) {
        const componentIds = [component?.Id];

        switch (component?.$type) {
            case Interconnect.type: {
                const t = component as Interconnect;
                componentIds.push(...t.ComponentIds);
            }
        }

        const soc = new SoC();
        soc.Components = source
            .Components
            .filter(c => !componentIds.includes(c.Id))
            .map(c => {
                switch (c.$type) {
                    case Interconnect.type: {
                        const t = c as Interconnect;
                        if (t.ComponentIds.some(id => componentIds.includes(id))) {
                            return new Interconnect({
                                ...t,
                                ComponentIds: t.ComponentIds.filter(id => !componentIds.includes(id))
                            });
                        }

                        return c;
                    }
                    default: return c;
                }    
            })
            ;

        return { soc, component };
    }
}