'use client'
import { useProfile } from '@/providers/userProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ProfileIcon() {
  const { user } = useProfile();

  const router = useRouter();

  return (
    <button title={`Profile: ${user?.name}`} onClick={() => router.push('/profile')} className='min-w-2.5 min-h-2.5'>
        <Image className='rounded-full' src={user?.profile_photo || "/profile.svg"} alt="profile" width={40} height={40} />
    </button>
  )
}
