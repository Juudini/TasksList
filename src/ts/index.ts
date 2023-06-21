//Modules
import {
    getItemTasks,
    getItemImportant,
    createTaskElement,
    printingTasks,
    printTaskCompleted,
} from "./modules/utils.js";
import {
    tab1,
    tab2,
    tab3,
    taskInput,
    taskList,
    taskImportant,
    buttonAdd,
    divTabs1,
    divTabs2,
    divTabs3,
    btnClear,
} from "./modules/selectors.js";

//~~> Array tasks
let tasksArray: string[] = JSON.parse(localStorage.getItem("tasks") || "[]");
//~~> Array Important
let importantArray: string[] = JSON.parse(
    localStorage.getItem("important") || "[]"
);
//~~> Array Completed
export let completedArray: string[] = JSON.parse(
    localStorage.getItem("completed") || "[]"
);

//Print Tasks
printingTasks(taskList, getItemTasks, tasksArray, "tasks");
printingTasks(taskImportant, getItemImportant, importantArray, "important");

//Change Attributes
const changeArray = (tab: string) => {
    if (tab === "tab1") {
        divTabs2.classList.remove("show", "active");
        divTabs3.classList.remove("show", "active");
        divTabs1.classList.add("show", "active");
        taskInput.setAttribute("placeholder", "Add a task for General");
    } else if (tab === "tab2") {
        divTabs1.classList.remove("show", "active");
        divTabs3.classList.remove("show", "active");
        divTabs2.classList.add("show", "active");
        taskInput.setAttribute("placeholder", "Add a task for Important");
    } else if (tab === "tab3") {
        divTabs1.classList.remove("show", "active");
        divTabs2.classList.remove("show", "active");
        divTabs3.classList.add("show", "active");
        taskInput.setAttribute(
            "placeholder",
            "You cannot add tasks, only view them"
        );
    }
};

//Function Add Individual Task
const addTask = (
    e: Event | null,
    createTaskFn: Function,
    fromTaskList: any,
    getItemFrom: Function,
    fromArray: string[],
    storageKey: string
) => {
    e?.preventDefault();
    if (taskInput.value !== "" && taskInput.value !== null) {
        let taskInputValue: string = taskInput.value;
        createTaskFn(
            taskInputValue,
            fromTaskList,
            getItemFrom,
            fromArray,
            storageKey
        );
        fromArray.push(taskInputValue); //~~> Save to Array
    }
    //~~> Up to Storage
    localStorage.setItem(storageKey, JSON.stringify(fromArray));
};

//~~> Add event
tab1?.addEventListener("click", function () {
    changeArray("tab1");
    taskInput.disabled = false;
    buttonAdd.disabled = false;
});
tab2?.addEventListener("click", function () {
    changeArray("tab2");
    taskInput.disabled = false;
    buttonAdd.disabled = false;
});
tab3?.addEventListener("click", function () {
    changeArray("tab3");
    taskInput.value = "";
    taskInput.disabled = true;
    buttonAdd.disabled = true;
    printTaskCompleted();
});

//Add event Button Add
buttonAdd.addEventListener("click", function (e: Event) {
    if (tab1?.classList.contains("active")) {
        addTask(
            e,
            createTaskElement,
            taskList,
            getItemTasks,
            tasksArray,
            "tasks"
        );
    } else if (tab2?.classList.contains("active")) {
        addTask(
            e,
            createTaskElement,
            taskImportant,
            getItemImportant,
            importantArray,
            "important"
        );
    }
});
//Evento clear Input
btnClear.addEventListener("click", () => {
    taskInput.value = "";
});
