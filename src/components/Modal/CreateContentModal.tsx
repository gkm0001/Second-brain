// CreateContentModal.jsx
import { useRef, useState } from "react"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import useContentStore from "../../store/contentStore"
import { CrossIcon } from "../../icons/Icon"

interface ModalProps {
  open?: boolean
  onClose?: () => void
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Linkedin = "linkedin",
  Text = "article",
  Image = "image",
}

export const CreateContentModal = ({ open, onClose }: ModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)
  const [type, setType] = useState(ContentType.Text)
  const { addContent, loading } = useContentStore()
  
  const handleSubmit = async () => {
    const title = titleRef.current?.value
    const link = linkRef.current?.value
    const text = textRef.current?.value

    if (!title || !link || !text) {
      alert("Title and link are required.")
      return
    }


    // const content =  await extractTextFromUrl(link , type)
    // console.log(title);
    // console.log(link);
    
    
    const success = await addContent(title, link, text,  type)
    
    if (success) {
      alert("Content uploaded successfully!")
      // Clear inputs
      if (titleRef.current) titleRef.current.value = ""
      if (linkRef.current) linkRef.current.value = ""
      if(textRef.current) textRef.current.value = ""
      // Close modal
      
      if (onClose) onClose()
    }
  }
  
  if (!open) return null
  
  return (
    <div >
      <div className="w-full h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center"></div>
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center z-10">
        <div className="flex items-center justify-center">
          <span className="bg-white opacity-100 p-4 rounded fixed border-2 border-gray-300">
            <div className="flex justify-end cursor-pointer" onClick={onClose}>
              <CrossIcon size="md" />
            </div>
            <div>
              <Input placeholder="Title" refe={titleRef} />
              <Input placeholder="Link" refe={linkRef} />
              <Input placeholder="Text" refe={textRef}/>
            </div>
            <div className="mb-2">
              <h1>Type</h1>
              <div className="flex gap-2 justify-between">
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
                <Button
                  text = "Linkedin"
                  variant={type === ContentType.Linkedin ? "primary":"secondary"}
                  onClick={()=>setType(ContentType.Linkedin)}
                  size="md"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="primary"
                text={loading ? "Submitting..." : "Submit"}
                size="md"
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}