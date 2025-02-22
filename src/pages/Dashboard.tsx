import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

function Dashboard() {
  const [modalOpen , setModalOpen] = useState<boolean>(false)
  const {contents,refersh} = useContent();


  useEffect(()=>{
     refersh();
  },[modalOpen])
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
         text="Share brain"
         onClick={async()=>{
           const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share/`, {
               share : true
            }, {
               headers:{
                 "Authorization":localStorage.getItem("item")
               }
            })
            const shareUrl = `http://localhost:5173/${response.data.hash}`;

         }}
         />

       <Button    
          startIcon={<ShareIcon size={'md'}/>}
          size = "md" 
          variant="secondary" 
          text="Add content"
          onClick={()=>{}}
          />
       </div>
      
      
      <div className='flex gap-4 flex-wrap'>
        {contents?.map(({type,link,title}, index)=> 
            <Card 
             key={index}
             type={type}
             link={link}
             title={title}/>
        )}
          {/* <Card title='first tweet' type='twitter' link='https://x.com/nitesh_singh5/status/1889650524921733533'/>
          <Card title='first video' type='youtube' link='https://www.youtube.com/watch?v=6q3NVJYAJdY&list=RD-FGYMkL_u-g&index=4'/> */}
      </div>
      
    </div>
      </>
  )
}

export default Dashboard
