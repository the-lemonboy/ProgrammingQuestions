{/* <script src=""></script> */}
import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

  export  function useTimer(initialTime) {
        const time = ref(initialTime * 1000)
        let timerInterval = null
        const start = () => {
            if (timerInterval) return // 避免重复启动
            timerInterval = setInterval(() => {
                time.value -= 1000
                if (time.value <= 0) {
                    time.value = 0
                    stop() // 时间到了自动停止
                }
            }, 1000)
        }

        // 停止计时
        const stop = () => {
            clearInterval(timerInterval)
            timerInterval = null // 清除计时器后将其重置为 null
        }

        // 重置时间
        const reset = (newTime) => {
            stop() // 重置时先停止计时器
            time.value = newTime * 1000
        }

        return {
            time,
            start,
            stop,
            reset
        }
    }