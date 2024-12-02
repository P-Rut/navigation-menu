import React from "react"

export default function useNavigationOperations(setData) {
  const addFirstItem = (newItem) => {
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
              { id: crypto.randomUUID(), ...newItem, children: [] },
            ],
          }
        }

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
  return { addFirstItem, addSibling, addChild }
}
