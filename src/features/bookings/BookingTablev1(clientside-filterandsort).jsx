import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  // const bookings = [];
  const { bookings, isLoading } = useBookings();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource="bookings" />;

  const filteredValue = searchParams.get("status") || "all";

  let filteredBookings = bookings;

  if (filteredValue === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in",
    );

  if (filteredValue === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed",
    );

  if (filteredValue === "confirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "confirmed",
    );

  if (filteredValue === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out",
    );

  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortBy.split("-");

  let modifier = direction === "asc" ? 1 : -1;

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (field === "startDate" || field === "endDate") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }

    return (a[field] - b[field]) * modifier;
  });
  return (
    <Menus>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
