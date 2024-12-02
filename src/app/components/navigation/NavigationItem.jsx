import { useState } from "react"
import FormButton from "./FormButton"
import NavigationForm from "./NavigationForm"

export default function NavigationItem({ data, addSibling, addChild }) {
  const [showChildForm, setShowChildForm] = useState(false)
  const [showSiblingForm, setShowSiblingForm] = useState(false)

  const toggleChildForm = () => setShowChildForm((prev) => !prev)
  const toggleSiblingForm = () => setShowSiblingForm((prev) => !prev)

  const handleAddSibling = (formData) => {
    const newItem = {
      id: crypto.randomUUID(), // Add unique ID
      label: formData.label,
      url: formData.url,
      children: [],
    }
    addSibling(data.id, newItem)
    setShowSiblingForm(false)
  }

  const handleAddChild = (formData) => {
    const newItem = {
      id: crypto.randomUUID(), // Add unique ID
      label: formData.label,
      url: formData.url,
      children: [],
    }
    addChild(data.id, newItem)
    setShowChildForm(false)
  }

  return (
    <div className="flex flex-col border rounded-md gap-4 p-4">
      <div className="flex items-center justify-between bg-white rounded-md px-4 py-3 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3">
          <span className="cursor-move text-gray-400">➕</span>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{data.label}</span>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 no-underline"
            >
              {data.url || "Brak URL"}
            </a>
          </div>
        </div>

        <div className="flex">
          <FormButton variant="secondary" additionalStyle="border rounded-l-md">
            Usuń
          </FormButton>
          <FormButton variant="secondary" additionalStyle="border-y">
            Edytuj
          </FormButton>
          <FormButton
            variant="secondary"
            additionalStyle="border rounded-r-md"
            onClick={toggleSiblingForm}
          >
            Dodaj na tym poziomie
          </FormButton>
        </div>
      </div>

      <div className="ml-6">
        {data.children?.map((child) => (
          <NavigationItem
            key={child.id}
            data={child}
            addSibling={addSibling}
            addChild={addChild}
          />
        ))}
      </div>

      <FormButton
        variant="secondary"
        additionalStyle="border rounded-md bg-white w-fit mt-2"
        onClick={toggleChildForm}
      >
        Dodaj wewnętrzny element
      </FormButton>

      {showSiblingForm && (
        <div className="mt-4">
          <NavigationForm
            onSubmit={handleAddSibling}
            onCancel={() => setShowSiblingForm(false)}
          />
        </div>
      )}

      {showChildForm && (
        <div className="mt-4">
          <NavigationForm
            onSubmit={handleAddChild}
            onCancel={() => setShowChildForm(false)}
          />
        </div>
      )}
    </div>
  )
}
