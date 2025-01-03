export function generateSchedule(startOfWeek) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const schedule = {};

    daysOfWeek.forEach((day, index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);
        schedule[day] = generateDaySchedule(date);
    });

    return schedule;
}

function generateDaySchedule(date) {
    const subjects = [
        { subject: 'Java-технологии', cabinet: 'В-113', teacher: 'Иванов И. И.' },
        { subject: 'Программные методы обработки изображений и распознавания образов', cabinet: 'Г-214', teacher: 'Петров П. П.' },
        { subject: 'Программное обеспечение микропроцессоров и микроконтроллеров', cabinet: 'Д-315', teacher: 'Сидоров С. С.' },
        { subject: 'Технологии искусственного интеллекта', cabinet: 'А-416', teacher: 'Кузнецов К. К.' },
        { subject: 'Проектный практикум по управлению разработкой и разработке программного обеспечения', cabinet: 'Б-517', teacher: 'Смирнов С. С.' },
        { subject: 'Цифровые системы автоматизированного управления', cabinet: 'В-618', teacher: 'Попов П. П.' },
    ];

    const daySchedule = [];
    const numSubjects = Math.floor(Math.random() * subjects.length);
    for (let i = 0; i < numSubjects; i++) {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        daySchedule.push(subjects[randomIndex]);
    }

    return daySchedule;
}
