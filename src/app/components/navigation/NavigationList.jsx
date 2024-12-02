"use client"
import { useState } from "react"
import NavigationItem from "./NavigationItem"
import AddItem from "./AddItem"
import useNavigationOperations from "@/app/customHooks/useNavigationOperations"

export default function NavigationList() {
  const [data, setData] = useState([])
  const { addSibling, addChild, addFirstItem } =
    useNavigationOperations(setData)

  return (
    <div className="bg-gray-100 rounded-md p-8">
      {data.length === 0 ? (
        <AddItem onAdd={addFirstItem} />
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
