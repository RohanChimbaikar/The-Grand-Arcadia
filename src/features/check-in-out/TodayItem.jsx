import styled from "styled-components";

import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;

  grid-template-columns: 10rem 12rem 3rem 6rem 10rem;

  gap: 1rem;
  align-items: center;

  font-size: 1.4rem;

  padding: 0.8rem 0;

  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Nights = styled.span`
  white-space: nowrap;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numberOfNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Guest>{guests?.fullName}</Guest>
      <Flag countryCode={guests?.countryFlag} />

      <Nights>{numberOfNights} nights</Nights>

      {/* <span>{guests.countryFlag}</span> */}

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check-in
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton id={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
