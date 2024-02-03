import { signal } from "@preact/signals-react";
import { AXIComponent } from "../types/types";

export class AppState {
    Counter = signal(0);
    Components = signal([
        new AXIComponent({Name: "Bus"}),
        new AXIComponent({Name: "Register"}),
        new AXIComponent({Name: "Buffer"})
    ])
}

export const State = new AppState();