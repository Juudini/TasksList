import { $selector, taskCompletedList, taskInput } from "./selectors.js";
import { completedArray } from "../index.js";
import { getItemStorage } from "./storageUtils.js";
import { TaskElementParams } from "./interfaces.js";

// Get Item From Storage
export const getItemTasks = () => {
    return getItemStorage("tasks");
};
export const getItemImportant = () => {
    return getItemStorage("important");
};
const getItemCompleted = () => {
    return getItemStorage("completed");
};

//~~> Create Tasks Elements
export const createTaskElement = ({
    taskText,
    fromTaskList,
    getItemArray,
    fromArray,
    storageKey,
}: TaskElementParams): HTMLElement => {
    let task = document.createElement("li");
    task.setAttribute(
        "class",
        "list-group-item d-flex align-items-center border-0 mb-2 rounded"
    );
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "form-check-input me-2");
    input.setAttribute("aria-label", "...");

    // Checkboxs Events
    input.addEventListener("change", function (this: HTMLInputElement) {
        const parentElement = this.parentElement!;
        if (this.checked) {
            setTimeout(() => {
                // Remove action
                const REMOVE_ID = removeTask.getAttribute("remove-id") as any;
                removeTaskAction(
                    REMOVE_ID,
                    getItemArray,
                    fromArray,
                    storageKey
                );
                completedArray.push(REMOVE_ID);
                // Up to Storage
                localStorage.setItem(
                    "completed",
                    JSON.stringify(completedArray)
                );
            }, 500);
            parentElement.style.textDecoration = "line-through";
            parentElement.style.color = "#495057";
        } else {
            parentElement.style.textDecoration = "none";
            parentElement.style.color = "#ADB5BD";
        }
    });

    //Append
    task.insertBefore(document.createTextNode(taskText), task.firstChild);
    task.insertBefore(input, task.firstChild);

    // Remove Task Icon (X)
    let containRemove = document.createElement("a");
    containRemove.setAttribute("title", "Remove task");
    containRemove.setAttribute("class", "ms-auto");
    let removeTask = document.createElement("i");
    removeTask.setAttribute("id", "removeTask");
    removeTask.setAttribute("class", "bi bi-x");
    removeTask.setAttribute("remove-id", taskText);

    // Remove action
    removeTask.addEventListener("click", () => {
        const REMOVE_ID = removeTask.getAttribute("remove-id");
        removeTaskAction(REMOVE_ID, getItemArray, fromArray, storageKey);

        // Effect deleting
        task.classList.add("fadeOut");
        setTimeout(() => {
            task.remove();
        }, 500);
    });
    //Append
    containRemove.appendChild(removeTask);
    task.appendChild(containRemove);
    fromTaskList.insertBefore(task, fromTaskList.firstChild);
    task.classList.add("fade-in");
    taskInput.value = "";
    return task;
};

// Remove Task Element
const removeTaskAction = (
    REMOVE_ID: any,
    getItemArray: any,
    fromArray: any,
    storageKey: string
) => {
    getItemArray();
    const index = fromArray.indexOf(REMOVE_ID);
    if (index !== -1) {
        fromArray.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(fromArray));

        // Eliminar el elemento del HTML
        const taskElement = $selector(`[remove-id="${REMOVE_ID}"]`).closest(
            "li"
        );
        taskElement && taskElement.remove();
    }
};

//~~> Print Task
export const printingTasks = (
    fromTaskList: HTMLElement,
    getItem: () => string[],
    fromArray: string[],
    storageKey: string
) => {
    fromArray.forEach((task) => {
        const taskParams: TaskElementParams = {
            taskText: task,
            fromTaskList: fromTaskList,
            getItemArray: getItem,
            fromArray: fromArray,
            storageKey: storageKey,
        };
        createTaskElement(taskParams);
    });
};

export const printTaskCompleted = () => {
    let taskText = getItemCompleted();
    taskCompletedList.innerHTML = "";
    taskText.forEach((text) => {
        let task = document.createElement("li");
        task.setAttribute(
            "class",
            "list-group-item d-flex align-items-center border-0 mb-2 rounded"
        );

        let checkboxContainer = document.createElement("s");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "form-check-input me-2");
        input.setAttribute("aria-label", "...");
        input.setAttribute("checked", "");
        input.disabled = true;

        let containRemove = document.createElement("a");
        containRemove.setAttribute("title", "Remove task");
        containRemove.setAttribute("class", "ms-auto");
        let removeTask = document.createElement("i");
        removeTask.setAttribute("id", "removeTask");
        removeTask.setAttribute("class", "bi bi-x");
        removeTask.setAttribute("remove-id", text);

        // Remove action
        removeTask.addEventListener("click", () => {
            const REMOVE_ID = removeTask.getAttribute("remove-id");
            removeTaskAction(
                REMOVE_ID,
                getItemCompleted,
                completedArray,
                "completed"
            );
            // Effects
            task.classList.add("fadeOut");
            setTimeout(() => {
                task.remove();
            }, 500);
        });
        checkboxContainer.appendChild(input);
        let subText = document.createElement("s");
        subText.textContent = text;
        task.appendChild(checkboxContainer);
        task.appendChild(subText);
        containRemove.appendChild(removeTask);
        task.appendChild(containRemove);
        task.classList.add("fade-in");
        taskCompletedList.appendChild(task);
    });
};
