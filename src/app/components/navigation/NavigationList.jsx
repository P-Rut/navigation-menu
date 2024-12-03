"use client"
import { useState } from "react"
import NavigationItem from "./NavigationItem"
import AddItem from "./AddItem"
import useNavigationOperations from "@/app/customHooks/useNavigationOperations"
import FormButton from "./FormButton"

export default function NavigationList() {
  const [data, setData] = useState([])
  const { addSibling, addChild, addFirstItem, editNode, removeNode } =
    useNavigationOperations(setData)

  console.log(data)
  return (
    <div className="bg-gray-100 rounded-md border border-[#D0D5DD] overflow-hidden">
      {data.length === 0 ? (
        <AddItem onAdd={addFirstItem} />
      ) : (
        data.map((item, index) => (
          <NavigationItem
            isLast={data.length === index + 1}
            key={item.id}
            data={item}
            addSibling={addSibling}
            addChild={addChild}
            editNode={editNode}
            removeNode={removeNode}
          />
        ))
      )}
    </div>
  )
}
