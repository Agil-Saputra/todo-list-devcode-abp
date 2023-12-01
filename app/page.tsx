"use client";
// External Libaries
import { useEffect, useState } from "react";
import axios from "axios";
// Components
import Image from "next/image";
import ActivityCard from "./components/activity-card";
import Loader from "./components/loader";
import Alert from "./components/alert";
// Static Assets
import { FaPlus } from "react-icons/fa6";
import empty from "@/app/assets/static/activity-empty-state.png";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://todo.api.devcode.gethired.id/activity-groups?email=yogi@skyshi.io"
      )
      .then((res) => {
        setResponse(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [success, isSubmitting]);

  function addActivity() {
    setIsSubmitting(true);
    axios({
      method: "post",
      url: "https://todo.api.devcode.gethired.id/activity-groups/",
      data: {
        email: "yogi@skyshi.io",
        title: "New Activity",
      },
    }).then((res) => {
      console.log(res);
      setIsSubmitting(false);
    });
  }

  return (
    <main className="container">
      <div className="flex items-center justify-between mt-[43px] mb-[55px]">
        <h1 data-cy="activity-title" className="text-[2.25rem] font-[700]">
          Activity
        </h1>
        <button
          onClick={addActivity}
          className="flex items-center gap-2 bg-primary w-[170px] h-[54px] min-w-[170px] text-[1.125rem] rounded-[45px] py-[.86rem] px-[1.815rem] text-white font-[600]"
          data-cy="activity-add-button"
        >
          {isSubmitting ? <Loader color="white" /> : <FaPlus />} Tambah
        </button>
      </div>

      <Alert kind="Activity" setSuccess={setSuccess} success={success} />

      {loading && (
        <div className="grid place-items-center">
          <Loader color="primary" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {!loading &&
          response.map(({ title, id, created_at }) => (
            <ActivityCard
              key={id}
              id={id}
              title={title}
              date={created_at}
              setSucces={setSuccess}
            />
          ))}
      </div>

      <div className="grid w-full place-items-center" onClick={addActivity}>
        {!response[0] && !loading && (
          <Image
            src={empty}
            width={500}
            height={500}
            className="cursor-pointer"
            alt="activity-empty-state"
          />
        )}
      </div>
    </main>
  );
}
