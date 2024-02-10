import { Gateway, Interconnect, MemoryBlock, Register, SoC, SoCComponent, TypedObject } from "../../types"
import { GatewayProperties } from "./gateway-properties";
import { InterconnectProperties } from "./interconnect-properties";
import { MemoryBlockProperties } from "./memory-block-properties";
import "./properties.scss";
import { RegisterProperties } from "./register-properties";

interface IProps {
  soc: SoC,
  selection: TypedObject;
  onUpdate: (object: SoCComponent) => void;
}

export function PropertiesComponent(props: IProps) {
  const { soc, selection, onUpdate } = props;

  const renderer = {
    [Register.type]: () => <RegisterProperties register={selection as Register} onUpdate={onUpdate}/>,
    [MemoryBlock.type]: () => <MemoryBlockProperties memoryBlock={selection as MemoryBlock} onUpdate={onUpdate}/>,
    [Gateway.type]: () => <GatewayProperties soc={soc} gateway={selection as Gateway} onUpdate={onUpdate}/>,
    [Interconnect.type]: () => <InterconnectProperties soc={soc} interconnect={selection as Interconnect} onUpdate={onUpdate}/>,
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
