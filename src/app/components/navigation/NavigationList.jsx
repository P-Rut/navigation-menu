"use client"

import { useState } from "react"
import NavigationItem from "./NavigationItem"
import AddItem from "./AddItem"

export default function NavigationList() {
  const [data, setData] = useState([])

  const handleAddItem = (newItem) => {
    setData((prev) => [...prev, { id: Date.now(), ...newItem, children: [] }])
  }

  const addSibling = (siblingId, newItem) => {
    setData((prev) => {
      const index = prev.findIndex((item) => item.id === siblingId)
      const updatedData = [...prev]
      updatedData.splice(index + 1, 0, {
        id: Date.now(),
        ...newItem,
        children: [],
      })
      return updatedData
    })
  }

  const addChild = (parentId, newItem) => {
    const addToTree = (items) =>
      items.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [
                ...item.children,
                { id: Date.now(), ...newItem, children: [] },
              ],
            }
          : { ...item, children: addToTree(item.children || []) }
      )
    setData((prev) => addToTree(prev))
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
