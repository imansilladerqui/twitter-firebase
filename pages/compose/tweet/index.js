import { useState } from "react";
import Button from "components/Button";
import useUser from "hooks/useUser";

import { addDevit } from "../../../firebase/client";
import { useRouter } from "next/router";

import styles from "./composeTweet.module.scss";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const user = useUser();
  const router = useRouter();

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
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <div className={styles.container}>
      <main>
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            onChange={handleChange}
            placeholder="¿Qué esta pasando?"
            value={message}
          ></textarea>
          <div className={styles.buttonContainer}>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
