"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a740453f-77cb-49ff-a401-143b162503da")
  })

  return null
}
export default CrispChat
