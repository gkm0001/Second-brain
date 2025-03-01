import { ShareIcon } from "../../icons/ShareIcon";
import { XEmbed, YouTubeEmbed } from "react-social-media-embed";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  key?: any;
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="bg-white rounded-xl p-4 w-[18rem]  border border-gray-200 shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-md truncate pr-2">
          <div className="text-gray-500 pr-2 flex-shrink-0">
            <ShareIcon size="md" />
          </div>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a href={link} target="_blank" className="text-gray-500">
            <ShareIcon size="md" />
          </a>
          <div className="text-gray-500">
            <ShareIcon size="md" />
          </div>
        </div>
      </div>
      
      {/* Embedded Content */}
      <div className="">
        {type === "youtube" && (
            <YouTubeEmbed url={link} width="100%" />
        )}
        {type === "twitter" && (
                <XEmbed url={link} width="100%" style={{ overflow: 'visible' }}/>
            
        )}
      </div>
    </div>
  );
}