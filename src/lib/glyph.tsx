import { BsXLg } from "react-icons/bs";
import { IconBaseProps } from "react-icons";

export type glyphIcon = "remove";

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
        default: return null;
    }
}