'use client'

import { LogoSVGComponent } from '@/components/icons'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react'
import {motion} from 'framer-motion'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/button';
import Link from 'next/link';

const VerifyPhone = () => {
  const [otp, setOTP] = React.useState('');

  return (
      <Card className='w-[500px] mx-auto flex flex-col items-center text-center'>
      <CardHeader className='justify-center'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}          
        > 
          <LogoSVGComponent width={280} height={35}/>
        </motion.div>
      </CardHeader>  
        <CardContent>
          <h2 className='text-lg font-semibold mb-4'>
            Verify Your Phone Number
          </h2>
          <span className='text-sm text-gray-600 mb-4'>You&apos;ll receive a verification code via SMS. Enter the code to verify your phone nnumber.
          </span>
        {/* <InputOTP value={otp} onChange={setOTP} maxLength={6} render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              // <InputOTPSlot key={index} {...slot} />
            ))}
          </InputOTPGroup>
        )}
        /> */}
        </CardContent>
        <Button variant={'link'} className='text-sm flex items-start justify-start'>Resend Code: 1:00</Button>
      <CardFooter className='flex flex-col w-full'>
        <Button className='w-full mb-2 bg-green-600'>Continue</Button>
        <div className='text-sm text-center mt-4'>
          Already have an account? <Link href='/sign-in' className='text-blue-600'>Log In</Link>
        </div>
      </CardFooter>  
      </Card>
  )
}

export default VerifyPhone