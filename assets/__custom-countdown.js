console.log('countdown.js')

const countdowns = document.querySelectorAll('span.announcement-bar__countdown');

countdowns.forEach(countdown => countdown.target = new Date(countdown.dataset['target']).getTime())

setInterval(() => {
    countdowns.forEach(countdown => {
        const distance = countdown.target - new Date().getTime();

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
        const seconds = Math.floor(distance % (1000 * 60) / (1000));

        countdown.innerHTML = `${days}t ${hours}std ${minutes}min ${seconds}s`
    })
}, 1000)