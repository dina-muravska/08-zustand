"use client";
import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Loading from "@/app/loading";

export default function NotePreview() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      <Modal onClose={closeModal}>
        {isLoading && <Loading />}
        {isError && <p> Could not fetch note details.</p>}
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{data?.title}</h2>
              </div>
              <p className={css.content}>{data?.content}</p>
              <p className={css.date}>{data?.createdAt}</p>
            </div>
            <span className={css.tag}>{data?.tag}</span>
          </div>
        )}
        <button onClick={closeModal} className={css.backBtn}>
          Close
        </button>
      </Modal>
    </>
  );
}
