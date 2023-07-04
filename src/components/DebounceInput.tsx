import { useEffect, useState } from 'react';


type DebounceInputProps = {
  onChange: (value: string | number | readonly string[] | undefined) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebounceInput = ({
  value: initValue,
  onChange,
  debounce = 250,
  ...inputProps
}: DebounceInputProps) => {
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...inputProps} value={value} onChange={e => setValue(e.target.value)} />
  )
};
