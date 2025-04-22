

const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');

  video1.addEventListener('ended', () => {
    video1.style.display = 'none';
    video2.style.opacity = '1'; // Делаем второе видео видимым
    video2.play();
  });

  video2.addEventListener('ended', () => {
    video2.play(); // Зацикливание второго видео
  });


  // Эффект изменения шапки при скролле
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled', 'bg-black', 'bg-opacity-90', 'shadow-md');
      header.classList.remove('bg-opacity-30');
    } else {
      header.classList.remove('scrolled', 'bg-black', 'bg-opacity-90', 'shadow-md');
      header.classList.add('bg-opacity-30');
    }
  });

  // Функция для выбора издания игры
  function selectEdition(edition) {
    // Удаляем выделение со всех изданий
    document.querySelectorAll('[id$="-edition"]').forEach(el => {
      el.classList.remove(
        'border-blue-600',
        'ring-2',
        'ring-blue-500',
        'bg-blue-50',
        'transform',
        'scale-[1.02]'
      );
      // Находим кнопку внутри блока и сбрасываем её стиль
      const btn = el.querySelector('button');
      if (btn) {
        btn.classList.remove('bg-blue-700');
        btn.classList.add('bg-blue-600');
      }
    });
    
    // Добавляем выделение выбранному изданию
    const selectedEdition = document.getElementById(`${edition}-edition`);
    if (selectedEdition) {
      selectedEdition.classList.add(
        'border-blue-600',
        'ring-2',
        'ring-blue-500',
        'bg-blue-50',
        'transform',
        'scale-[1.02]'
      );
      // Изменяем стиль кнопки выбранного издания
      const selectedBtn = selectedEdition.querySelector('button');
      if (selectedBtn) {
        selectedBtn.classList.remove('bg-blue-600');
        selectedBtn.classList.add('bg-blue-700');
      }
    }
    
    // Можно добавить дополнительную логику, например:
    // - сохранение выбора в localStorage
    // - обновление цены в корзине
    console.log(`Выбрано издание: ${edition}`);
  }

// Устанавливаем дату окончания - 24 мая текущего года
function getEndDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  return new Date(currentYear, 4, 24); // Месяцы в JS: 0-январь, 4-май
}

function updateTimer() {
  const endDate = getEndDate();
  const now = new Date();
  const diff = endDate - now;
  
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
  } else {
    // Если дата прошла
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    clearInterval(timerInterval);
    
    // Можно добавить сообщение об окончании акции
    console.log("Акция завершена!");
  }
}

// Запускаем таймер сразу и обновляем каждую секунду
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

//Скрипт инициализации слайдера
  document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.characters-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    });
  });
