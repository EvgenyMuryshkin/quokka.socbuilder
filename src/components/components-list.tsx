import { DragDrop } from "../lib";
import { ComponentsLibrary } from "../tools";
import "./components-list.scss"

interface IProps {
    componentsLibrary: ComponentsLibrary;
}

export function ComponentsList(props: IProps) {
    const { componentsLibrary } = props;
    const components = componentsLibrary.getComponents();

    return (
        <div>
            {components.map(c => {
                return (
                    <div 
                        key={c.Name} 
                        className="component-list-item" 
                        draggable
                        onDragStart={(event) => {
                            DragDrop.begin(c);
                            event.dataTransfer.dropEffect = "move";
                        }}
                        onDragEnd={() => {
                            DragDrop.end();
                        }}
                        >{c.Name}
                    </div>
                )
            })}
        </div>
    );
}