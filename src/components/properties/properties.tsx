import { ITypedObject, MemoryBlock, Register, SoCComponent, TypedObject } from "../../types"
import { MemoryBlockProperties } from "./memory-block-properties";
import "./properties.scss";
import { RegisterProperties } from "./register-properties";

interface IProps {
  selection: TypedObject;
  onUpdate: (object: SoCComponent) => void;
}

export function PropertiesComponent(props: IProps) {
  const { selection, onUpdate } = props;

  const renderer = {
    [Register.type]: () => <RegisterProperties register={selection as Register} onUpdate={onUpdate}/>,
    [MemoryBlock.type]: () => <MemoryBlockProperties memoryBlock={selection as MemoryBlock} onUpdate={onUpdate}/>
  }

  if (!renderer[selection?.$type]) {
    return (
      <div className="properties">
        No properties for {selection?.$type}
      </div>
    )
  }

  return (
      <div className="properties">
        {renderer[selection?.$type]()}
      </div>
  )
}
