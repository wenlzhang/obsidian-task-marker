export interface TaskCollectorSettings {
    // completedAreaHeader: string;
    removeExpression: string;
    appendDateFormat: string;
    appendTextFormatMark: string;
    appendTextFormatMarkRow2: string;
    appendRemoveAllTasks: boolean;
    incompleteTaskValues: string;
    incompleteTaskValuesRow2: string;
    cycleTaskValues: string;
    supportCanceledTasks: boolean;
    previewOnClick: boolean;
    rightClickComplete: boolean;
    rightClickMark: boolean;
    rightClickCycle: boolean;
    // rightClickMove: boolean;
    rightClickResetTask: boolean;
    rightClickResetAll: boolean;
    rightClickToggleAll: boolean;
    // completedAreaRemoveCheckbox: boolean;
    onlyLowercaseX: boolean;
}

export const DEFAULT_SETTINGS: TaskCollectorSettings = {
    // completedAreaHeader: "## Log",
    removeExpression: "",
    appendDateFormat: "",
    appendTextFormatMark: "",
    appendTextFormatMarkRow2: "",
    appendRemoveAllTasks: false,
    incompleteTaskValues: " ",
    incompleteTaskValuesRow2: "", // For choosing whether to show in the second row
    cycleTaskValues: "",
    onlyLowercaseX: false,
    supportCanceledTasks: true,
    previewOnClick: false,
    rightClickComplete: false,
    rightClickMark: false,
    rightClickCycle: false,
    // rightClickMove: false,
    rightClickResetTask: false,
    rightClickResetAll: false,
    rightClickToggleAll: false,
    // completedAreaRemoveCheckbox: false,
};
export interface CompiledTasksSettings {
    removeRegExp: RegExp;
    resetRegExp: RegExp;
    incompleteTaskRegExp: RegExp;
    incompleteTaskRegExpRow2: RegExp;
    rightClickTaskMenu: boolean;
    completedTasks: string;
    completedTaskRegExp: RegExp;
    registerHandlers: boolean;
}
