import { useState } from "react"
import FormButton from "./FormButton"
import NavigationForm from "./NavigationForm"

export default function NavigationItem({
  data,
  addSibling,
  addChild,
  editNode,
  removeNode,
  isLast,
  isChild = false,
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
    <div className={`flex flex-col`}>
      <div
        className={`flex items-center justify-between bg-white px-4 py-3 border-b border-[#EAECF0] ${
          isChild ? "border-l rounded-bl-md" : ""
        }`}
      >
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
            onClick={toggleChildForm}
          >
            Dodaj pozycję menu
          </FormButton>
        </div>
      </div>

      <div className="ml-16">
        {data.children?.map((child, index) => (
          <NavigationItem
            isChild={true}
            key={child.id}
            data={child}
            addSibling={addSibling}
            addChild={addChild}
            removeNode={removeNode}
            editNode={editNode}
          />
        ))}
      </div>
      {showChildForm && (
        <div className="p-4 bg-[#F9FAFB]">
          <NavigationForm
            onSubmit={handleAddChild}
            onCancel={() => setShowChildForm(false)}
          />
        </div>
      )}
      {isLast ? (
        <FormButton
          variant="secondary"
          additionalStyle="border rounded-md bg-white w-fit my-[20px] ml-[24px]"
          onClick={toggleSiblingForm}
        >
          Dodaj pozycje menu
        </FormButton>
      ) : null}

      {showSiblingForm && (
        <div className="mt-4">
          <NavigationForm
            onSubmit={handleAddSibling}
            onCancel={() => setShowSiblingForm(false)}
          />
        </div>
      )}
      {showEditForm && (
        <div className="my-4">
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
