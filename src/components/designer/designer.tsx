import { useState } from "react";
import "./designer.scss"
import { Bus } from "../../types/types";
import { DropComponent } from "./drop-component";
import { Tools } from "../../lib";

export function Designer() {
    const [bus, setBus] = useState<Bus[]>([new Bus()]);
/*
            onDragEnter={(event) => {
                event.dataTransfer.dropEffect = "move";

                console.log("event items", event.dataTransfer.items);
                
                const payload = event.dataTransfer.getData("application/json");
                const conponent = Tools.parseJSON(payload);
                console.log("drag enter", conponent);
            }}
            onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
            }}
            onDragLeave={(event) => {
                console.log("drag leave", event)
            }} 
            onDrop={(event) => {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";

                const payload = event.dataTransfer.getData("application/json");
                const conponent = JSON.parse(payload);
                console.log("drop", conponent);
                setBus((current) => [...current, new Bus()]);
            }}


            */
    return (
        <div 
            className="designer"

        >
            {bus.map((b, idx) => {
                return <div key={idx} className="designer-bus"></div>
            })}
            
            <DropComponent title="Drop bus here" acceptAXIComponentTypes={[Bus.type]}/>

        </div>
    )
}