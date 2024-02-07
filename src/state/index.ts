import { signal } from "@preact/signals-react";
import { AXIComponent, Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC, TypedObject } from "../types/types";

export class AppState {
    Counter = signal(0);
    Components = signal([
        new AXIComponent({Name: Interconnect.type, IsTopLevel: true}),
        new AXIComponent({Name: Gateway.type, IsTopLevel: true}),
        new AXIComponent({Name: RISCV.type}),
        new AXIComponent({Name: Register.type}),
        new AXIComponent({Name: MemoryBlock.type}),
    ]);
    SoC = signal(new SoC());
    Selection = signal<TypedObject>(null);
}

export const State = new AppState();