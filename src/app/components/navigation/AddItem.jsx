import { useState } from "react"
import Image from "next/image"
import plusCircleIcon from "/public/plus-circle.svg"
import NavigationForm from "./NavigationForm"

export default function AddItem({ onAdd }) {
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm((prev) => !prev)
  }

  const onCancel = () => {
    setShowForm(false)
  }

  const handleAdd = (newItem) => {
    onAdd(newItem)
    setShowForm(false)
  }

  if (showForm) {
    return (
      <div className="w-full">
        <NavigationForm onSubmit={handleAdd} onCancel={onCancel} />
      </div>
    )
  }

  return (
    <div className="bg-[#F9FAFB] rounded-md w-full flex flex-col gap-6 text-center justify-center items-center p-6 border border-[#EAECF0]">
      <div className="text">
        <p className="text-[#101828] font-semibold text-[16px]">
          Menu jest puste
        </p>
        <p className="text-[#475467] text-[14px] font-[400]">
          W tym menu nie ma jeszcze żadnych linków.
        </p>
      </div>
      <button
        onClick={toggleForm}
        className="bg-[#7F56D9] text-[14px] font-[600] rounded-lg text-white flex justify-center items-center py-[10px] px-[14px] gap-[5px] box-border leading-[20px]"
      >
        <Image src={plusCircleIcon} alt="icon" width={20} height={20} />
        Dodaj pozycję menu
      </button>
    </div>
  )
}
