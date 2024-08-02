// calendar.ts
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { ipcRenderer, ipcMain } from 'electron';
import { IEvent } from '../interfaces/IEvents';

console.log("calendar api", window.electron);

const calendarContent: HTMLElement | null = document.getElementById('calendarContent');
const prevMonthButton: HTMLElement | null = document.getElementById('prevMonth');
const nextMonthButton: HTMLElement | null = document.getElementById('nextMonth');
const currentMonthDisplay: HTMLElement | null = document.getElementById('currentMonth');

let currentMonth: Date = new Date();

function createEventIndicator(): HTMLElement {
    const eventIndicator = document.createElement('span');
    eventIndicator.className = 'event-indicator';
    return eventIndicator;
}



function fillEvents(month: Date): void {

    const lesEvents = window.electron.getAllEvents().then((event) => {

        event.forEach(lEvent => {

            if (document.getElementById(lEvent.date)) {

                const lejour: HTMLElement = document.getElementById(lEvent.date);
                const eventIndicator = createEventIndicator();

                eventIndicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // window.electron.openEventModal(lEvent.id);
                })

                lejour.appendChild(eventIndicator);
            }

        })
    }).catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
    });
}

function displayEventsForDay(date: string): void {
    const eventList: HTMLElement | null = document.getElementById('event-list');
    const eventListTitle: HTMLElement | null = document.getElementById('event-list-title');
    if (!eventList) return;

    eventList.innerHTML = '';

    window.electron.getAllEvents().then(events => {
        const eventsForDay = events.filter(event => event.date === date);
        eventListTitle.textContent = `Liste des événements du ${format(new Date(date), 'dd/MM/yyyy')}`;
        if (eventsForDay.length === 0) {
            const noEventItem = document.createElement('li');
            noEventItem.textContent = "Aucun événement de prévu";
            noEventItem.classList.add('no-event');
            eventList.appendChild(noEventItem);
        } else {
            eventsForDay.forEach(event => {
                const eventItem = document.createElement('li');
                eventItem.textContent = `${event.time.slice(0, 5)} - ${event.titre}`;
                eventList.appendChild(eventItem);
                eventItem.addEventListener('click', () => {
                    window.electron.openEventModal(event.id);
                })
            });
        }
    }).catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
    });
}

function renderCalendar(month: Date): void {
    const startMonth: Date = startOfMonth(month);
    const endMonth: Date = endOfMonth(month);
    const startDate: Date = startOfWeek(startMonth);
    const endDate: Date = endOfWeek(endMonth);

    const days: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

    if (calendarContent) {
        calendarContent.classList.add('transition');

        setTimeout(() => {
            calendarContent.innerHTML = '';

            days.forEach(day => {
                const dayElement: HTMLDivElement = document.createElement('div');
                dayElement.className = 'day';
                let lejour = "";
                const monthIndex = day.getMonth() + 1;
                if (monthIndex >= 10) {
                    lejour = "" + monthIndex;
                } else {
                    lejour = "0" + monthIndex;
                }
                dayElement.setAttribute("id", day.getFullYear() + "-" + lejour + "-" + day.getDate());
                dayElement.textContent = format(day, 'd');

                dayElement.addEventListener('click', () => {
                    const dateStr = day.getFullYear() + "-" + lejour + "-" + (day.getDate() < 10 ? "0" + day.getDate() : day.getDate());
                    displayEventsForDay(dateStr);
                });

                if (day >= startMonth && day <= endMonth) {
                    calendarContent.appendChild(dayElement);
                    if (isSameDay(day, new Date())) {
                        dayElement.classList.add('currentDay');
                        displayEventsForDay(day.getFullYear() + "-" + lejour + "-" + (day.getDate() < 10 ? "0" + day.getDate() : day.getDate()));
                    }
                } else {
                    dayElement.classList.add('otherMonthDay');
                    calendarContent.appendChild(dayElement);
                }
            });
            calendarContent.classList.remove('transition');
            calendarContent.classList.add('is-visible');
            fillEvents(month);
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