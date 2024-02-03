export interface ITypedObject {
    $type: string;
}

type nullableString = string | null;

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

export class Buffer extends TypedObject {
    constructor() {
        super(Buffer.type);
    }

    static type = "Buffer"
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