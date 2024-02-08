import { useState } from "react";
import { DragDrop, Tools } from "../../lib";
import { TypedObject } from "../../types";

interface IProps {
    title: string;
    canDrop: (payload: TypedObject) => boolean;
    onDrop: (payload: TypedObject) => void;
}

export function DropComponent(props: IProps) {
    const { title, canDrop, onDrop } = props;
    const [activeDrop, setActiveDrop] = useState(false);

    const canAccept = (event: React.DragEvent<HTMLDivElement>) => {    
        const component = DragDrop.peek<TypedObject>();   
        return canDrop(component);
    }

    const classes = {
        "designed-drop-component": true,
        "designed-drop-component-active": activeDrop
    };

    return (
        <div 
            className={Tools.classNames(classes)}
            onDragEnter={(event) => {
                if (canAccept(event)) {
                    event.stopPropagation();
                    event.preventDefault();

                    setActiveDrop(true);
                    event.dataTransfer.dropEffect = "move";
                }
            }}
            onDragOver={(event) => {
                if (activeDrop) {
                    event.stopPropagation();
                    event.preventDefault();

                    event.dataTransfer.dropEffect = "move";
                }
            }}
            onDragLeave={(event) => {
                if (activeDrop) {
                    event.stopPropagation();
                    event.preventDefault();

                    setActiveDrop(false);
                }
            }} 
            onDrop={(event) => {
                if (activeDrop) {
                    event.stopPropagation();
                    event.preventDefault();

                    setActiveDrop(false);

                    const component = DragDrop.end<TypedObject>();   

                    onDrop(component);
                }
            }}
            >{title}</div>
    )
}