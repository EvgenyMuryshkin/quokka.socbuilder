import { signal } from "@preact/signals-react";
import { AXIComponent, Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC, TypedObject } from "../types";
import { ComponentsLibrary } from "../tools";

export class AppState {
    Counter = signal(0);
    Components = signal(new ComponentsLibrary([
        new AXIComponent({Name: Interconnect.type, IsTopLevel: true}),
        new AXIComponent({Name: Gateway.type, IsTopLevel: true}),
        new AXIComponent({Name: RISCV.type, IsMaster: true}),
        new AXIComponent({Name: Register.type, IsSlave: true}),
        new AXIComponent({Name: MemoryBlock.type, IsSlave: true}),
    ]));
    SoC = signal(new SoC());
    Selection = signal<TypedObject>(null);
}

export const State = new AppState();