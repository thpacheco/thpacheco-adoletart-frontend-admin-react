import { TextInput } from "grommet";
import React from "react";

const CurrencyInput = () => {
    const valueRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState<boolean>(false);
    const [value, dispatchValue] = React.useReducer(
        (state: string, newValue: string) => {
            debugger;
            const [formattedWholeValue, decimalValue = "0"] = newValue.split(",");
            const signifantValue = formattedWholeValue.replace(/,/g, "");
            const floatValue = parseFloat(
                signifantValue + "." + decimalValue.slice(0, 2)
            );
            if (isNaN(floatValue) === false) {
                let n = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(floatValue);
                if (newValue.includes(",") && !n.includes(",")) {
                    return n + ",00";
                }
                return n;
            }
            return "0";
        },
        ""
    );

    return (
        <TextInput id="text-input-id" name="price"
            type="text"
            value={value}
            pattern="d+(.d{2})?"
            ref={valueRef}
            onChange={(e) => dispatchValue(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} />
    );
};

export default CurrencyInput