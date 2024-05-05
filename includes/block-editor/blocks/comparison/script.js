document.addEventListener('DOMContentLoaded', () => {
    const comparison = document.querySelector('.comparison');

    if (comparison) {
        const slider = comparison.querySelector('.comparison__slider');
        const before = comparison.querySelector('.before');

        comparison.addEventListener('mousemove', (e) => {
            const xPosition = e.clientX;
            const containerWidth = comparison.offsetWidth;

            let percentage = (xPosition / containerWidth) * 100 - 1.5;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }

            slider.style.left = `${percentage}%`;
            before.style.width = `${percentage}%`;
        });

        comparison.addEventListener('touchmove', (e) => {
            const xPosition = e.targetTouches[0].pageX;
            const containerWidth = comparison.offsetWidth;

            let percentage = (xPosition / containerWidth) * 100;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }

            slider.style.left = `${percentage}%`;
            before.style.width = `${percentage}%`;
        });
    }
});
