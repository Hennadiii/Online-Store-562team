interface props {
  label: string;
  value: string;
}

const Characteristic: React.FC<props> = ({ label, value }) => {
  return (
    <div className="flex h-[53px] w-full max-w-[626px] items-end justify-between gap-x-3 border-t-2">
      <span className="text-[24px] leading-[120%]">{label}</span>
      <span className="text-[20px] leading-[120%]">{value}</span>
    </div>
  );
};

export default Characteristic;
