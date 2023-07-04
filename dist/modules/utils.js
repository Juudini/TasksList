import { $selector, taskCompletedList, taskInput } from "./selectors.js";
import { completedArray } from "../index.js";
import { getItemStorage } from "./storageUtils.js";
export const getItemTasks = () => {
    return getItemStorage("tasks");
};
export const getItemImportant = () => {
    return getItemStorage("important");
};
const getItemCompleted = () => {
    return getItemStorage("completed");
};
export const createTaskElement = ({ taskText, fromTaskList, getItemArray, fromArray, storageKey, }) => {
    let task = document.createElement("li");
    task.setAttribute("class", "list-group-item d-flex align-items-center border-0 mb-2 rounded");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "form-check-input me-2");
    input.setAttribute("aria-label", "...");
    input.addEventListener("change", function () {
        const parentElement = this.parentElement;
        if (this.checked) {
            setTimeout(() => {
                const REMOVE_ID = removeTask.getAttribute("remove-id");
                removeTaskAction(REMOVE_ID, getItemArray, fromArray, storageKey);
                completedArray.push(REMOVE_ID);
                localStorage.setItem("completed", JSON.stringify(completedArray));
            }, 500);
            parentElement.style.textDecoration = "line-through";
            parentElement.style.color = "#495057";
        }
        else {
            parentElement.style.textDecoration = "none";
            parentElement.style.color = "#ADB5BD";
        }
    });
    task.insertBefore(document.createTextNode(taskText), task.firstChild);
    task.insertBefore(input, task.firstChild);
    let containRemove = document.createElement("a");
    containRemove.setAttribute("title", "Remove task");
    containRemove.setAttribute("class", "ms-auto");
    let removeTask = document.createElement("i");
    removeTask.setAttribute("id", "removeTask");
    removeTask.setAttribute("class", "bi bi-x");
    removeTask.setAttribute("remove-id", taskText);
    removeTask.addEventListener("click", () => {
        const REMOVE_ID = removeTask.getAttribute("remove-id");
        removeTaskAction(REMOVE_ID, getItemArray, fromArray, storageKey);
        task.classList.add("fadeOut");
        setTimeout(() => {
            task.remove();
        }, 500);
    });
    containRemove.appendChild(removeTask);
    task.appendChild(containRemove);
    fromTaskList.insertBefore(task, fromTaskList.firstChild);
    task.classList.add("fade-in");
    taskInput.value = "";
    return task;
};
const removeTaskAction = (REMOVE_ID, getItemArray, fromArray, storageKey) => {
    getItemArray();
    const index = fromArray.indexOf(REMOVE_ID);
    if (index !== -1) {
        fromArray.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(fromArray));
        const taskElement = $selector(`[remove-id="${REMOVE_ID}"]`).closest("li");
        taskElement && taskElement.remove();
    }
};
export const printingTasks = (fromTaskList, getItem, fromArray, storageKey) => {
    fromArray.forEach((task) => {
        const taskParams = {
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
        task.setAttribute("class", "list-group-item d-flex align-items-center border-0 mb-2 rounded");
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
        removeTask.addEventListener("click", () => {
            const REMOVE_ID = removeTask.getAttribute("remove-id");
            removeTaskAction(REMOVE_ID, getItemCompleted, completedArray, "completed");
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
//# sourceMappingURL=utils.js.map