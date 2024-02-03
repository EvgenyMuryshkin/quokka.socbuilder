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

export class Bus extends TypedObject {
    constructor() {
        super(Bus.type);
    }

    static type = "Bus"
} 

export class Register extends TypedObject {
    constructor() {
        super(Register.type);
    }

    static type = "Register"
} 

export class MemoryBlock extends TypedObject {
    constructor() {
        super(MemoryBlock.type);
    }

    static type = "MemoryBlock"
} 

export class AXIComponent extends TypedObject {
    constructor(init?: Partial<AXIComponent>) {
        super(AXIComponent.type);
        if (init) {
            Object.assign(this, init);
        }
    }
 
    static type = "AXIComponent";
    Name: nullableString = null; 
} 