import { createStaticRanges } from 'react-date-range/dist/defaultRanges';

import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
} from 'date-fns';

const defineds = {
    startOfWeek: addDays(startOfWeek(new Date()), 1),
    endOfWeek: addDays(endOfWeek(new Date()), 1),
    startOfLastWeek: addDays(startOfWeek(addDays(new Date(), -7)), 1),
    endOfLastWeek: addDays(endOfWeek(addDays(new Date(), -7)), 1),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const defaultStaticRange = [
    {
        label: 'Сегодня',
        range: () => ({
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        }),
    },
    {
        label: 'Вчера',
        range: () => ({
            startDate: defineds.startOfYesterday,
            endDate: defineds.endOfYesterday,
        }),
    },

    {
        label: 'Текущая неделя',
        range: () => ({
            startDate: defineds.startOfWeek,
            endDate: defineds.endOfWeek,
        }),
    },
    {
        label: 'Прошлая неделя',
        range: () => ({
            startDate: defineds.startOfLastWeek,
            endDate: defineds.endOfLastWeek,
        }),
    },
    {
        label: 'Текущий месяц',
        range: () => ({
            startDate: defineds.startOfMonth,
            endDate: defineds.endOfMonth,
        }),
    },
    {
        label: 'Прошлый месяц',
        range: () => ({
            startDate: defineds.startOfLastMonth,
            endDate: defineds.endOfLastMonth,
        }),
    }
];

export const staticRanges = createStaticRanges(defaultStaticRange);

export const staticInputRanges = [];