// External Libaries
import { Dispatch, FC, SetStateAction, useState } from "react";
import DeletePopup from "./delete-popup";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi";
type Props = {
  title: string;
  date: string;
  id: number;
  setSucces: Dispatch<SetStateAction<boolean>>;
};




const ActivityCard: FC<Props> = ({ title, date, id, setSucces }) => {
  const [deletePopup, setDeletePopup] = useState(false);

  function formatDate(inputDate : string) {
    const newdate = new Date(inputDate);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	  };
	const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(newdate);

    return formattedDate;
  }

  return (
    <>
      <div
        className="bg-white relative shadow-[0_4px_8px_rgba(0,0,0,.15)] py-[22px] px-[27px] h-[234px] w-full rounded-[12px]"
        data-cy="activity-item"
        id={`itemTodo${id}`}
      >
        <Link href={`/${id}`} className="h-[158px]">
          <div className="h-[158px]">
            <h4
              data-cy="activity-item-title"
              className="font-[700] text-[18px]"
            >
              {title}
            </h4>
          </div>
        </Link>
        <div className="flex justify-between gap-2 items-center absolute bottom-[25px] left-0 px-[27px] w-full text-[##888] opacity-60 ">
          <span data-cy="activity-item-date">{formatDate(date)}</span>
          <button onClick={() => setDeletePopup(true)}>
            <HiOutlineTrash size={25} />
          </button>
        </div>
      </div>

      {deletePopup && (
        <DeletePopup
          kind="activity"
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          setSuccess={setSucces}
          url={`https://todo.api.devcode.gethired.id/activity-groups/${id}`}
          id={id}
          title={title}
        />
      )}
    </>
  );
};
export default ActivityCard;
