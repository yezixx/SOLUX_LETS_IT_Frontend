import { useEffect, useState } from "react";
import MemberItem from "../../../../Components/MemberItem/MemberItem";
import styles from "./MemberView.module.css";
import { approveApplicants } from "../../../../service/applyService";

const MemberView = ({ postId }) => {
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    approveApplicants(postId)
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.teammateView}>
      <div className={styles.teammateView__MemberItems}>
        {memberList.map((member) => (
          <MemberItem key={member.applyId} memberName={member.nickname} />
        ))}
      </div>
    </div>
  );
};

export default MemberView;
