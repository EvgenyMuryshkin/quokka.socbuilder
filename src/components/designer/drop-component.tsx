import { useState } from "react";
import { DragDrop, Tools } from "../../lib";
import { AXIComponent, TypedObject } from "../../types/types";

interface IProps {
    title: string;
    acceptAXIComponentTypes: string[];
}

export function DropComponent(props: IProps) {
    const { title, acceptAXIComponentTypes } = props;
    const [activeDrop, setActiveDrop] = useState(false);

    const canAccept = (event: React.DragEvent<HTMLDivElement>) => {    
        const component = DragDrop.peek<TypedObject>();   

        switch (component?.$type) {
            case AXIComponent.type: {
                const axiComponent = DragDrop.peek<AXIComponent>();   
                return acceptAXIComponentTypes.includes(axiComponent?.Name);
            }
        }

        return false;
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

                    console.log("DropComponent: drop", component)
                }
            }}
            >{title}</div>
    )
}