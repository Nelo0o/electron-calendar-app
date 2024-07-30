// calendar.ts
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

const calendarContent: HTMLElement | null = document.getElementById('calendarContent');
const prevMonthButton: HTMLElement | null = document.getElementById('prevMonth');
const nextMonthButton: HTMLElement | null = document.getElementById('nextMonth');
const currentMonthDisplay: HTMLElement | null = document.getElementById('currentMonth');

let currentMonth: Date = new Date();

function renderCalendar(month: Date): void {
    const startMonth: Date = startOfMonth(month);
    const endMonth: Date = endOfMonth(month);
    const startDate: Date = startOfWeek(startMonth);
    const endDate: Date = endOfWeek(endMonth);

    const days: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

    if (calendarContent) {
        calendarContent.innerHTML = '';

        days.forEach(day => {
            const dayElement: HTMLDivElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = format(day, 'd');
            calendarContent.appendChild(dayElement);
            if (isSameDay(day, new Date())) {
                dayElement.classList.add('currentDay');
            }
        });
    }
}

if (currentMonthDisplay) {
    currentMonthDisplay.textContent = format(currentMonth, 'MMMM yyyy');
}

if (prevMonthButton) {
    prevMonthButton.addEventListener('click', () => {
        currentMonth = subMonths(currentMonth, 1);
        renderCalendar(currentMonth);
        if (currentMonthDisplay) {
            currentMonthDisplay.textContent = format(currentMonth, 'MMMM yyyy');
        }
    });
}

if (nextMonthButton) {
    nextMonthButton.addEventListener('click', () => {
        currentMonth = addMonths(currentMonth, 1);
        renderCalendar(currentMonth);
        if (currentMonthDisplay) {
            currentMonthDisplay.textContent = format(currentMonth, 'MMMM yyyy');
        }
    });
}

renderCalendar(currentMonth);