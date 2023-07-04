export const getItemStorage = (key) => {
    const itemArray = JSON.parse(localStorage.getItem(key) || "[]");
    return itemArray;
};
export const getArrayStorage = (key) => {
    const arrayString = localStorage.getItem(key) || "[]";
    return JSON.parse(arrayString);
};
//# sourceMappingURL=storageUtils.js.map