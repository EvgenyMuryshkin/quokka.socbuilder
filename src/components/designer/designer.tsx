import "./designer.scss"

export function Designer() {
    return (
        <div 
            className="designer"
            onDragEnter={(event) => {
                console.log("drag enter", event);
                event.dataTransfer.dropEffect = "move";
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
            }}
        >-</div>
    )
}