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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <FormInput
          label="Nazwa"
          placeholder="np. Promocje"
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <FormInput
          label={"Link"}
          type="text"
          id="url"
          name="url"
          placeholder="Wklej lub wyszukaj"
          value={formData.url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex gap-2">
        <FormButton
          type="button"
          variant="secondary"
          additionalStyle="border border-gray-300 rounded-md"
          onClick={onCancel}
        >
          Anuluj
        </FormButton>
        <FormButton type="submit" additionalStyle="rounded-md">
          Dodaj
        </FormButton>
      </div>
    </form>
  )
}
