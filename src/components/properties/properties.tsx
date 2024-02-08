import { Register, TypedObject } from "../../types"
import "./properties.scss";
import { RegisterProperties } from "./register-properties";

interface IProps {
  selection: TypedObject;
}

export function PropertiesComponent(props: IProps) {
  const { selection } = props;

  const renderer = {
    [Register.type]: () => <RegisterProperties register={selection as Register}/>
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
