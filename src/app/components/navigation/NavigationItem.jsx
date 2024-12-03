import { useState } from "react"
import FormButton from "./FormButton"
import NavigationForm from "./NavigationForm"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import moveIcon from "../../../../public/move.svg"
import Image from "next/image"

export default function NavigationItem({
  data,
  addChild,
  editNode,
  removeNode,
  isChild = false,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [showChildForm, setShowChildForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const toggleChildForm = () => setShowChildForm((prev) => !prev)
  const toggleEditForm = () => setShowEditForm((prev) => !prev)

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

  const handleRemoveNode = () => {
    removeNode(data.id)
  }

  return (
    <div ref={setNodeRef} style={style} className={`flex flex-col`}>
      <div
        className={`flex items-center justify-between bg-white px-4 py-3 border-b border-[#EAECF0] ${
          isChild ? "border-l rounded-bl-md" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className="cursor-move text-gray-400"
            {...attributes}
            {...listeners}
          >
            <Image src={moveIcon} alt="icon" />
          </span>
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
            onClick={toggleEditForm}
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

      <SortableContext
        items={data.children || []}
        strategy={verticalListSortingStrategy}
      >
        <div className="ml-16">
          {data.children?.map((child) => (
            <NavigationItem
              isChild={true}
              key={child.id}
              data={child}
              addChild={addChild}
              removeNode={removeNode}
              editNode={editNode}
            />
          ))}
        </div>
      </SortableContext>

      {showChildForm && (
        <div className="p-4 bg-[#F9FAFB]">
          <NavigationForm
            onSubmit={handleAddChild}
            onCancel={() => setShowChildForm(false)}
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
