// Dashboard.jsx
import { useState} from 'react'
import { Button } from '../components/Button/Button'
import { CreateContentModal } from '../components/Modal/CreateContentModal'
import { Sidebar } from '../components/Sidebar/Sidebar'
import Cards from './Cards'
import useContentStore from '../store/contentStore'
import { PlusIcon, ShareIcon } from '../icons/Icon'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { shareBrain, loading} = useContentStore()

  
  const handleShare = async () => {
    const url = await shareBrain()
    if (url) {
      console.log("Share URL:", url)
      // You could show this URL in a toast or modal
    }
  }

  return (
    <>
      <Sidebar/>
      
      <div className='p-4 ml-72 h-min-screen bg-gray-100 border-2'>
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)}
        />
        
        <div className='flex justify-end gap-4'>
          <Button
            startIcon={<PlusIcon size={'md'}/>}
            size="sm"
            variant="primary"
            text="Add Content"
            onClick={() => setModalOpen(true)}
          />
          
          <Button
            startIcon={<ShareIcon size={'md'}/>}
            size="md"
            variant="secondary"
            text="Share Brain"
            onClick={handleShare}
            loading={loading}
          />
        </div>
        
        <div className='flex gap-4 flex-wrap'>
          {/* No props needed - Cards gets data directly from store */}
          <Cards />
        </div>
      </div>
    </>
  )
}

export default Dashboard