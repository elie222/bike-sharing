import React from 'react'
import { View, ViewProps } from 'react-native'
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten'
import { SignInFormData } from './type'
import { textStyle } from '../../../components/common/style'
import { PasswordValidator, EmailValidator } from '../validators'
import { ValidationInput } from './validationInput.component'

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (data: SignInFormData | undefined) => void
}

export type SignInFormProps = ThemedComponentProps & ViewProps & ComponentProps

interface State {
  email: string | undefined
  password: string | undefined
}

class SignInFormComponent extends React.Component<SignInFormProps, State> {
  public state: State = {
    email: undefined,
    password: undefined,
  }

  public componentDidUpdate(prevProps: SignInFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState)
    const newFormValid: boolean = this.isValid(this.state)

    const isStateChanged: boolean = this.state !== prevState
    const becomeValid: boolean = !oldFormValid && newFormValid
    const becomeInvalid: boolean = oldFormValid && !newFormValid
    const remainValid: boolean = oldFormValid && newFormValid

    if (becomeValid) {
      this.props.onDataChange(this.state)
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined)
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state)
    }
  }

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email })
  }

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password })
  }

  private isValid = (value: SignInFormData): boolean => {
    const { email, password } = value

    return email !== undefined && password !== undefined
  }

  public render(): React.ReactNode {
    const { style, themedStyle, theme, ...restProps } = this.props

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label="EMAIL"
          placeholder="Email"
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          secureTextEntry={true}
          placeholder="Password"
          label="PASSWORD"
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
      </View>
    )
  }
}

export const SignInForm = withStyles(SignInFormComponent, (theme: ThemeType) => ({
  container: {},
  emailInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  passwordInput: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
}))
