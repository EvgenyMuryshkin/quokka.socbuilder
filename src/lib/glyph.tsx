import { BsUpload, BsXLg, BsArrowClockwise } from "react-icons/bs";
import { IconBaseProps } from "react-icons";

export type glyphIcon = "remove" | "upload" | "refresh";

interface IProps {
    icon: glyphIcon;
    className?: string;
    onClick?: () => void;
}

export function Glyph(props: IProps) {
    const { icon, className, onClick } = props;
    const iconProps: IconBaseProps = {
        className,
        onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick?.();
        }
    };

    switch (icon) {
        case "remove": return <BsXLg {...iconProps} />;
        case "upload": return <BsUpload {...iconProps}/>
        case "refresh": return <BsArrowClockwise {...iconProps}/>
        default: return null;
    }
}