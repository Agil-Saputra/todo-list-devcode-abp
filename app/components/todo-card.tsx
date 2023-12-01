// External Libaries
import { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";
// Components
import DeletePopup from "@/app/components/delete-popup";
import Button from "./button";
import Loader from "./loader";
import Select from "./select";
// Utils
import { colourOptions } from "@/docs/data";
import { useForm } from "react-hook-form";
// Static assets
import { TbPencil } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";

type TodoCardProps = {
  title: string;
  isActive: number;
  id: number;
  priority: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update : boolean
};

const TodoCard: FC<TodoCardProps> = ({
  title,
  isActive,
  id,
  priority,
  setSuccess,
  setUpdate,
  update
}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [checked, setChecked] = useState(isActive);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [addPopup, setAddPopup] = useState(false);

  const priorityColor = colourOptions.filter((item) => priority == item.value);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    control,
  } = useForm();

  function handleChecked(e: any) {
    setChecked(e.target.checked);
    axios({
      method: "patch",
      url: `https://todo.api.devcode.gethired.id/todo-items/${id}`,
      data: {
        priority,
        is_active: e.target.checked,
      },
    }).then((res) => {
	console.log(res);
    });
  }

  function onSubmitAddTodo(data: any) {
    setIsAddTodo(true);
    axios({
      method: "patch",
      url: `https://todo.api.devcode.gethired.id/todo-items/${id}`,
      data: {
        title: data.title,
        priority: data.priority.value,
        is_active: isActive,
      },
    }).then((res) => {
      setIsAddTodo(false);
      setAddPopup(false);
	  setUpdate(!update)
    });
    reset();
  }

  return (
    <div
      className="flex justify-between items-center shadow-[0_4px_8px_rgba(0,0,0,.15)] p-6 rounded-[12px]"
      data-cy="todo-item"
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            data-cy="todo-item-checkbox"
            type="checkbox"
            id={`default-${id}`}
            defaultChecked={checked == 1 ? true : false}
            onChange={handleChecked}
            className="appearance-none rounded-[3px] checked:bg-blue-400 border w-[1.5rem] h-[1.5rem]"
          />
		  <div className={(checked ? "block" : 'hidden') + " absolute left-1 top-1 text-center text-white pointer-events-none"}>
			<ImCheckmark/>
		  </div>
        </div>

        <div
          data-cy="todo-item-priority-indicator"
          className={`w-4 h-4 rounded-full`}
          style={{ backgroundColor: `${priorityColor[0].color}` }}
        ></div>

        <p data-cy="todo-item-title" className="relative">
          {title}
          {!checked ? null : (
            <span className="absolute w-full h-1 bg-black left-0 top-3"></span>
          )}
        </p>

        <button onClick={() => setAddPopup(true)}>
          <TbPencil />
        </button>
      </div>

      <button onClick={() => setDeletePopup(true)}>
        <HiOutlineTrash size={25}/>
      </button>
      {deletePopup && (
        <DeletePopup
          kind="list item"
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          setSuccess={setSuccess}
          url={`https://todo.api.devcode.gethired.id/todo-items/${id}`}
          id={id}
          title={title}
        />
      )}

      {addPopup && (
        <div className="overlay">
          <div className="bg-white container w-full rounded-[12px]">
            <div className="flex items-center justify-between p-4 border-b w-full">
              <p className="font-[600] text-[1.25rem]">Update List item</p>
              <IoMdClose
                onClick={() => setAddPopup(false)}
                data-cy="close-modal"
				size={25}
              />
            </div>

            <form
              onSubmit={handleSubmit(onSubmitAddTodo)}
              className="px-[30px] grid place-items-end relative pt-[38px] pb-[24px]"
            >
              <div className="w-full ">
                <p className="leading-[1.5rem] text-[.8rem] mb-1 uppercase font-[600]">
                  Nama List Item
                </p>
                <input
                  {...register("title", { required: true })}
                  data-cy="form-matkul"
                  type="text"
                  placeholder="Tambahkan nama Activity"
				  defaultValue={title}
                  className="outline-primary p-3 rounded-md w-full font-[400] border"
                />
              </div>
              <div className="w-full">
                <p className="leading-[1.5rem] mb-1 mt-4 text-[.8rem] font-[600] uppercase">
                  Priority
                </p>
                <Select defaultValue={priorityColor[0]} control={control} />
              </div>

              <Button
                type="submit"
                text={isAddTodo ? <Loader color="white" /> : "Simpan"}
                data-cy="btn-submit"
                disabledButton={!isDirty || !isValid}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TodoCard;
