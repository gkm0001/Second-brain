import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, ShareIcon } from "../../icons/Icon";
import { useEffect, useState } from "react";
import useContentStore from "../../store/contentStore";

interface CardProps {
  title: string;
  link?: string;
  text?: string;
  contentId : string;
  type?: "twitter" | "youtube" | "linkedin" | "image" | "other";
  key?: any;
}

export function Card({ title, link, type,text , contentId}: CardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { deleteContent} = useContentStore();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleDelete = async() => {
      if(!contentId) console.error('Error while delete the content')
      try{
         await deleteContent(contentId);
         alert('Items deleted successfully')
       }
       catch(error){
        console.log("Some error happened please try after some time");
        
       }
  }
  return (
    <div className="bg-white rounded-xl p-4 w-[18rem]  border border-gray-200 shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-md truncate pr-2">
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a href={link} target="_blank" className="text-gray-500">
            <ShareIcon size="md" />
          </a>
          <div className="text-gray-500 cursor-pointer" onClick={handleDelete}>
            <DeleteIcon/>
          </div>
        </div>
      </div>
     
       { text && (
          <div>
            {text}
          </div>
       ) }
    </div>
  );
} 