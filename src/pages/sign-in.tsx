import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Link }from "gatsby-theme-material-ui"
import Typography from 'components/Typography';
import AppForm from 'views/AppForm';
import { email, required } from 'form/validation';
import RFTextField from 'form/RFTextField';
import FormButton from 'form/FormButton';
import FormFeedback from 'form/FormFeedback';
import {Layout, SEO} from "components"

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
}));

const SignIn = () => {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = () => {
    setSent(true);
  };

  return (
    <Layout>
        <SEO title="Sign In" />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link to="/sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }} validate={validate}>
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
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" to="/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </Layout>
  );
}

export default SignIn;
