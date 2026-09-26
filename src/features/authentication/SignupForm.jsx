import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

const styles = {
  background: "var(--color-grey-0)",
  borderRadius: "14px",
  border: "1px solid var(--color-grey-200)",
  boxShadow: "var(--shadow-sm)",
  padding: "3.2rem",
};
function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      },
    );
  }

  return (
    <Form style={styles} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
          placeholder="Enter your full name"
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="you@example.com"
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should have a minimum of 8 characters",
            },
          })}
          placeholder="At least 8 characters"
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords donot match",
          })}
          placeholder="Re-enter your password"
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {!isLoading ? "Create account" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
