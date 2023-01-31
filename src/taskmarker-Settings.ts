export interface TaskMarkerSettings {
    // completedAreaHeader: string;
    removeExpression: string;
    appendDateFormat: string;
    appendTextFormatMark: string;
    appendTextFormatMarkRow2: string;
    appendTextFormatCreation: string;
    appendTextFormatAppend: string;
    appendTextFormatAppendText2: string;
    appendTextFormatAppendText3: string;
    appendRemoveAllTasks: boolean;
    incompleteTaskValues: string;
    incompleteTaskValuesRow2: string;
    cycleTaskValues: string;
    supportCanceledTasks: boolean;
    previewOnClick: boolean;
    rightClickComplete: boolean;
    rightClickMark: boolean;
    rightClickCycle: boolean;
    rightClickCreate: boolean;
    rightClickAppend: boolean;
    rightClickAppendText2: boolean;
    rightClickAppendText3: boolean;
    // rightClickMove: boolean;
    rightClickResetTask: boolean;
    rightClickResetAll: boolean;
    rightClickToggleAll: boolean;
    // completedAreaRemoveCheckbox: boolean;
    onlyLowercaseX: boolean;
}

export const DEFAULT_SETTINGS: TaskMarkerSettings = {
    // completedAreaHeader: "## Log",
    removeExpression: "",
    appendDateFormat: "",
    appendTextFormatMark: "",
    appendTextFormatMarkRow2: "",
    appendTextFormatCreation: "",
    appendTextFormatAppend: "",
    appendTextFormatAppendText2: "",
    appendTextFormatAppendText3: "",
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
    rightClickCreate: false,
    rightClickAppend: false,
    rightClickAppendText2: false,
    rightClickAppendText3: false,
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
    // createTaskRegExp: RegExp; // Maybe not needed
    rightClickTaskMenu: boolean;
    completedTasks: string;
    completedTaskRegExp: RegExp;
    registerHandlers: boolean;
}
