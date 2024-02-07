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

export interface IInterconnectComponent extends ITypedObject {
    Id: string;
    IsMaster: boolean;
    IsSlave: boolean;
}

export abstract class SoCComponent extends TypedObject {
    Id: string = Tools.Guid();
    abstract IsTopLevel: boolean;
}

export class SoC extends TypedObject {
    constructor() {
        super(SoC.type);
    }

    static type = "SoC";

    Components: SoCComponent[] = [];

    getComponent<T>(id: string) {
        return this.Components.find(c => c.Id == id) as T;
    }
} 

export class RISCV extends SoCComponent implements IInterconnectComponent {
    constructor(init?: Partial<RISCV>) {
        super(RISCV.type);
        if (init) Object.assign(this, init);
    }

    static type = "RISCV";
    IsTopLevel = false;
    IsMaster = true;
    IsSlave = false;
} 

export class Interconnect extends SoCComponent {
    constructor(init?: Partial<Interconnect>) {
        super(Interconnect.type);
        if (init) Object.assign(this, init);
    }

    static type = "Interconnect";
    IsTopLevel = true;

    ComponentIds: string[] = [];
} 

export class Gateway extends SoCComponent {
    constructor(init?: Partial<Gateway>) {
        super(Gateway.type);
        if (init) Object.assign(this, init);
    }

    static type = "Gateway";
    IsTopLevel = true;
} 

export class Register extends SoCComponent implements IInterconnectComponent  {
    constructor(init?: Partial<Register>) {
        super(Register.type);
        if (init) Object.assign(this, init);
    }

    static type = "Register";
    IsTopLevel = false;
    IsMaster = false;
    IsSlave = true;
} 

export class MemoryBlock extends SoCComponent implements IInterconnectComponent  {
    constructor(init?: Partial<MemoryBlock>) {
        super(MemoryBlock.type);
        if (init) Object.assign(this, init);
    }

    static type = "MemoryBlock";
    IsTopLevel = false;
    IsMaster = false;
    IsSlave = true;
} 

export class AXIComponent extends TypedObject {
    constructor(init?: Partial<AXIComponent>) {
        super(AXIComponent.type);
        if (init) Object.assign(this, init);
    }
 
    static type = "AXIComponent";
    Name: nullableString = null; 
    IsTopLevel: boolean = false;
} 