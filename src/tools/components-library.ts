import { SoCComponentInfo, ITypedObject } from "../types";

export class ComponentsLibrary {
    constructor(private components: SoCComponentInfo[] = []) {

    }

    getComponents() {
        return this.components;
    }

    isTopLevel(obj: ITypedObject) {
        const info = this.components.find(c => c.Name === obj?.$type);
        return info?.IsTopLevel ?? false;
    }

    isMaster(obj: ITypedObject) {
        const info = this.components.find(c => c.Name === obj?.$type);
        return info?.IsMaster ?? false;
    }

    isSlave(obj: ITypedObject) {
        const info = this.components.find(c => c.Name === obj?.$type);
        return info?.IsSlave ?? false;
    }
}   