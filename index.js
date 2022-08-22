import "../scss/main.scss";

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const videoBlock = document.querySelector('#video-block');
        if (videoBlock) {
            const video = document.querySelector('.video'),
                // playBtn = document.querySelector('.controls_play'),
                progress = document.querySelector('.progress'),
                playButton = document.querySelector('.play_btn'),
                pauseButton = document.querySelector('.pause_btn'),
                volume = document.querySelector('.volume'),
                volumeSvgPath = document.querySelectorAll('.volume_svg'),
                volumeSvgLine = document.querySelector('.svg_line')

            function playVideoStatus() {
                if (video.paused) {
                    video.play()
                }
            }

            function pauseVideoStatus() {
                if (video.paused) {
                    return
                } else {
                    video.pause()
                }
                video.pause()
            }

            function toggleVideoStatus() {
                if (video.paused) {
                    video.play()
                } else {
                    video.pause()
                }
            }

            playButton.addEventListener('click', playVideoStatus)
            pauseButton.addEventListener('click', pauseVideoStatus)
            video.addEventListener('click', toggleVideoStatus)

            function updateProgress() {
                progress.value = (video.currentTime / video.duration) * 100
                let target = document.getElementById('range')
                const min = target.min
                const max = target.max
                const val = target.value

                target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
            }

            video.addEventListener('timeupdate', updateProgress)

            function setProgress() {
                video.currentTime = (progress.value * video.duration) / 100
            }

            progress.addEventListener('change', setProgress)

            function mute() {
                if (video.muted) {
                    video.muted = false
                    volumeSvgPath.forEach(function (el) {
                        el.style.fill = '#F4F1EB'
                    });
                    volumeSvgLine.style.stroke = '#F4F1EB'
                } else {
                    video.muted = true
                    volumeSvgPath.forEach(function (el) {
                        el.style.fill = '#7C7C7C'
                    });
                    volumeSvgLine.style.stroke = '#7C7C7C'
                }
            }

            volume.addEventListener('click', mute)

            const rangeInputs = document.querySelectorAll('input[type="range"]')

            function handleInputChange(e) {
                let target = e.target
                if (e.target.type !== 'range') {
                    target = document.getElementById('range')
                }
                const min = target.min
                const max = target.max
                const val = target.value

                target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
            }

            rangeInputs.forEach(input => {
                input.addEventListener('input', handleInputChange)
            })
        }
    })
})()

const preloader = document.querySelector('.preloader')
const percents = document.getElementById('percents')

document.addEventListener('DOMContentLoaded', () => {

    const mediaFiles = document.querySelectorAll('video');
    let i = 0

    mediaFiles.forEach((file) => {
        file.onloadeddata = () => {
            i++

            percents.innerHTML = ((i * 100) / mediaFiles.length).toFixed(1)

            if (i === mediaFiles.length) {
                preloader.classList.add('preloader--hide')
                percents.innerHTML = 100
            }
        }
    })

})