import React from 'react'
import { SignIn } from './SignIn'
import { SignInFormData } from './types'
import { useUserContext } from '../../utils/UserContext'

interface Props {}

export function SignInContainer(props: Props) {
  const userContext = useUserContext()

  const onSignUpPress = async (data: SignInFormData) => {
    await userContext.signUp(data.email, data.password)
  }

  const onSignInPress = async (data: SignInFormData) => {
    await userContext.logIn(data.email, data.password)
  }

  return <SignIn onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />
}
