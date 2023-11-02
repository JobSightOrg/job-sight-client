import Modal from "@/components/modal";
import { Props } from "@/components/modal";

export default function AddModal({ isVisible, onClose }: Props): JSX.Element {
  return (
    <Modal isVisible={isVisible} title={"Add Job Listing"} onClose={onClose}>
      <div>hello</div>
    </Modal>
  );
}
