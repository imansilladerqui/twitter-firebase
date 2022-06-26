import { useState, useEffect } from "react";
import Button from "components/Button";
import Navbar from "components/Navbar";
import useUser from "hooks/useUser";

import { addDevit, uploadImage } from "firebase/client";
import { useRouter } from "next/router";
import Avatar from "components/Avatar";
import Head from "next/head";

import styles from "./composeTweet.module.scss";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    console.log(file);
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <div className={styles.container}>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <main>
        {user && (
          <section className={styles.avatarContainer}>
            <Avatar src={user.avatar} />
            <p>{user.username}</p>
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            className={
              drag === DRAG_IMAGE_STATES.DRAG_OVER
                ? `${styles.textarea} ${styles.drag}`
                : `${styles.textarea}`
            }
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className={styles.removeImg}>
              <button
                className={styles.closeImg}
                onClick={() => setImgURL(null)}
              >
                x
              </button>
              <img className={styles.preload} src={imgURL} />
            </section>
          )}
          <div className={styles.buttonContainer}>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
        <Navbar />
      </main>
    </div>
  );
}
