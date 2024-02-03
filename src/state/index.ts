import { signal } from "@preact/signals-react";
import { AXIComponent, Bus, MemoryBlock, Register } from "../types/types";

export class AppState {
    Counter = signal(0);
    Components = signal([
        new AXIComponent({Name: Bus.type}),
        new AXIComponent({Name: Register.type}),
        new AXIComponent({Name: MemoryBlock.type})
    ])
}

export const State = new AppState();