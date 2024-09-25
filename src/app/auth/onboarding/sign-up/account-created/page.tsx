import { Button } from '@/components/button'
import { SuccessSVGComponent } from '@/components/icons'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const AccountSuccess = () => {
  return (
    <Card className='flex flex-col w-[500px]'> 
        <CardHeader className='flex items-center'>
              <SuccessSVGComponent />
              <CardTitle>
                  <h2 className='text-center text-xl font-bold'>Account Created.</h2>
              </CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-xs text-center leading-tight'>Thank you for taking your time to create an account with us. Now let&apos;s go explore the app.</p>
        </CardContent>
        <CardFooter>
            <Button className='w-full bg-[#068513] text-xs'>Proceed to Log In</Button>
        </CardFooter>
              
    </Card>
  )
}

export default AccountSuccess