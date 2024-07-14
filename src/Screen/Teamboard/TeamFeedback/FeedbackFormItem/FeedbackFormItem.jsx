import { useState } from "react";
import CheckIcon from "../../../../Image/Icons/CheckIcon";
import styles from "./FeedbackFormItem.module.css";

const FeedbackFormItem = ({ question }) => {
  const OPTIONS = [
    {
      style: "NOT_AT_ALL",
      value: 1,
    },
    {
      style: "NO",
      value: 2,
    },
    {
      style: "NEUTRAL",
      value: 3,
    },
    {
      style: "YES",
      value: 4,
    },
    {
      style: "ABSOLUTELY",
      value: 5,
    },
  ];

  const [answer, setAnswer] = useState(null);

  return (
    <div className={styles.feedbackFormItem}>
      {/*질문*/}
      <div className={styles.feedbackFormItem__question}>
        <CheckIcon
          width={"24px"}
          height={"24px"}
          color={"var(--main-color2)"}
        />
        {question}
      </div>
      {/*체크박스 - radio*/}
      <div className={styles.feedbackFormItem__check}>
        <div className={styles.feedbackFormItem__radio}>
          {OPTIONS.map((option, index) => (
            <input
              key={index}
              type="radio"
              value={option.value}
              checked={answer === option.value}
              onChange={() => setAnswer(option.value)}
              className={styles[`feedbackFormItem__radio--${option.style}`]}
            />
          ))}
        </div>
        {/*하단 라벨, 양끝만*/}
        <div className={styles.feedbackFormItem__radioLabel}>
          <div className={styles["feedbackFormItem__radioLabel--NOT_AT_ALL"]}>
            전혀 아니다
          </div>
          <div className={styles["feedbackFormItem__radioLabel--ABSOLUTELY"]}>
            매우 그렇다
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFormItem;
