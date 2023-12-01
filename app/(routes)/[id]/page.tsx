"use client";
// External Libaries
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Components
import Button from "@/app/components/button";
import Select from "@/app/components/select";
import TodoCard from "@/app/components/todo-card";
import Loader from "@/app/components/loader";
import Alert from "@/app/components/alert";
// Utils
import axios from "axios";
import { useForm } from "react-hook-form";
import useSortByCriteria from "@/app/hooks/useSortTitle";
// Static Assets
import { HiArrowsUpDown } from "react-icons/hi2";
import { BiSolidChevronLeft } from "react-icons/bi";
import { TbPencil } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import todoEmpty from "@/app/assets/static/todo-empty-state.png";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
  TbArrowsSort,
  TbCheck
} from "react-icons/tb";
// Types
type Props = {
  params: {
    id: number;
  };
};

type TodoProps = {
  title: string;
  todo_items: {
    title: string;
    is_active: number;
    priority: string;
    id: number;
  }[];
};

const initialTodoProps: TodoProps = {
  title: "",
  todo_items: [],
};

const Detail: FC<Props> = ({ params }) => {
  const [response, setResponse] = useState<TodoProps>(initialTodoProps);
  const [todoTitle, setTodoTitle] = useState(response.title);

  const [addPopup, setAddPopup] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState(false);

  const [sort, setSort] = useState("");

  const criteria = [
    {
      icon: <TbSortDescendingLetters />,
      title: "A-Z",
    },
    {
      icon: <TbSortAscendingLetters />,
      title: "Z-A",
    },
    {
      icon: <HiSortAscending />,
      title: "Terlama",
    },
    {
      icon: <HiSortDescending />,
      title: "Terbaru",
    },
    {
      icon: <TbArrowsSort />,
      title: "Belum Selesai",
    },
  ];

  useSortByCriteria(response.todo_items, sort);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    control,
  } = useForm();

  useEffect(() => {
    axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups/${params.id}`)
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [params.id, addPopup, successDelete, update, sort]);

  function onSubmitAddTodo(data: any) {
    setIsAddTodo(true);
    axios({
      method: "post",
      url: "https://todo.api.devcode.gethired.id/todo-items",
      data: {
        activity_group_id: params.id,
        title: data.title,
        priority: data.priority.value,
        is_active: 0,
      },
    }).then((res) => {
      setIsAddTodo(false);
      setAddPopup(false);
    });
    reset();
  }

  const handleChangeTitle = () => {
    axios({
      method: "patch",
      url: `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`,
      data: {
        title: todoTitle,
      },
    }).then((res) => {});
    setShowInput(false);
  };

  return (
    <main className="container">
      <div className="flex items-center justify-between my-10 gap-4">
        <div className="flex items-center gap-4 ">
          <Link href="/">
            <BiSolidChevronLeft size={40} />
          </Link>
          {showInput ? (
            <input
              type="text"
              onBlur={handleChangeTitle}
              defaultValue={loading ? " " : response.title}
              className="text-[2.5rem] font-[700] outline-none border-b border-black"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          ) : (
            <h1
              id="TitleDetail"
              data-cy="todo-title"
              className="text-[2.5rem] font-[700]"
              onClick={() => setShowInput(true)}
            >
              {todoTitle == "" ? response.title : todoTitle}
              {loading && "loading..."}
            </h1>
          )}
          <button className="opacity-50" onClick={() => setShowInput(true)}>
            <TbPencil size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              id="ButtonSort"
              data-cy="todo-sort-button"
              className="p-4 rounded-full border"
              onClick={() => setFilter(true)}
            >
              <HiArrowsUpDown size={25} />
            </button>

            {filter && (
              <div className="absolute left-0 bg-white border-b border-x rounded-[6px]">
                {criteria.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      setSort(item.title);
                      setFilter(false);
                    }}
                    className="hover:bg-primary hover:bg-opacity-25 w-[235px] flex items-center gap-4 justify-between bg-white border-t px-4 py-2 rounded-b-[6px] cursor-pointer rounded-t-[6px]"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </div>
                    {item.title == sort && <TbCheck/> }
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="w-[170px] h-[54px] rounded-[45px] py-[.86rem] px-[1.815rem] bg-primary text-white font-[600] text-[18px] flex items-center gap-2"
            id="ButtonAddDetail"
            data-cy="todo-add-button"
            onClick={() => setAddPopup(true)}
          >
            <FaPlus />
            Tambah
          </button>
        </div>
      </div>

      {successDelete && (
        <Alert
          kind="List Item"
          setSuccess={setSuccessDelete}
          success={successDelete}
        />
      )}

      <div className="grid gap-4">
        {loading ? (
          <div className="grid place-items-center">
            <Loader color="primary" />
          </div>
        ) : (
          response.todo_items.map(({ title, is_active, priority, id }) => (
            <TodoCard
              key={id}
              id={id}
              title={title}
              isActive={is_active}
              priority={priority}
              setSuccess={setSuccessDelete}
              setUpdate={setUpdate}
              update={update}
            />
          ))
        )}
      </div>

      <div className="grid w-full place-items-center">
        {!response?.todo_items[0] && !loading && (
          <div onClick={() => setAddPopup(true)}>
            <Image
              src={todoEmpty}
              width={500}
              height={500}
              className="cursor-pointer"
              alt="todo-empty-state"
            />
          </div>
        )}
      </div>

      {addPopup && (
        <div className="overlay">
          <div className="bg-white container w-full rounded-[12px]">
            <div className="flex items-center justify-between p-4 border-b w-full">
              <p className="font-[600] text-[1.25rem]">Tambah List item</p>
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
                  className="outline-primary p-3 rounded-md w-full font-[400] border"
                />
              </div>
              <div className="w-full">
                <p className="leading-[1.5rem] mb-1 mt-4 text-[.8rem] font-[600] uppercase">
                  Priority
                </p>
                <Select control={control} />
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
    </main>
  );
};
export default Detail;
