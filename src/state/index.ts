import { signal } from "@preact/signals-react";
import { SoC, TypedObject } from "../types";
import { ComponentsLibrary } from "../tools";

export class AppState {
    Counter = signal(0);
    Components = signal(new ComponentsLibrary());
    SoC = signal(new SoC());
    Selection = signal<TypedObject>(null);
}

export const State = new AppState();