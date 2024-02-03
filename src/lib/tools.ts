export class Tools {
    public static hasValue(value: React.ReactNode) {
        if (!value) return false;
        if (typeof value == "string") {
            const text = value as string;
            return (text && text.trim && text.trim() != "") ? true : false;
        }

        return true;
    }

    public static classNames(classes: { [key: string]: boolean }): string {
        if (!classes) {
            return "";
        }

        return Object.keys(classes)
            .filter(c => Tools.hasValue(c) && classes[c])
            .reduce((p, c) => {
                if (p != "")
                    p += " ";
                p += c;

                return p;
            }, "");
    }

    public static parseJSON<T>(json: string): T | null {
        if (!Tools.hasValue(json)) return null;

        try {
            const result: T = JSON.parse(json);
            return result;
        }
        catch {
            return null;
        }
    }
}