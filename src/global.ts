export { }
declare global {
    interface Window {
        "calendar": {
            openEventModal: (date: Date) => void
        }
    }
}