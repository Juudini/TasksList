//~~> Selectores
export const $selector = (selector: HTMLElement | any) =>
    document.querySelector(selector);
//~~> Input, Task, Button Add
export let taskInput = $selector("#taskInput");
export let taskList = $selector("#taskList");
export let taskImportant = $selector("#taskImportant");
export let taskCompleted = $selector("#taskCompleted");
export let taskCompletedList = document.getElementById(
    "taskCompleted"
) as HTMLElement;
export let buttonAdd = $selector("#btnAdd");
// >fin Selectores<

//~~> Tabs
export const tab1 = $selector("#ex1-tab-1") as HTMLElement;
export const tab2 = $selector("#ex1-tab-2") as HTMLElement;
export const tab3 = $selector("#ex1-tab-3") as HTMLElement;

export const divTabs1 = $selector("#tabs-1") as HTMLElement;
export const divTabs2 = $selector("#tabs-2") as HTMLElement;
export const divTabs3 = $selector("#tabs-3") as HTMLElement;
export const btnClear = $selector("#btnClear") as HTMLElement;
