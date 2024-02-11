import { BsUpload, BsXLg } from "react-icons/bs";
import { IconBaseProps } from "react-icons";

export type glyphIcon = "remove" | "upload";

interface IProps {
    icon: glyphIcon;
    onClick?: () => void;
}

export function Glyph(props: IProps) {
    const { icon, onClick } = props;
    const iconProps: IconBaseProps = {
        onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick?.();
        }
    };

    switch (icon) {
        case "remove": return <BsXLg {...iconProps} />;
        case "upload": return <BsUpload {...iconProps}/>
        default: return null;
    }
}