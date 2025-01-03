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
    // Simulate schedule data for the given date
    const subjects = [
        { subject: 'Математика', cabinet: 'В-113', teacher: 'Иванов И. И.' },
        { subject: 'Физика', cabinet: 'Г-214', teacher: 'Петров П. П.' },
        { subject: 'Химия', cabinet: 'Д-315', teacher: 'Сидоров С. С.' },
        { subject: 'Биология', cabinet: 'А-416', teacher: 'Кузнецов К. К.' },
        { subject: 'История', cabinet: 'Б-517', teacher: 'Смирнов С. С.' },
        { subject: 'Искусство', cabinet: 'В-618', teacher: 'Попов П. П.' },
    ];

    // Randomly select subjects for the day
    const daySchedule = [];
    const numSubjects = Math.floor(Math.random() * subjects.length);
    for (let i = 0; i < numSubjects; i++) {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        daySchedule.push(subjects[randomIndex]);
    }

    return daySchedule;
}
