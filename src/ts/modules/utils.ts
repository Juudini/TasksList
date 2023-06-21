import { $selector, taskCompletedList, taskInput } from "./selectors.js";
import { completedArray } from "../index.js";
// Get Item From Storage
export const getItemTasks = () => {
    let tasksArray: string[] = JSON.parse(
        localStorage.getItem("tasks") || "[]"
    );
    return tasksArray;
};
export const getItemImportant = () => {
    let importantArray: string[] = JSON.parse(
        localStorage.getItem("important") || "[]"
    );
    return importantArray;
};
const getItemCompleted = () => {
    let completedArray: string[] = JSON.parse(
        localStorage.getItem("completed") || "[]"
    );
    return completedArray;
};

//~~> Create Tasks Elements
export const createTaskElement = (
    taskText: string,
    fromTaskList: any,
    getItemArray: any,
    fromArray: string[],
    storageKey: string
): HTMLElement => {
    let task = document.createElement("li");
    task.setAttribute(
        "class",
        "list-group-item d-flex align-items-center border-0 mb-2 rounded"
    );
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "form-check-input me-2");
    input.setAttribute("aria-label", "...");

    // Eventos checkboxs
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

        // Aplicar el efecto de eliminación
        task.classList.add("fadeOut");
        setTimeout(() => {
            task.remove();
        }, 500); // Esperar 500ms antes de eliminar completamente el elemento
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
    fromTaskList: any,
    getItem: any,
    fromArray: any,
    storageKey: string
) => {
    fromArray.forEach((task: any) => {
        createTaskElement(task, fromTaskList, getItem, fromArray, storageKey);
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

            // Efectos
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
