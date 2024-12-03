import { useState } from "react"
import FormInput from "./FormInput"
import FormButton from "./FormButton"
import { z } from "zod"

export default function NavigationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ label: "", url: "" })

  const [errors, setErrors] = useState({})

  const schema = z.object({
    label: z.string().nonempty("Nazwa jest wymagana."),
    url: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(value),
        "Wprowadź poprawny link."
      ),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validation = schema.safeParse(formData)

    if (!validation.success) {
      const fieldErrors = validation.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      )
      setErrors(fieldErrors)
      return
    }

    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white px-[24px] py-[20px] rounded-md border border-[#D0D5DD]"
    >
      <div className="flex flex-col gap-2">
        <FormInput
          label="Nazwa"
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="np. Promocje"
        />
        {errors.label && <p className="text-sm text-red-600">{errors.label}</p>}

        <FormInput
          label="Link"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Wklej lub wyszukaj"
        />
        {errors.url && <p className="text-sm text-red-600">{errors.url}</p>}
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
