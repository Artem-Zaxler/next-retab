const groups = ['ТРП-2-21', 'ПЭ-1-20', 'ИВТ-3-22', 'МТ-4-23'];
const teachers = ['Иванов И. И.', 'Петров П. П.', 'Сидоров С. С.', 'Кузнецов К. К.', 'Смирнов С. С.', 'Попов П. П.'];
const rooms = ['В-113', 'Г-214', 'Д-315', 'А-416', 'Б-517', 'В-618'];
const subjects = [
    'Java-технологии',
    'Программные методы обработки изображений и распознавания образов',
    'Программное обеспечение микропроцессоров и микроконтроллеров',
    'Технологии искусственного интеллекта',
    'Проектный практикум по управлению разработкой и разработке программного обеспечения',
    'Цифровые системы автоматизированного управления'
];

export function generateSubFilters(category) {
    let subFilters = [];

    switch (category) {
        case 'groups':
            subFilters = groups;
            break;
        case 'teachers':
            subFilters = teachers;
            break;
        case 'rooms':
            subFilters = rooms;
            break;
        case 'subjects':
            subFilters = subjects;
            break;
        default:
            subFilters = [];
    }

    for (let i = subFilters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [subFilters[i], subFilters[j]] = [subFilters[j], subFilters[i]];
    }

    return subFilters;
}
