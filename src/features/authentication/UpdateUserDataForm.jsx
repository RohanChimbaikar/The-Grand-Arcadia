import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import UserAvatar from "./UserAvatar";
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

/* PROFILE */

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  padding: 2.4rem 0;

  border-bottom: 1px solid var(--color-grey-200);
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;

  flex-shrink: 0;

  border-radius: 50%;
  overflow: hidden;

  background: var(--color-grey-100);

  border: 1px solid var(--color-grey-300);

  display: flex;
  align-items: center;
  justify-content: center;

  /* Make UserAvatar fill the container */
  & > * {
    width: 100%;
    height: 100%;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;

  font-size: 1.9rem;
  font-weight: 600;

  color: var(--color-grey-700);
`;

const Email = styled.p`
  margin: 0.4rem 0 0;

  font-size: 1.4rem;
  color: var(--color-grey-500);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-top: 1rem;
`;

const PhotoButton = styled.label`
  display: inline-flex;
  align-items: center;

  padding: 0.65rem 1.1rem;

  border: 1px solid var(--color-grey-300);
  border-radius: 7px;

  background: var(--color-grey-0);

  color: var(--color-grey-700);

  font-size: 1.3rem;
  font-weight: 500;

  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background: var(--color-grey-50);
    border-color: var(--color-grey-400);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PhotoHint = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-400);
`;

/* DETAILS */

const Details = styled.div`
  padding-top: 2.8rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.8rem;

  font-size: 1.6rem;
  font-weight: 600;

  color: var(--color-grey-700);
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 500;

  color: var(--color-grey-600);
`;

/* ACTIONS */

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  margin-top: 3rem;
  padding-top: 2rem;

  border-top: 1px solid var(--color-grey-200);
`;

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim()) return;

    updateUser({
      fullName,
      avatar,
    });
  }

  function handleCancel() {
    setFullName(currentFullName || "");
    setAvatar(null);
    setIsEditing(false);
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(file);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* Header */}
      <Header>
        <Title>Account information</Title>

        <Subtitle>
          Manage your personal information and profile settings
        </Subtitle>
      </Header>

      {/* Profile */}
      <Profile>
        <Avatar>
          <UserAvatar />
        </Avatar>

        <ProfileInfo>
          <Name>{fullName || "Your name"}</Name>

          <Email>{email}</Email>

          {isEditing && (
            <PhotoActions>
              <PhotoButton htmlFor="avatar">
                Change photo
              </PhotoButton>

              <HiddenInput
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUpdating}
              />

              {avatar && (
                <PhotoHint>
                  {avatar.name}
                </PhotoHint>
              )}
            </PhotoActions>
          )}
        </ProfileInfo>
      </Profile>

      {/* Personal details */}
      <Details>
        <SectionTitle>Personal details</SectionTitle>

        <Fields>
          <Field>
            <Label htmlFor="fullName">
              Full name
            </Label>

            <Input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing || isUpdating}
            />
          </Field>

          <Field>
            <Label htmlFor="email">
              Email address
            </Label>

            <Input
              id="email"
              value={email}
              disabled
            />
          </Field>
        </Fields>
      </Details>

      {/* Actions */}
      <Actions>
        {!isEditing ? (
          <Button
            type="button"
            variation="secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit profile
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variation="secondary"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </>
        )}
      </Actions>
    </StyledForm>
  );
}

export default UpdateUserDataForm;