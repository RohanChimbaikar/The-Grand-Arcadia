import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./useBookingDetails";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightEndOnRectangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useCheckout } from "./useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { booking, isLoading } = useBookingDetails();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteData } = useDeleteBooking();
  const navigate = useNavigate();

  if (isLoading || isCheckingOut) return <Spinner />;

  const { id, status } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {status === "unconfirmed" && (
          <Button
            icon={<CheckCircleIcon />}
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check-In
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteData(id);
                navigate(-1);
              }}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
            icon={<ArrowRightEndOnRectangleIcon />}
          >
            Check-out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
