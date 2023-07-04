export const getItemStorage = (key: string) => {
    const itemArray: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    return itemArray;
};

export const getArrayStorage = (key: string): string[] => {
    const arrayString = localStorage.getItem(key) || "[]";
    return JSON.parse(arrayString);
};
