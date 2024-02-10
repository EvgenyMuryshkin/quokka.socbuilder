import { Tools } from "../lib";

export interface ITypedObject {
    $type: string;
}

export type nullableString = string | null;

export class TypedObject implements ITypedObject {
    constructor(type: string) {
        this.$type = type;
    }

    $type: string;
}

export interface ISoCComponent extends ITypedObject {
    Id: string;
}

export interface IInterconnectAddressComponent {
    Address: number;
}

export abstract class SoCComponent extends TypedObject implements ISoCComponent {
    Id: string = Tools.Guid();
    Name: string = "";
}

export class SoC extends TypedObject {
    constructor() {
        super(SoC.type);
    }

    static type = "SoC";

    Components: SoCComponent[] = [];

    getComponent<T extends ISoCComponent>(id: string) {
        return this.Components.find(c => c.Id == id) as unknown as T;
    }
} 

export class RISCV extends SoCComponent {
    constructor(init?: Partial<RISCV>) {
        super(RISCV.type);
        if (init) Object.assign(this, init);
    }

    static type = "RISCV";
} 

export class Interconnect extends SoCComponent {
    constructor(init?: Partial<Interconnect>) {
        super(Interconnect.type);
        if (init) Object.assign(this, init);
    }

    static type = "Interconnect";

    ComponentIds: string[] = [];
} 

export class Gateway extends SoCComponent {
    constructor(init?: Partial<Gateway>) {
        super(Gateway.type);
        if (init) Object.assign(this, init);
    }

    static type = "Gateway";
    
    FromInterconnectId: string = null;
    FromInterconnectAddress: number = 0;

    ToInterconnectId: string = null;
    ToInterconnectAddress: number = 0;

    Depth: number = 4;
} 

export class Register extends SoCComponent implements IInterconnectAddressComponent  {
    constructor(init?: Partial<Register>) {
        super(Register.type);
        if (init) Object.assign(this, init);
    }

    static type = "Register";
    Address: number = 0;
} 

export class MemoryBlock extends SoCComponent implements IInterconnectAddressComponent  {
    constructor(init?: Partial<MemoryBlock>) {
        super(MemoryBlock.type);
        if (init) Object.assign(this, init);
    }

    static type = "MemoryBlock";
    Address: number = 0;
    Depth: number = 4;
} 

export class AXIComponent extends TypedObject {
    constructor(init?: Partial<AXIComponent>) {
        super(AXIComponent.type);
        if (init) Object.assign(this, init);
    }
 
    static type = "AXIComponent";
    Name: nullableString = null; 
    IsTopLevel: boolean = false;
    IsMaster: boolean = false;
    IsSlave: boolean = false;
} 