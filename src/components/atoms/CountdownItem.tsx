interface CountdownItemProps {
  value: number;
  label: string;
}

export default function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="countdown__item">
      <div className="countdown__value">
        {value}
      </div>
      <div className="countdown__label">{label}</div>
    </div>
  );
}
