//選擇畫面時間區塊

const timerDisplay = document.getElementById("timer");

//暫停鍵
const resetButton = document.getElementById("reset");


let totalTime = 300;//初始時間

let timeLeft = 300; // 25 分鐘

let countdownInterval = null;

//分分:秒秒格式
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // 分鐘
    const secs = seconds % 60 // 秒
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}



timerDisplay.textContent = formatTime(timeLeft);
//剛進網頁就顯示


//📌以下點擊開始計時
document.querySelector(".timer-ring").addEventListener("click", () => {
    const rabbit = document.querySelector(".rabbit-sprite");

    if (countdownInterval !== null) {
        //暫停中
        clearInterval(countdownInterval);
        countdownInterval = null;
        rabbit.classList.remove("rabbit-run");
        return;
    }



    //開始倒數
    rabbit.classList.add("rabbit-run")

    countdownInterval = setInterval(() => {
        timeLeft--;//📌每秒減1

        //以下圖片切換
        document.querySelector(".rabbit-sprite").classList.add("rabbit-run");

        //以下圓環


        const progressAngle = (timeLeft / totalTime) * 360;


        timerDisplay.textContent = formatTime(timeLeft);
        //更新顯示時間


        document.querySelector(".timer-ring").style.background =
            `conic-gradient(rgb(255, 77, 77) ${progressAngle}deg, #fff 0deg)`;


        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null; // 重置計時器
            timerDisplay.textContent = "00:00";
            alert("你做到了！")
        }
    }, 1000); // 每 1000ms 執行一次
});




//📌以下點擊重置計時
resetButton.addEventListener("click", () => {

    //以下圖片切換
    document.querySelector(".rabbit-sprite").classList.remove("rabbit-run");
    clearInterval(countdownInterval);
    countdownInterval = null; // 重置計時器
    timeLeft = 300; // 重置時間為 5 分鐘
    totalTime = 300;//重製圓環顯示
    timerDisplay.textContent = formatTime(timeLeft); // 更新顯示時間

    //圓環恢復
    document.querySelector(".timer-ring").style.background =
        `conic-gradient(#fff 360deg, rgb(255, 77, 77) 0deg)`

})


//以下切換

document.querySelectorAll('.switch-ball').forEach(ball => {
    ball.addEventListener('click', () => {

        clearInterval(countdownInterval);
        countdownInterval = null;//重製

        const newMinutes = parseInt(ball.dataset.minutes);
        timeLeft = newMinutes * 60; // 轉換為秒
        totalTime = timeLeft; // 更新總時間


        //更新圖片&圓環&顯示


        document.querySelector(".rabbit-sprite").classList.remove("rabbit-run");


        timerDisplay.textContent = formatTime(timeLeft);
        document.querySelector(".timer-ring").style.background =
            `conic-gradient(#fff 360deg, rgb(255, 77, 77) 0deg)`;
    });

});


