import React from 'react'
import { ImageBackground, ImageProps, View } from 'react-native'
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Button,
  Text,
} from 'react-native-ui-kitten'
import { SignInFormData } from './types'
import { ArrowForwardIconOutline } from '../../assets/icons'
import { ImageSource, imageSignIn1Bg } from '../../assets/images'
import { ScrollableAvoidKeyboard } from '../../components/common/scrollableAvoidKeyboard.component'
import { textStyle } from '../../components/common/style'
import { SignInForm } from './signInForm'

interface ComponentProps {
  onSignInPress: (formData: SignInFormData) => void
  onSignUpPress: (formData: SignInFormData) => void
}

export type SignIn1Props = ThemedComponentProps & ComponentProps

interface State {
  formData: SignInFormData | undefined
  showSignUp: boolean
}

class SignInComponent extends React.Component<SignIn1Props, State> {
  public state: State = {
    formData: undefined,
    showSignUp: true, // false is show sign in
  }

  private backgroundImage: ImageSource = imageSignIn1Bg

  private toggleScreen = () => this.setState(state => ({ ...state, showSignUp: !state.showSignUp }))
  private submit = () => {
    if (this.state.showSignUp) this.onSignUpButtonPress()
    else this.onSignInButtonPress()
  }

  private onSignInButtonPress = () => this.props.onSignInPress(this.state.formData)
  private onSignUpButtonPress = () => this.props.onSignUpPress(this.state.formData)
  private onFormDataChange = (formData: SignInFormData) => this.setState({ formData })

  private renderSignUpButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props

    return ArrowForwardIconOutline({ ...style, ...themedStyle.signUpButtonIcon })
  }

  public render(): React.ReactNode {
    const { themedStyle } = this.props

    return (
      <ScrollableAvoidKeyboard>
        <ImageBackground style={themedStyle.container} source={this.backgroundImage.imageSource}>
          <View style={themedStyle.signInContainer}>
            <Text style={themedStyle.signInLabel} category="h4">
              {this.state.showSignUp ? `SIGN UP` : `SIGN IN`}
            </Text>
            <Button
              style={themedStyle.signUpButton}
              textStyle={themedStyle.signUpButtonText}
              activeOpacity={0.75}
              appearance="ghost"
              size="giant"
              icon={this.renderSignUpButtonIcon}
              onPress={this.toggleScreen}
            >
              {this.state.showSignUp ? `Sign In` : `Sign Up`}
            </Button>
          </View>
          <SignInForm style={themedStyle.formContainer} onDataChange={this.onFormDataChange} />
          <Button
            size="large"
            textStyle={textStyle.button}
            disabled={!this.state.formData}
            onPress={this.submit}
          >
            {this.state.showSignUp ? `SIGN UP` : `SIGN IN`}
          </Button>
        </ImageBackground>
      </ScrollableAvoidKeyboard>
    )
  }
}

export const SignIn = withStyles(SignInComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  ewaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  ewaButtonText: {
    color: 'white',
    ...textStyle.button,
  },
  ewaButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white',
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  signInLabel: {
    flex: 1,
    ...textStyle.headline,
    color: 'white',
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signUpButtonText: {
    color: 'white',
  },
  signUpButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white',
  },
  socialAuthIcon: {
    tintColor: 'white',
  },
  socialAuthHint: {
    color: 'white',
  },
}))
