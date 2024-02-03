import { nullableString } from "../types/types";
import { Tools } from "./tools";

export class DragDrop {
    private static dragDropPayload: any = null;

    static peek<T>() {
        const result: T = DragDrop.dragDropPayload;
        return result;
    }
    
    static isActive() {
        return DragDrop.dragDropPayload !== null && DragDrop.dragDropPayload !== undefined;
    }

    static begin(payload: any) {
        if (payload === null) return false;
        if (payload === undefined) return false;
        if (DragDrop.isActive()) return false;

        DragDrop.dragDropPayload = payload;

        return true;
    }

    static end<T>() {
        const result: T = DragDrop.dragDropPayload;
        DragDrop.dragDropPayload = null;
        return result;
    }
}