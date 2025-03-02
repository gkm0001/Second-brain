// Cards.jsx
import React from "react"
import { Card } from "../components/Card/Card"
import useContentStore from "../store/contentStore"

const Cards = () => {
  const { contents, loading, error } = useContentStore()
  
  if (loading && contents.length === 0) {
    return <div className="w-full text-center p-4">Loading content...</div>
  }
  
  if (error) {
    return <div className="w-full text-center p-4 text-red-500">{error}</div>
  }
  
  if (!contents || contents.length === 0) {
    return <div className="w-full text-center p-4">No content available. Add some content to get started!</div>
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {contents.map(({ type, link, title }, index) => (
        <Card key={`${title}-${index}`} type={type} link={link} title={title} />
      ))}
    </div>
  )
}

export default Cards