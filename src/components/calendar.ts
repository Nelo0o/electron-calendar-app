// calendar.ts
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

console.log("calendar api", window.electron);

const calendarContent: HTMLElement | null = document.getElementById('calendarContent');
const prevMonthButton: HTMLElement | null = document.getElementById('prevMonth');
const nextMonthButton: HTMLElement | null = document.getElementById('nextMonth');
const currentMonthDisplay: HTMLElement | null = document.getElementById('currentMonth');

let currentMonth: Date = new Date();

function fillEvents(month: Date): void {

    const lesEvents = window.electron.getAllEvents;

    lesEvents.forEach(event => {
        const lejour: HTMLElement = document.getElementById(event.date);

        lejour.classList.add('event');
        lejour.addEventListener('click', () => {
            window.electron.openEventModal(event.id);
        })

    })
}


function renderCalendar(month: Date): void {
    const startMonth: Date = startOfMonth(month);
    const endMonth: Date = endOfMonth(month);
    const startDate: Date = startOfWeek(startMonth);
    const endDate: Date = endOfWeek(endMonth);

    const days: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

    if (calendarContent) {month: Date
        calendarContent.classList.add('transition');

        setTimeout(() => {
            calendarContent.innerHTML = '';

            days.forEach(day => {
                const dayElement: HTMLDivElement = document.createElement('div');
                dayElement.className = 'day';
                dayElement.setAttribute("id", day.getDate()+"/"+day.getMonth()+"/"+day.getFullYear());
                dayElement.textContent = format(day, 'd');

                dayElement.addEventListener('click', () => {
                    window.electron.openEventModal(day);
                });

                if (day >= startMonth && day <= endMonth) {
                    calendarContent.appendChild(dayElement);
                    if (isSameDay(day, new Date())) {
                        dayElement.classList.add('currentDay');
                    }
                } else {
                    dayElement.classList.add('otherMonthDay');
                    calendarContent.appendChild(dayElement);
                }
            });
            calendarContent.classList.remove('transition');
            calendarContent.classList.add('is-visible');
        }, 200);
    }
}

function updateMonthDisplay(month: Date): void {
    if (currentMonthDisplay) {
        currentMonthDisplay.classList.add('transition');

        setTimeout(() => {
            currentMonthDisplay.textContent = format(month, 'MMMM yyyy');
            currentMonthDisplay.classList.remove('transition');
            currentMonthDisplay.classList.add('is-visible');
        }, 200);
    }
}

if (currentMonthDisplay) {
    currentMonthDisplay.classList.add('transition');
    currentMonthDisplay.textContent = format(currentMonth, 'MMMM yyyy');
    setTimeout(() => {
        currentMonthDisplay.classList.remove('transition');
        currentMonthDisplay.classList.add('is-visible');
    }, 200);
}

if (prevMonthButton) {
    prevMonthButton.addEventListener('click', () => {
        currentMonth = subMonths(currentMonth, 1);
        renderCalendar(currentMonth);
        updateMonthDisplay(currentMonth);
    });
}

if (nextMonthButton) {
    nextMonthButton.addEventListener('click', () => {
        currentMonth = addMonths(currentMonth, 1);
        renderCalendar(currentMonth);
        updateMonthDisplay(currentMonth);
    });
}

if (calendarContent) {
    calendarContent.classList.add('is-visible');
}

renderCalendar(currentMonth);