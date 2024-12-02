import { useState } from "react"
import FormButton from "./FormButton"
import NavigationForm from "./NavigationForm"

export default function NavigationItem({
  data,
  addSibling,
  addChild,
  editNode,
  removeNode,
}) {
  const [showChildForm, setShowChildForm] = useState(false)
  const [showSiblingForm, setShowSiblingForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const toggleChildForm = () => setShowChildForm((prev) => !prev)
  const toggleSiblingForm = () => setShowSiblingForm((prev) => !prev)
  const toggleEditForm = () => setShowEditForm((prev) => !prev)

  const handleAddSibling = (formData) => {
    const newItem = {
      id: crypto.randomUUID(),
      label: formData.label,
      url: formData.url,
      children: [],
    }
    addSibling(data.id, newItem)
    setShowSiblingForm(false)
  }

  const handleAddChild = (formData) => {
    const newItem = {
      id: crypto.randomUUID(),
      label: formData.label,
      url: formData.url,
      children: [],
    }
    addChild(data.id, newItem)
    setShowChildForm(false)
  }

  const handleUpdateNode = (formData) => {
    toggleEditForm()
    editNode(data.id, formData)
  }

  const handleRemoveNode = () => {
    removeNode(data.id)
  }

  return (
    <div className="flex flex-col border rounded-md gap-4 ">
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
          <FormButton
            onClick={handleRemoveNode}
            variant="secondary"
            additionalStyle="border rounded-l-md"
          >
            Usuń
          </FormButton>
          <FormButton
            onClick={handleUpdateNode}
            variant="secondary"
            additionalStyle="border-y"
          >
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
        {data.children?.map((child, index) => (
          <NavigationItem
            key={child.id}
            data={child}
            addSibling={addSibling}
            addChild={addChild}
            removeNode={removeNode}
            editNode={editNode}
          />
        ))}
      </div>

      <FormButton
        variant="secondary"
        additionalStyle="border rounded-md bg-white w-fit mb-[20px] ml-[24px]"
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
      {showEditForm && (
        <div className="mt-4">
          <NavigationForm
            onSubmit={(formData) => {
              editNode(data.id, formData)
              setShowEditForm(false)
            }}
            onCancel={() => setShowEditForm(false)}
          />
        </div>
      )}
    </div>
  )
}
