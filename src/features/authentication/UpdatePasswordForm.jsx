import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

const StyledForm = styled(Form)`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 14px;
  padding: 3rem 3.2rem;

  box-shadow: var(--shadow-sm);
`;

const Header = styled.div`
  padding-bottom: 2.4rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Title = styled.h2`
  margin: 0;

  font-size: 2.2rem;
  font-weight: 600;

  color: var(--color-grey-700);
`;

const Subtitle = styled.p`
  margin: 0.6rem 0 0;

  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const Content = styled.div`
  padding-top: 2.8rem;

  max-width: 60rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.8rem;

  font-size: 1.6rem;
  font-weight: 600;

  color: var(--color-grey-700);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 500;

  color: var(--color-grey-600);
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

const Hint = styled.p`
  margin: 0.6rem 0 0;

  font-size: 1.2rem;
  color: var(--color-grey-400);
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  margin-top: 3rem;
  padding-top: 2rem;

  border-top: 1px solid var(--color-grey-200);

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: reset,
      },
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <Header>
        <Title>Update password</Title>

        <Subtitle>Change your password to keep your account secure</Subtitle>
      </Header>

      {/* Content */}
      <Content>
        <SectionTitle>Password</SectionTitle>

        {/* New password */}
        <Field>
          <Label htmlFor="password">New password</Label>

          <Input
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",

              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />

          {!errors?.password && <Hint>Use at least 8 characters.</Hint>}

          {errors?.password && <Error>{errors.password.message}</Error>}
        </Field>

        {/* Confirm password */}
        <Field>
          <Label htmlFor="passwordConfirm">Confirm new password</Label>

          <Input
            type="password"
            id="passwordConfirm"
            autoComplete="new-password"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",

              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />

          {errors?.passwordConfirm && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
        </Field>
      </Content>

      {/* Actions */}
      <Actions>
        <Button
          type="button"
          variation="secondary"
          onClick={() => reset()}
          disabled={isUpdating}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update password"}
        </Button>
      </Actions>
    </StyledForm>
  );
}

export default UpdatePasswordForm;
