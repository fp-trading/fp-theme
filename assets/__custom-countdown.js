console.log('countdown.js')

const countdowns = document.querySelectorAll('span.announcement-bar__countdown');

countdowns.forEach(countdown => countdown.target = new Date(countdown.dataset['target']).getTime())

if (countdowns.length > 0) {
    setInterval(() => {
        countdowns.forEach(countdown => {
            const distance = countdown.target - new Date().getTime();

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
                const seconds = Math.floor(distance % (1000 * 60) / (1000));

                countdown.innerHTML = `${days}t ${hours}std ${minutes}min ${seconds}s`
            } else {
                countdown.innerHTML = "";
            }
        })
    }, 1000)
}