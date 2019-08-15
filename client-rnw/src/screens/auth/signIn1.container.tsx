import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { SignIn1 } from './signIn1.component'
import { SignInFormData } from './types'

export class SignIn1Container extends React.Component<NavigationScreenProps> {
  private navigationKey: string = 'SignIn1Container'

  private onSignInPress = (data: SignInFormData) => {
    // this.props.navigation.goBack()
    this.props.navigation.navigate('Home')
  }

  private onSignUpPress = () => {
    this.props.navigation.navigate({
      routeName: 'Sign Up 1',
      key: this.navigationKey,
    })
  }

  public render(): React.ReactNode {
    return <SignIn1 onSignInPress={this.onSignInPress} onSignUpPress={this.onSignUpPress} />
  }
}
