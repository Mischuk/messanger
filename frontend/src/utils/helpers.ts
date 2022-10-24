export const getCurrentTime = (): string => {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${hh}:${mm}`;
};
