// Cards.jsx
// This component is responsible for rendering a grid of content cards.
// It fetches the content data from the global state using the `useContentStore` hook.
// The component handles loading, error, and empty state scenarios gracefully.

import React from "react"
import { Card } from "../components/Card/Card"
import useContentStore from "../store/contentStore"

/**
 * Cards Component
 * 
 * This component fetches content from the global state and displays it as a grid of cards.
 * It handles three main states:
 * 1. Loading State: Displays a loading message while data is being fetched.
 * 2. Error State: Displays an error message if data fetching fails.
 * 3. Empty State: Informs the user if no content is available.
 * 
 * @returns {JSX.Element} A grid of content cards or an appropriate state message.
 */
const Cards = () => {
  // Fetch content data, loading state, and error from the store
  const { contents, loading, error } = useContentStore()
  
  // Display loading state if data is being fetched
  if (loading && contents.length === 0) {
    return <div className="w-full text-center p-4">Loading content...</div>
  }
  
  // Display error message if fetching data fails
  if (error) {
    return <div className="w-full text-center p-4 text-red-500">{error}</div>
  }
  
  // Display message if no content is available
  if (!contents || contents.length === 0) {
    return <div className="w-full text-center p-4">No content available. Add some content to get started!</div>
  }
  
  // Render a grid of content cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {contents.map(({ type, link, title }, index) => (
        <Card key={`${title}-${index}`} type={type} link={link} title={title} />
      ))}
    </div>
  )
}

export default Cards