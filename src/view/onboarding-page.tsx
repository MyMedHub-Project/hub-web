'use client'

import { Button } from '@/components/button'
import { Label } from '@/components/form'
import { DoctorSVGComponent, HospitalSVGComponent, LogoSVGComponent, PatientSVGComponent } from '@/components/icons'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'
import React, { useState } from 'react'

const OnboardingPage = () => {
    const [role, setRole] = useState('')
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <Card className='w-[400px]'>
              <CardHeader>
                  <CardTitle className='text-2xl font-bold text-center'>
                      Welcome to
                  </CardTitle>
                  <div className='flex justify-center'>
                  <LogoSVGComponent />
                  </div>
              </CardHeader>
              <CardContent>
                  <p className='text-center mb-4'>
                      Choose Your Role to Get Started
                  </p>
                  <RadioGroup onValueChange={setRole} className='flex justify-between space-x-4'>
                      <Card className='flex flex-col items-center'>
                          <RadioGroupItem value='patient' id='patient' className='sr-only' />
                          <Label htmlFor='patient' className='flex flex-col items-center cursor-pointer'>
                              <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2'>
                                  <PatientSVGComponent /> 
                              </div>
                              Patient
                          </Label>
                      </Card>
                      <Card className='flex flex-col items-center'>
                          <RadioGroupItem value='doctor' id='doctor' className='sr-only' />
                          <Label htmlFor='patient' className='flex flex-col items-center cursor-pointer'>
                              <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2'>
                                  <DoctorSVGComponent /> 
                              </div>
                              Doctor
                          </Label>
                      </Card>
                      <Card className='flex flex-col items-center border'>
                          <RadioGroupItem value='doctor' id='doctor' className='sr-only' />
                          <Label htmlFor='patient' className='flex flex-col items-center cursor-pointer'>
                              <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2'>
                                  <HospitalSVGComponent /> 
                              </div>
                              Health Institution
                          </Label>
                      </Card>
                  </RadioGroup>
                  <div className='justify-center pt-5'>
                      <p className='text-center font-light text-[#808080]'>Join MyMedHub to access comprehensive healthcare services tailed to your needs</p>
                  </div>
              </CardContent>
              <CardFooter>
                  <Button asChild className='w-full bg-[#068513]' disabled={!role}>
                      <Link href={`/terms?role=${role}`}>Next</Link>
                  </Button>
              </CardFooter>
                  <div className='flex justify-center gap-1'>
                      <span>Already have an account?</span>
                      <Link href='/auth/onboarding/sign-in' className='text-blue-600 hover:underline'>Log In</Link>
                  </div>
        </Card>
    </div>
  )
}

export default OnboardingPage