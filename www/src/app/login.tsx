import React from "react"
import { Field, Form, FormSpy } from "react-final-form"
import { FORM_ERROR } from "final-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import Typography from "components/Typography"
import AppForm from "views/AppForm"
import { email, required } from "form/validation"
import RFTextField from "form/RFTextField"
import FormButton from "form/FormButton"
import FormFeedback from "form/FormFeedback"
import { SEO } from "components"
import { useIdentityContext } from "plugins/gatsby-plugin-netlify-identity"
import { navigate } from "gatsby"

import { useLoading } from "hooks"
import { MaybePathProps, FormData } from "./types"

import { Routes } from "utils"

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}))

const Login = ({}: MaybePathProps) => {
  const classes = useStyles()
  const { loginUser } = useIdentityContext()
  const [isLoading, load] = useLoading()
  const [sent, setSent] = React.useState(false)

  const validate = (values: FormData) => {
    const errors = required(["email", "password"], values)

    if (!errors.email) {
      const emailError = email(values.email, values)
      if (emailError) {
        errors.email = email(values.email, values)
      }
    }

    return errors
  }

  const onSubmit = async (values: FormData) => {
    setSent(true)
    let submitError = ""
    await load(loginUser(values.email, values.password))
      .then((user) => {
        console.log("Success! Logged in", user)
        navigate("/app/dashboard")
      })
      .catch((err) => {
        // console.log(err.json)
        submitError = "Invalid User Name or Password"
        if(err.json && err.json) {
          submitError = err.json["error_description"] || submitError
        }
        setSent(false)
      })
    if (submitError) {
      return { [FORM_ERROR]: submitError }
    }
  }

  return (
    <>
      <SEO title="Sign In" />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link
              onClick={(e) => {
                e.preventDefault()
                navigate(`/app/${Routes.signup}`)
              }}
              href={`/app/${Routes.signup}`}
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </>
  )
}

export default Login
