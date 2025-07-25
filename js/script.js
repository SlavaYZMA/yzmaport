document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, начинаю настройку событий');

    // Открытие модального окна для элементов таймлайна и кнопок процесса
    document.querySelectorAll('.timeline-item, .process-btn').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем переход по ссылке для .process-btn
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                console.log(`Клик по ${item.className}, открываю ${modalId}`);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.log(`Модальное окно ${modalId} не найдено для ${item.className}`);
            }
        });
    });

    // Закрытие модального окна по клику на крестик
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                console.log(`Закрываю модальное окно ${modal.id}`);
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                console.log(`Закрытие модального окна ${modal.id} по клику вне`);
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Анимация появления при скроллинге
    function checkVisibility() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // Скрытие легенды при прокрутке таймлайна
    window.addEventListener('scroll', function() {
        const timeline = document.querySelector('.timeline');
        const legend = document.querySelector('.timeline-legend-container');
        const timelineRect = timeline.getBoundingClientRect();
        if (timelineRect.left < 200) { // Когда таймлайн прокручен влево
            legend.classList.add('hidden');
        } else {
            legend.classList.remove('hidden');
        }
    });
});

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log(`Закрытие модального окна ${modalId} через функцию`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
