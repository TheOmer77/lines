import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const LabeledInput = ({
  id,
  label,
  ...props
}: { label: string } & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => (
  <div className='labeled-input'>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props} />
  </div>
);

export default LabeledInput;
