type TextInputProps = {
  id?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  label: string;
  error?: string;
  name?: string;
  className?: string;
  placeholder?: string; 
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
  className,
  placeholder, 
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        name={name}
        type="text"
        id={id}
        style={style}
        value={value}
        onChange={onChange}
        className={`input ${className ?? ""}`}
        placeholder={placeholder} 
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
