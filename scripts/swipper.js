document.addEventListener('DOMContentLoaded', (event) => {
    const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,


        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            slideChange: function () {
                const activeIndex = this.activeIndex % 3;
                const wrapper = document.querySelector('.swiper-container-wrapper');
                wrapper.classList.remove('bg-shift-1', 'bg-shift-2', 'bg-shift-3');
                wrapper.classList.add(`bg-shift-${activeIndex + 1}`);
            },
        },
    });
});