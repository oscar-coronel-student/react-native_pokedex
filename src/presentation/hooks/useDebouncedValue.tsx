import { useEffect, useState } from "react"


interface Props {
    value?: string
    timer?: number
}

export const useDebouncedValue = ({
    value = '',
    timer = 500
}: Props) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, timer);

        return () => {
            clearTimeout(timeout);
        }
    }, [value]);


    return {
        debouncedValue,
    }
}
