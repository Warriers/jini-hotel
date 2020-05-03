import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import { Field, Form, FormSpy } from "react-final-form"
import { FORM_ERROR } from "final-form"
import Typography from "components/Typography"
import { SEO } from "components"
import AppForm from "views/AppForm"
import { email, required } from "form/validation"
import RFTextField from "form/RFTextField"
import FormButton from "form/FormButton"
import FormFeedback from "form/FormFeedback"

import { useIdentityContext } from "react-netlify-identity"
import { navigate } from "gatsby"

import { useLoading } from "hooks"
import { MaybePathProps, FormData as FD } from "./types"
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

interface FormData extends FD {
  firstName: string
  lastName: string
}

const Signup = ({}: MaybePathProps) => {
  const classes = useStyles()
  const { signupUser, user, settings } = useIdentityContext()
  settings.autoconfirm = true
  // console.log(settings)
  const [isLoading, load] = useLoading()
  const [sent, setSent] = React.useState(false)

  const validate = (values: FormData) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    )

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
    let submitError = false
    await load(
      signupUser(values.email, values.password, {
        name: `${values.firstName} ${values.lastName}`,
      })
    )
      .then((user) => {
        console.log("Success! Signed up")
        navigate(`/app/${Routes.login}`)
      })
      .catch((err) => {
        console.error(err)
        submitError = true
        setSent(false)
      })
    if (submitError) {
      return { [FORM_ERROR]: "An Unknown error occured." }
    }
  }

  return (
    <>
      <SEO title={"Sign Up"} />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              onClick={(e) => {
                e.preventDefault()
                navigate(`/app/${Routes.login}/`)
              }}
              href={`/app/${Routes.login}/`}
              underline="always"
            >
              Already have an account?
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </>
  )
}

export default Signup
