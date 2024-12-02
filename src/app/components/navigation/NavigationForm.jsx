import { useState } from "react"
import FormInput from "./FormInput"
import FormButton from "./FormButton"

export default function NavigationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ label: "", url: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.label.trim()) {
      alert("Nazwa jest wymagana.")
      return
    }
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white px-[24px] py-[20px] rounded-md border border-[#D0D5DD]"
    >
      <div className=" flex flex-col gap-2">
        <FormInput
          label="Nazwa"
          placeholder="np. Promocje"
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
        />
        <FormInput
          label={"Link"}
          type="text"
          id="url"
          name="url"
          placeholder="Wklej lub wyszukaj"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <FormButton
          type="button"
          variant="secondary"
          additionalStyle="border border-gray-300 rounded-md shadow-sm font-[600]"
          onClick={onCancel}
        >
          Anuluj
        </FormButton>
        <FormButton
          variant="secondary"
          type="submit"
          additionalStyle="rounded-md border border-[#D6BBFB] text-[#6941C6] shadow-sm font-[600]"
        >
          Dodaj
        </FormButton>
      </div>
    </form>
  )
}
