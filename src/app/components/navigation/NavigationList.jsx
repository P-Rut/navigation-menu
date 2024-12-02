"use client"

import { useState } from "react"
import NavigationItem from "./NavigationItem"
import AddItem from "./AddItem"

export default function NavigationList() {
  const [data, setData] = useState([])

  const handleAddItem = (newItem) => {
    setData((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...newItem, children: [] },
    ])
  }
  const addSibling = (siblingId, newItem) => {
    const addToSameLevel = (items) => {
      let result = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.id === siblingId) {
          result.push(item)
          result.push({
            id: crypto.randomUUID(),
            ...newItem,
            children: [],
          })
        } else {
          const newItem = {
            ...item,
            children: item.children ? addToSameLevel(item.children) : [],
          }
          result.push(newItem)
        }
      }

      return result
    }

    setData((prevData) => addToSameLevel(prevData))
  }

  const addChild = (parentId, newItem) => {
    const addToTree = (items) => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [
              ...item.children,
              { id: crypto.randomUUID(), ...newItem, children: [] }, // Możesz zamienić na uuid()
            ],
          }
        }

        // Jeśli nie znaleziono, przetwarzaj dzieci rekurencyjnie
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: addToTree(item.children),
          }
        }

        return item
      })
    }

    setData((prev) => {
      const newState = addToTree(prev)
      return newState.length ? newState : prev
    })
  }

  return (
    <div className="bg-gray-100 rounded-md p-8">
      {data.length === 0 ? (
        <AddItem onAdd={handleAddItem} />
      ) : (
        data.map((item) => (
          <NavigationItem
            key={item.id}
            data={item}
            addSibling={addSibling}
            addChild={addChild}
          />
        ))
      )}
    </div>
  )
}
