import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import AddCabin from "./AddCabin";

import { useSearchParams } from "react-router-dom";

const headings = ["", "Cabin", "Capacity", "Price", "Discount"];

const ActionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  button {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  }
`;

const TableContainer = styled.div`
  &:hover ${ActionsHeader} button {
    opacity: 1;
    visibility: visible;
  }
`;

function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // Filtering
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  // Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === "name") {
      return a[field].localeCompare(b[field]) * modifier;
    }

    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <TableContainer>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            {headings.map((heading) => (
              <div key={heading}>{heading}</div>
            ))}

            <ActionsHeader>
              <span>Actions</span>
              <AddCabin />
            </ActionsHeader>
          </Table.Header>

          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </TableContainer>
    </Menus>
  );
}

export default CabinTable;
