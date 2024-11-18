import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { ArrowRight, X } from 'lucide-react'

const NotificationCard = () => {
    return (
    <>
        <Alert className='bg-pink-50 p-4 relative'>
            <Button variant='ghost' size='icon' className='text-pink-700 hover:text-pink-900 hover:bg-pink-100 absolute right-2 top-2 h-6 w-6'>
                <X className='w-4 h-4' />
                <span className='sr-only'>Dismiss</span>
            </Button>
            <div className='flex items-center justify-between w-full'>
                <div className='space-y-1'>
                    <AlertTitle className='font-medium text-hubRed'>New Invoice!</AlertTitle>
                    <AlertDescription className='text-pink-600'>
                        You have received a new invoice for your medication order from MyMedHub.
                    </AlertDescription>
                </div>
            </div>        
                <div className='mt-2 flex justify-end'>
                    <Button variant='link' className='text-pink-500 font-medium hover:text-pink-600 bg-hubPurpleLight'>
                            View
                    <ArrowRight className='w-4 h-4 ml-1' />
                    </Button>
                </div>
        </Alert>
    </>
  )
}

export default NotificationCard