"use client"
import { useState } from "react"
import { DndContext, rectIntersection } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import NavigationItem from "./NavigationItem"
import AddItem from "./AddItem"
import FormButton from "./FormButton"
import NavigationForm from "./NavigationForm"
import useNavigationOperations from "@/app/customHooks/useNavigationOperations"

export default function NavigationList() {
  const [data, setData] = useState([])
  const [showSiblingForm, setShowSiblingForm] = useState(false)
  const [siblingParentId, setSiblingParentId] = useState(null)
  const { addSibling, addChild, addFirstItem, editNode, removeNode } =
    useNavigationOperations(setData)

  const toggleSiblingForm = (parentId) => {
    setSiblingParentId(parentId)
    setShowSiblingForm((prev) => !prev)
  }

  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = findItemById(item.children, id)
        if (found) return found
      }
    }
    return null
  }

  const removeItemById = (items, id) => {
    let removedItem = null

    const updatedItems = items.filter((item) => {
      if (item.id === id) {
        removedItem = item
        return false
      }

      if (item.children) {
        const [updatedChildren, foundItem] = removeItemById(item.children, id)
        if (foundItem) removedItem = foundItem
        item.children = updatedChildren
      }

      return true
    })

    return [updatedItems, removedItem]
  }

  const insertItemById = (items, targetId, itemToInsert) => {
    return items.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          children: [...(item.children || []), itemToInsert],
        }
      }

      if (item.children) {
        return {
          ...item,
          children: insertItemById(item.children, targetId, itemToInsert),
        }
      }

      return item
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setData((items) => {
      const [updatedItems, activeItem] = removeItemById(items, active.id)
      if (!activeItem) return items

      const insertAtSameLevel = (list, overId, activeItem) => {
        const index = list.findIndex((item) => item.id === overId)
        if (index !== -1) {
          const before = list.slice(0, index)
          const after = list.slice(index)
          return [...before, activeItem, ...after]
        }
        return list.map((item) => {
          if (item.children) {
            return {
              ...item,
              children: insertAtSameLevel(item.children, overId, activeItem),
            }
          }
          return item
        })
      }

      return insertAtSameLevel(updatedItems, over.id, activeItem)
    })
  }

  const handleAddSibling = (formData) => {
    const newItem = {
      id: crypto.randomUUID(),
      label: formData.label,
      url: formData.url,
      children: [],
    }
    if (siblingParentId === null) {
      setData((prevData) => [...prevData, newItem])
    } else {
      addSibling(siblingParentId, newItem)
    }
    setShowSiblingForm(false)
  }

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <div className="bg-[#F9FAFB] rounded-md border border-[##EAECF0] overflow-hidden">
          {data.length === 0 ? (
            <AddItem onAdd={addFirstItem} />
          ) : (
            <>
              {data.map((item) => (
                <NavigationItem
                  key={item.id}
                  data={item}
                  addChild={addChild}
                  editNode={editNode}
                  removeNode={removeNode}
                />
              ))}
            </>
          )}

          {data.length > 0 && (
            <FormButton
              variant="secondary"
              additionalStyle="border rounded-md bg-white w-fit my-[20px] ml-[24px] font-[600]"
              onClick={() => toggleSiblingForm(null)}
            >
              Dodaj pozycję menu
            </FormButton>
          )}
        </div>
      </SortableContext>

      {showSiblingForm && (
        <div className="mt-4">
          <NavigationForm
            onSubmit={handleAddSibling}
            onCancel={() => setShowSiblingForm(false)}
          />
        </div>
      )}
    </DndContext>
  )
}
