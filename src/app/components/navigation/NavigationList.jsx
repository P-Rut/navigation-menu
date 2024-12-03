"use client"
import { useState } from "react"
import { DndContext, closestCenter, closestCorners } from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
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

    // Nie wykonujemy akcji, jeśli brak `over` lub przeciągnięcie nie zmienia pozycji
    if (!over || active.id === over.id) return

    setData((items) => {
      const [newItems, activeItem] = removeItemById(items, active.id)

      // Jeśli nie znaleziono elementu, wracamy do poprzedniego stanu
      if (!activeItem) return items

      // Znajdź `overItem`, element, na który upuszczono
      const overItem = findItemById(newItems, over.id)

      if (overItem) {
        // Sprawdź, czy `over` element ma jakieś dzieci
        if (overItem.children) {
          overItem.children.push(activeItem)
        } else {
          overItem.children = [activeItem]
        }
      } else {
        // Element został upuszczony na najwyższy poziom listy
        newItems.push(activeItem)
      }

      return newItems
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
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <div className="bg-gray-100 rounded-md border border-[#D0D5DD] overflow-hidden">
          {data.length === 0 ? (
            <AddItem onAdd={addFirstItem} />
          ) : (
            <>
              {data.map((item, index) => (
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
        </div>
      </SortableContext>

      <FormButton
        variant="secondary"
        additionalStyle="border rounded-md bg-white w-fit my-[20px] ml-[24px]"
        onClick={() => toggleSiblingForm(null)}
      >
        Dodaj na tym poziomie
      </FormButton>

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
