export default function FormInput({
  label,
  placeholder,
  onChange,
  name,
  value,
}) {
  return (
    <div className="flex flex-col gap-[6px] ">
      <label
        htmlFor="nameInput"
        className="text-sm text-[14px] font-[500] leading-[20px] text-[#344054]"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full py-2 px-3 border border-[#D0D5DD] shadow-sm rounded-md text-[16px] leading-[24px] font-[400] placeholder:text-[#667085] box-border text-[#344054]"
      />
    </div>
  )
}
