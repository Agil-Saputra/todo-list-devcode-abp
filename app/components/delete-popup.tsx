// External Libaries
import { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import axios from "axios";
// Components
import Image from "next/image";
import Loader from "./loader";
// Static
import deleteAlert from "@/app/assets/static/deleteAlert.png";

type Props = {
  title: string;
  id: number;
  url: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setDeletePopup: Dispatch<SetStateAction<boolean>>;
  deletePopup: boolean;
  kind: "activity" | "list item";
};

const DeletePopup: FC<Props> = ({
  title,
  id,
  url,
  setSuccess,
  setDeletePopup,
  deletePopup,
  kind,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  function deleteActivity(id: number) {
    setIsDeleting(true);
    axios({
      method: "delete",
      url,
    }).then((res) => {
      setSuccess(true);
      setIsDeleting(false);
      setDeletePopup(false);
    });
  }
  return (
    deletePopup && (
      <div id="ModalDelete" data-cy="todo-modal-delete" className="overlay">
        <div
          className="bg-white z-50  grid place-items-center p-[43px] rounded-[12px]"
          onBlur={() => {
            setDeletePopup(false);
          }}
        >
          <Image src={deleteAlert} alt="alert" data-cy="modal-delete-icon" />

          <p className="text-center my-10">
            Apakah anda yakin menghapus {kind}
            <br />
            <strong>&ldquo;{title}&ldquo;?</strong>
          </p>

          <div className="flex items-center gap-4">
            <button
              className="btn bg-[#f4f4f4]"
              data-cy="modal-delete-cancel-button"
              onClick={() => setDeletePopup(false)}
            >
              Batal
            </button>
            <button
              className="btn bg-error text-white text-cente"
              data-cy="modal-delete-confirm-button"
              onClick={() => deleteActivity(id)}
            >
              {isDeleting ? (
                <Loader color="white" />
              ) : (
                <p className="w-full text-center">Hapus</p>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default DeletePopup;
