import { AXIComponent } from "../types/types";
import "./components-list.scss"

interface IProps {
    components: AXIComponent[];
}
export function ComponentsList(props: IProps) {
    const { components } = props;
    return (
        <div>
            {components.map(c => {
                return (
                    <div 
                        key={c.Name} 
                        className="component-list-item" 
                        draggable
                        onDragStart={(event) => {
                            event.dataTransfer.setData("application/json", JSON.stringify(c))
                            event.dataTransfer.dropEffect = "move";
                        }}
                        >{c.Name}
                    </div>
                )
            })}
        </div>
    );
}