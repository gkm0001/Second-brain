import  { useEffect } from "react";
import { Card } from "../components/Card/Card";
import useContentStore from "../store/contentStore";

const Cards = () => {
  const { filterContents, loading, error, fetchContents} = useContentStore();

  useEffect(() => {
    fetchContents(); // Fetch only if not already stored
  }, []);

  if (loading && filterContents.length === 0) {
    return <div className="w-full text-center p-4">Loading content...</div>;
  }

  if (error) {
    return <div className="w-full text-center p-4 text-red-500">{error}</div>;
  }

  if (!filterContents || filterContents.length === 0) {
    return <div className="w-full text-center p-4">No content available. Add some content to get started!</div>;
  }
console.log(filterContents);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filterContents.map(({ type, link, title , text , _id}, index) => (
        
        <Card key={`${title}-${index}`} type={type} link={link} title={title} text={text} contentId = {_id}/>
      ))}
    </div>
  );
};

export default Cards;
