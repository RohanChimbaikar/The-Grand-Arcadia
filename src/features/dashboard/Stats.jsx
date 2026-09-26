import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, totalCabins }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancy_rate =
    confirmedStays.reduce((acc, curr) => acc + curr.numberOfNights, 0) /
    (numDays * totalCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
        title="Bookings"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
        title="Sales"
      />
      <Stat
        icon={<HiOutlineCalendar />}
        color="indigo"
        value={checkins}
        title="Check-ins"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancy_rate * 100) + "%"}
        title="Occupancy Rate"
      />
    </>
  );
}

export default Stats;
