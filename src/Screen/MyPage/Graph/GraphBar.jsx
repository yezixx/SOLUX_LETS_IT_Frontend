

const GraphBar=({
    /*graph bar의 기본값*/
    /*props로 전달하여 custom */
    width='600px', 
    height='20px', 
    bgc='teal', 
    color='teal',
    border='1px solid var(--line-color)',
    borderRadius = '0px',
    borderTopRightRadius='0px',
    borderBottomRightRadius='0px',

    value= 0, //외부에서 준 graph bar의 색칠될 값
    showNumbers = true // graph bar의 값을 숫자로 보여줄 것인가?


    })=>{

    const fillWidth = (parseFloat(width) * value) / 100; // 그래프의 색칠될 부분의 너비 계산

    return(
        <div>
            <div style={{
                width : width,
                height : height,
                backgroundColor: 'white',
                border: border,
                borderRadius: borderRadius,
            }}>
            {/*graph 테두리*/}

            {/*graph에서 색칠될 부분 */}
                <div style={{
                    width : fillWidth+'px',
                    height : height,
                    borderRadius: borderRadius,
                    backgroundColor: bgc,
                    borderTopRightRadius: borderTopRightRadius,
                    borderBottomRightRadius: borderBottomRightRadius,
                    position: 'relative'
                }}>
                </div>
            {/*graph 하단 number - showNumbers true일 경우 보임*/}
                <div>
                    {showNumbers ? 
                    <div style={{
                        position: 'absolute',
                        transform: `translateX(${fillWidth-10}px)`,
                        color: color,
                        marginTop: '5px',
                        fontSize: '14px'
                    }}>
                        {value}</div> : null}
                </div>
            </div>
        </div>
    )
}

export default GraphBar