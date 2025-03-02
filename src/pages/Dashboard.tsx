import { useEffect, useState } from 'react'
import { Button } from '../components/Button/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/Modal/CreateContentModal'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import Cards from './Cards'
import { Card } from '../components/Card/Card'

function Dashboard() {
  const [modalOpen , setModalOpen] = useState<boolean>(false)

  return (
      <>
        <Sidebar/>
         <div className='p-4 ml-72 h-min-screen bg-gray-100 border-2'>
            <CreateContentModal open={modalOpen} onClose={()=>{
            setModalOpen(false)
       }}/>
       <div className='flex justify-end gap-4'>
       <Button 
         startIcon={<PlusIcon size={'md'}/>} 
         size = "sm" 
         variant="primary" 
         text="Add Content"
         onClick={()=> setModalOpen(true)}
         />

        <Button    
          startIcon={<ShareIcon size={'md'}/>}
          size="md" 
          variant="secondary" 
          text="Share Brain"
          onClick={async () => {
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/v1/brain/share/`, 
                { share: true }, 
                {
                  headers: {
                    "Authorization": localStorage.getItem("item"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/${response.data.hash}`;
              console.log("Share URL:", shareUrl); // You can handle the share URL as needed
            } catch (error) {
              console.error("Error sharing brain:", error);
            }
          }}
        />

       </div>
      
      
        <div className='flex gap-4 flex-wrap'>
              <Cards/>  
        </div>
      
    </div>
      </>
  )
}

export default Dashboard
