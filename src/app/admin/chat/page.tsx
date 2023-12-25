"use client"
import Button from '@/app/auth/components/Button'
import ChatTable from './components/ChatTable'
import { DoorClosed } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function Chat() {
  // signOut()
  return (
    <div className='bg-gray-700 h-auto md:h-screen'>
          <div className='w-[200px] py-4 justify-center flex mx-auto'>
          <Button
          onClick={async() => {
            signOut()
          }}    
          className='bg-red-500 hover:bg-red-600 flex flex-row' 
          type="button"><DoorClosed className='mx-2'/>Cerrar Sessión</Button>
          </div>
          <ChatTable/>
          
      </div>
         
  )
}
