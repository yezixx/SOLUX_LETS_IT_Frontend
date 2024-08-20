import Button from "../button/Button";
import styles from "./ProfileForm.module.css";
import SkillRange from "../skillRange/SkillRange";
import CollabLink from "../collabLink/CollabLink";
import { useRef, useState } from "react";
import defaultProfilePic from "../../assets/user.svg";
import { updateProfile } from "../../service/profileService";
import { ageMapping } from "../../util/getProfileTier";

const ProfileForm = ({ init, onSaveProfileImage, navTo }) => {
  const kakaoId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).kakaoId
    : null;

  const [profileImage, setProfileImage] = useState(
    init ? init.profileImage : defaultProfilePic
  );
  const [nickname, setNickname] = useState(init ? init.nickname : "");
  const [bio, setBio] = useState(init ? init.bio : "");
  const [age] = useState(init ? ageMapping(init.age) : "");
  const [introduce, setIntroduce] = useState(init ? init.introduce : "");
  const [links, setLinks] = useState(
    init
      ? init.sns
      : [
          {
            type: "email",
            link: ""
          },
          {
            type: "github",
            link: ""
          }
        ]
  );
  const [skills, setSkills] = useState(
    init
      ? init.skills
      : [
          {
            skillName: "",
            fluency: 50
          },
          {
            skillName: "",
            fluency: 50
          },
          {
            skillName: "",
            fluency: 50
          },
          {
            skillName: "",
            fluency: 50
          }
        ]
  );

  const nameRef = useRef();
  const bioRef = useRef();
  const introduceRef = useRef();
  const selectPicRef = useRef();

  const linkRef1 = useRef();
  const linkRef2 = useRef();
  const linkRefs = [linkRef1, linkRef2];
  const skillRef1 = useRef();
  const skillRef2 = useRef();
  const skillRef3 = useRef();
  const skillRef4 = useRef();
  const skillRefs = [skillRef1, skillRef2, skillRef3, skillRef4];

  const onFocusElement = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const onClickProfilePic = () => {
    setProfileImage(
      /*imgRef.current.files*/ URL.createObjectURL(
        selectPicRef.current.files[0]
      )
    );
  };

  const onClickSave = async () => {
    if (nameRef.current.value === "") {
      onFocusElement(nameRef);
      return;
    }
    if (bioRef.current.value === "") {
      onFocusElement(bioRef);
      return;
    }
    for (let i = 0; i < links.length; i++) {
      if (links[i].link === "") {
        onFocusElement(linkRefs[i]);
        return;
      }
    }
    if (introduceRef.current.value === "") {
      onFocusElement(introduceRef);
      return;
    }
    for (let i = 0; i < skills.length; i++) {
      if (skills[i].skillName === "") {
        onFocusElement(skillRefs[i]);
        return;
      }
    }

    if (confirm("프로필 작성을 완료하시겠습니까?")) {
      try {
        await updateProfile({
          nickname: nickname,
          bio: bio,
          sns: {
            [links[0].type]: links[0].link,
            [links[1].type]: links[1].link
          },
          selfIntro: introduce,
          skills: {
            [skills[0].skillName]: skills[0].fluency,
            [skills[1].skillName]: skills[1].fluency,
            [skills[2].skillName]: skills[2].fluency,
            [skills[3].skillName]: skills[3].fluency
          }
        });
        if (selectPicRef.current.files[0] !== undefined) {
          onSaveProfileImage(kakaoId, selectPicRef.current.files[0]);
        }
        navTo();
      } catch (error) {
        console.log(error);
        alert("프로필 작성에 실패했습니다.");
      }
    }
  };

  const onChangeName = (e) => {
    if (e.target.value.length > 10) return;
    setNickname(e.target.value);
  };

  const onChangeBio = (e) => {
    if (e.target.value.length > 20) return;
    setBio(e.target.value);
  };

  const onChangeIntroduce = (e) => {
    if (e.target.value.length > 300) return;
    setIntroduce(e.target.value);
  };

  const onChangeIcon = (id, input) => {
    setLinks(
      links.map((item, index) =>
        String(index) === String(id) ? { ...item, type: input.tool } : item
      )
    );
  };

  const onChangeLink = (id, input) => {
    setLinks(
      links.map((item, index) =>
        String(index) === String(id) ? { ...item, link: input } : item
      )
    );
  };

  const onChangeSkill = (id, type, input) => {
    if (type === "name") {
      setSkills(
        skills.map((item, index) =>
          String(index) === String(id) ? { ...item, skillName: input } : item
        )
      );
    } else if (type === "fluency") {
      setSkills(
        skills.map((item, index) =>
          String(index) === String(id)
            ? { ...item, fluency: Number(input) }
            : item
        )
      );
    }
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.profileForm__infoSection}>
        <div className={styles.profileForm__picture}>
          <img
            src={profileImage}
            alt="프로필 사진"
            onError={() => {
              setProfileImage(defaultProfilePic);
            }}
          />
          <input
            type="file"
            id="input_img"
            ref={selectPicRef}
            accept="image/*"
            onChange={onClickProfilePic}
          />
          <label htmlFor="input_img">변경하기</label>
        </div>
        <div className={styles.profileForm__info}>
          <div className={styles.profileForm__label}>기본 정보</div>
          <div className={styles.profileForm__form}>
            <div className={styles.profileForm__name}>
              <div className={styles.profileForm__formLabel}>닉네임</div>
              <input
                type="text"
                ref={nameRef}
                placeholder="ex) 홍길동"
                value={nickname}
                onChange={onChangeName}
              />
            </div>
            <div className={styles.profileForm__bio}>
              <div className={styles.profileForm__formLabel}>
                바이오<span>(20자 이내)</span>
              </div>
              <input
                type="text"
                ref={bioRef}
                placeholder="ex) 시각화로 소통하는 프론트엔트 개발자"
                value={bio}
                onChange={onChangeBio}
              />
            </div>
            <div className={styles.profileForm__age}>
              <div className={styles.profileForm__formLabel}>연령대</div>
              <div className={styles.profileForm__ageBox}>{age}</div>
            </div>
            <div className={styles.profileForm__sns}>
              <div className={styles.profileForm__formLabel}>SNS</div>
              <div className={styles.profileForm__link}>
                {links.map((link, index) => (
                  <CollabLink
                    key={index}
                    id={index}
                    type="SHORT"
                    init={link.type}
                    onClick={onChangeIcon}
                    onChange={onChangeLink}
                    ref={linkRefs[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.profileForm__introSection}>
        <div className={styles.profileForm__label}>INTRODUCE</div>
        <textarea
          placeholder="간단한 소개글을 입력해 주세요."
          ref={introduceRef}
          value={introduce}
          onChange={onChangeIntroduce}
        />
      </div>
      <div className={styles.profileForm__skillSection}>
        <div className={styles.profileForm__skillsTop}>
          <div className={styles.profileForm__label}>SKILLS</div>
          {/*<div className={styles.profileForm__searchBar}>
            <input type="text" placeholder="ex) JavaScript" />
            <button>
              <SearchIcon width="25px" height="25px" />
            </button>
          </div>*/}
          <div
            className={`${styles.profileForm__innerLabel} ${styles["profileForm__innerLabel--POINT"]}`}
          >
            사용가능한 4개의 기술 스택을 입력해주세요.
          </div>
        </div>
        <div className={styles.profileForm__innerLabel}>
          <span>기술 스택</span>
          <span>숙련도</span>
        </div>
        <div className={styles.profileForm__skillRange}>
          {skills.map((skill, index) => (
            <SkillRange
              key={index}
              id={index}
              skillName={skill.skillName}
              onChange={onChangeSkill}
              ref={skillRefs[index]}
            />
          ))}
        </div>
      </div>
      <div className={styles.profileForm__save}>
        <Button text="저장" type="RAD-10__FONT-M" onClick={onClickSave} />
      </div>
    </div>
  );
};

export default ProfileForm;
