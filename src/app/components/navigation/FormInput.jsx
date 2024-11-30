import React from "react"

export default function FormInput({ label, placeholder, onChange, name }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="nameInput" className="text-sm font-medium text-[#344054]">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 border border-[#D0D5DD] rounded-md text-sm placeholder:text-gray-400"
      />
    </div>
  )
}
