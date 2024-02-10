import { SoC } from "../../types";

export function textField(
    name: string,
    value: string,
    onUpdate: (value: string) => void) {
    return (
        <div>
            <div>{name}:</div>
            <div><input type="text" value={value} onChange={(e) => onUpdate(e.target.value)}/></div>
        </div>
    )
}

export function numberField(
    name: string,
    value: number,
    onUpdate: (value: number) => void) {
    return (
        <div>
            <div>{name}:</div>
            <div><input type="number" value={value} onChange={(e) => onUpdate(parseInt(e.target.value))}/></div>
        </div>
    )
}

export function socIdField(
    soc: SoC,
    name: string,
    type: string,
    value: string,
    onUpdate: (value: string) => void) {
    
    const components = soc.Components.filter(c => c.$type == type);

    return (
        <div>
            <div>{name}:</div>
            <div>
                <select value={value} onChange={(s) => onUpdate(s.target.value)}>
                    <option>Select ...</option>
                    {components.map(c => <option value={c.Id} selected={c.Id == value}>{c.Name}</option>)}
                </select>
            </div>
        </div>
    )
}

export function hexField(
    name: string,
    value: number,
    onUpdate: (value: number) => void) {
    const hexValue = value.toString(16).toUpperCase();
    return (
        <div>
            <div>{name}:</div>
            <div>
                <input 
                    type="text" 
                    value={hexValue} 
                    onChange={(e) => {
                        const parsed = parseInt(e.target.value, 16) || 0;
                        onUpdate(parsed);
                    }}
                />
            </div>
        </div>
    )
}