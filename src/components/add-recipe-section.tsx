'use client';
import React, { useRef } from 'react'
import AddRecipeFab from './add-recipe-fab'
import CreateRecipeModal from './add-recipe-modal'
import { useProfile } from '@/providers/userProvider';


export default function AddRecipeSection() {

  const modalRef = useRef<HTMLDialogElement>(null)  

  const { user } = useProfile()

  const openModal = () => {
    if(modalRef.current){
        modalRef.current.showModal()
    }
  }

  const closeModal = () => {
    if(modalRef.current){
        modalRef.current.close()
    }
  }

  return (
    <section>
        { user && <AddRecipeFab onClick={openModal}/>}
        <CreateRecipeModal ref={modalRef} onClose={closeModal}/>
    </section>
  )
}
