import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "../bookings/useBookingDetails";
import { useState } from "react";
import { useCheckIn } from "../bookings/useCheckIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBookingDetails();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useCheckIn();

  const moveBack = useMoveBack();

  // All hooks are above the conditional return
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    numberOfGuests,
    numberOfNights,
    hasPaid,
    hasBreakfast,
    totalPrice,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numberOfNights * numberOfGuests;

  // Existing payment OR user's confirmation
  const isPaymentConfirmed = hasPaid || isConfirmed;

  function handleCheckin() {
    if (!isPaymentConfirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setIsConfirmed(false);
            }}
            id="breakfast"
          >
            Do you want to add breakfast for{" "}
            <b>{formatCurrency(optionalBreakfastPrice)}</b>
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaymentConfirmed}
          disabled={hasPaid || isCheckingIn}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          id="checkbox"
        >
          I hereby confirm that {guests.fullName} has paid the full booking
          amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)}+${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        <Button
          onClick={handleCheckin}
          disabled={!isPaymentConfirmed || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
