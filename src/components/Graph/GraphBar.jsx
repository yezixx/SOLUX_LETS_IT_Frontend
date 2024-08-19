import styles from "./GraphBar.module.css";

const GraphBar = ({
  /*graph bar의 기본값*/
  /*props로 전달하여 custom */
  width = "600px",
  height = "20px",
  bgc = "teal",
  color = "teal",
  border = "1px solid var(--line-color)",
  borderRadius = "0px",
  borderTopRightRadius = "0px",
  borderBottomRightRadius = "0px",

  value = 0, //외부에서 준 graph bar의 색칠될 값
  showNumbers = true, // graph bar의 값을 숫자로 보여줄 것인가?

  //graph bar숫자의 위치
  top = "20px",
  right = "-5px",
}) => {
  const fillWidth = (parseFloat(width) * value) / 100; // 그래프의 색칠될 부분의 너비 계산
  const isHundread = value === 100 ? borderRadius : "0px";
  return (
    <div>
      <div
        className={styles.GraphBar__border}
        style={{
          width: width,
          height: height,
          border: border,
          borderRadius: borderRadius,
        }}
      >
        {/*graph 테두리*/}

        {/*graph에서 색칠될 부분 */}
        <div
          className={styles.GraphBar__colored}
          style={{
            width: fillWidth + "px",
            height: height,
            borderRadius: borderRadius,
            backgroundColor: bgc,
            borderTopRightRadius: isHundread,
            borderBottomRightRadius: isHundread,
          }}
        >
          {/*graph 하단 number - showNumbers true일 경우 보임*/}
          <div
            className={styles.GraphBar__number}
            style={{
              top: top,
              right: right,
            }}
          >
            {showNumbers ? <div style={{ color: color }}>{value}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphBar;
