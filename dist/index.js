import { getItemTasks, getItemImportant, createTaskElement, printingTasks, printTaskCompleted, } from "./modules/utils.js";
import { tab1, tab2, tab3, taskInput, taskList, taskImportant, buttonAdd, divTabs1, divTabs2, divTabs3, btnClear, } from "./modules/selectors.js";
let tasksArray = JSON.parse(localStorage.getItem("tasks") || "[]");
let importantArray = JSON.parse(localStorage.getItem("important") || "[]");
export let completedArray = JSON.parse(localStorage.getItem("completed") || "[]");
printingTasks(taskList, getItemTasks, tasksArray, "tasks");
printingTasks(taskImportant, getItemImportant, importantArray, "important");
const changeArray = (tab) => {
    if (tab === "tab1") {
        divTabs2.classList.remove("show", "active");
        divTabs3.classList.remove("show", "active");
        divTabs1.classList.add("show", "active");
        taskInput.setAttribute("placeholder", "Add a task for General");
    }
    else if (tab === "tab2") {
        divTabs1.classList.remove("show", "active");
        divTabs3.classList.remove("show", "active");
        divTabs2.classList.add("show", "active");
        taskInput.setAttribute("placeholder", "Add a task for Important");
    }
    else if (tab === "tab3") {
        divTabs1.classList.remove("show", "active");
        divTabs2.classList.remove("show", "active");
        divTabs3.classList.add("show", "active");
        taskInput.setAttribute("placeholder", "You cannot add tasks, only view them");
    }
};
const addTask = (e, createTaskFn, fromTaskList, getItemFrom, fromArray, storageKey) => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    if (taskInput.value !== "" && taskInput.value !== null) {
        let taskInputValue = taskInput.value;
        createTaskFn(taskInputValue, fromTaskList, getItemFrom, fromArray, storageKey);
        fromArray.push(taskInputValue);
    }
    localStorage.setItem(storageKey, JSON.stringify(fromArray));
};
tab1 === null || tab1 === void 0 ? void 0 : tab1.addEventListener("click", function () {
    changeArray("tab1");
    taskInput.disabled = false;
    buttonAdd.disabled = false;
});
tab2 === null || tab2 === void 0 ? void 0 : tab2.addEventListener("click", function () {
    changeArray("tab2");
    taskInput.disabled = false;
    buttonAdd.disabled = false;
});
tab3 === null || tab3 === void 0 ? void 0 : tab3.addEventListener("click", function () {
    changeArray("tab3");
    taskInput.value = "";
    taskInput.disabled = true;
    buttonAdd.disabled = true;
    printTaskCompleted();
});
buttonAdd.addEventListener("click", function (e) {
    if (tab1 === null || tab1 === void 0 ? void 0 : tab1.classList.contains("active")) {
        addTask(e, createTaskElement, taskList, getItemTasks, tasksArray, "tasks");
    }
    else if (tab2 === null || tab2 === void 0 ? void 0 : tab2.classList.contains("active")) {
        addTask(e, createTaskElement, taskImportant, getItemImportant, importantArray, "important");
    }
});
btnClear.addEventListener("click", () => {
    taskInput.value = "";
});
//# sourceMappingURL=index.js.map