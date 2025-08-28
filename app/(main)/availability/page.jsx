import React from 'react'
import AvailabilityForm from './_components/availability-form'
import { defaultAvailability } from './data'
import { getUserAvailability } from '@/app/actions/availability'
import TimeLottie from '@/components/lottie/time'

const AvailabilityPage = async () => {
  const availability = await getUserAvailability();
  console.log(availability)
  return (
    <div className='max-w-[1100px] mx-auto mt-10 '>
            <h1 className="text-3xl font-bold">Your Availability </h1>
      <div className='grid grid-cols-2'>
      <AvailabilityForm initialData={availability || defaultAvailability} />
      <TimeLottie/>
      </div>
    </div>
  )
}

export default AvailabilityPage
