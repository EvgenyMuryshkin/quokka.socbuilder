import { Tools } from "../../lib";

export function Address(props: {address: number}) {
    return <div>{Tools.formatHex(props.address)}</div>
}

export function AddressRange(props: {address: number, range: number}) {
    const { address, range } = props;
    return <div>{Tools.formatHex(address)}-{Tools.formatHex(address + range - 4)}</div>
}