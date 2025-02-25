import { memo, useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "../Button/Button";
import axios from "axios";
import { Input } from "../Input/Input";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export const CreateContentModal = memo(({ open, onClose }: ModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  const addContent = async () => {
    try {
      setLoading(true);
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      console.log({ title, link, type });

      if (!title || !link) {
        alert("Title and link are required.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/content/uploadContent`,
        { link, type, title },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // alert("Content uploaded successfully!");
       if (onClose) onClose();
     
    } catch (error) {
      console.error("Error uploading content:", error);
      alert("Failed to upload content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null; // Prevent rendering when modal is closed

  return (
    <div>
      <div className="w-full h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center"></div>
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center">
        <div className="flex items-center justify-center">
          <span className="bg-white opacity-100 p-4 rounded fixed">
            <div className="flex justify-end cursor-pointer" onClick={onClose}>
              <CrossIcon size="md" />
            </div>
            <div>
              <Input placeholder="Title" ref={titleRef} />
              <Input placeholder="Link" ref={linkRef} />
            </div>
            <div>
              <h1>Type</h1>
              <div className="flex">
                <Button
                  text="Youtube"
                  variant={type === ContentType.Youtube ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Youtube)}
                  size="md"
                />
                <Button
                  text="Twitter"
                  variant={type === ContentType.Twitter ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Twitter)}
                  size="md"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="primary"
                text={loading ? "Submitting..." : "Submit"}
                size="md"
                onClick={addContent}
                loading={loading}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
});
