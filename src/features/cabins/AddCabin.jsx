import { HiPlus } from "react-icons/hi2";
import styled from "styled-components";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddButton = styled(Button)`
  padding: 0.4rem;
  min-width: 2.8rem;
  height: 2.8rem;
  font-size: 1.5rem;
`;

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <AddButton>
          <HiPlus />
        </AddButton>
      </Modal.Open>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button size="medium" onClick={() => setIsOpenModal((show) => !show)}>
//         Add Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
