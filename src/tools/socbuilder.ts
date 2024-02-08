import { Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC, SoCComponent } from "../types";

const componentNamePrefixed = {
    [Interconnect.type]: "Interconnect",
    [Register.type]: "Register",
    [MemoryBlock.type]: "MemoryBlock",
    [RISCV.type]: "CPU",
    [Gateway.type]: "Gateway"
}

export class SoCBuilder {
    constructor() {

    }

    ComponentName(source: SoC, component: SoCComponent) {
        const type = component?.$type;
        if (!componentNamePrefixed[type]) return "";

        const existingNames = source.Components.filter(c => c.$type == type).map(c => c.Name);
        
        for (let idx = 1;;idx++) {
            const name = `${componentNamePrefixed[type]}${idx}`;
            if (!existingNames.includes(name)) return name;
        }

        return "";
    }

    NextAddress(source: SoC, interconnect: Interconnect) {
        const components = (interconnect?.ComponentIds ?? []).map(id => source.getComponent(id));

        const currentAddress = Math.max(
            0,
            ...components.filter(c => c.$type == Register.type).map(c => c as Register).map(r => r.Address + 4),
            ...components.filter(c => c.$type == MemoryBlock.type).map(c => c as MemoryBlock).map(r => r.Address + r.Depth),    
        );
        
        return currentAddress;
    }

    AddInterconnect(source: SoC) {
        const soc = new SoC();
        const interconnect = new Interconnect();
        interconnect.Name = this.ComponentName(source, interconnect);
        soc.Components = [...source.Components, interconnect];
        return { soc, interconnect };
    }

    AddGateway(source: SoC) {
        const soc = new SoC();
        const gateway = new Gateway();
        gateway.Name = this.ComponentName(source, gateway);
        soc.Components = [...source.Components, gateway];
        return { soc, gateway };
    }

    AddRegister(source: SoC, interconnect: Interconnect) {
        const soc = new SoC();
        const register = new Register({
            Address: this.NextAddress(source, interconnect),
        });
        register.Name = this.ComponentName(source, register);
        soc.Components = [...source.Components, register];
        return { soc, register };
    }

    AddMemoryBlock(source: SoC, interconnect: Interconnect) {
        const soc = new SoC();
        const memoryBlock = new MemoryBlock({
            Address: this.NextAddress(source, interconnect),
        });
        memoryBlock.Name = this.ComponentName(source, memoryBlock);
        soc.Components = [...source.Components, memoryBlock];
        return { soc, memoryBlock };
    }

    AddRISCV(source: SoC) {
        const soc = new SoC();
        const riscv = new RISCV()
        riscv.Name = this.ComponentName(source, riscv);
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