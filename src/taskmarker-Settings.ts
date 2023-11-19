export interface TaskMarkerSettings {
    // completedAreaHeader: string;
    supportOperatingOnAnyLineText: boolean;
    defaultListTaskPrefix: string;
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
    cycleTaskValuesList1: string;
    cycleTaskValuesList2: string;
    cycleTaskValuesList3: string;
    supportCanceledTasks: boolean;
    supportCyclingTasksReversely: boolean;
    supportCyclingWithListItem: boolean;
    supportAppendingTextAutomatically: boolean;
    appendTextAutoLineDefault: string;
    appendTextAutoTaskDefault: string;
    previewOnClick: boolean;
    rightClickComplete: boolean;
    rightClickMark: boolean;
    rightClickCycle: boolean;
    rightClickCycleList1: boolean;
    rightClickCycleList2: boolean;
    rightClickCycleList3: boolean;
    rightClickCycleReversely: boolean;
    rightClickCreate: boolean;
    rightClickAppend: boolean;
    rightClickAppendText2: boolean;
    rightClickAppendText3: boolean;
    rightClickAppendTextAuto: boolean;
    // rightClickMove: boolean;
    rightClickResetTask: boolean;
    rightClickResetAll: boolean;
    rightClickToggleAll: boolean;
    // completedAreaRemoveCheckbox: boolean;
    onlyLowercaseX: boolean;
}

export const DEFAULT_SETTINGS: TaskMarkerSettings = {
    // completedAreaHeader: "## Log",
    supportOperatingOnAnyLineText: false,
    defaultListTaskPrefix: "none",
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
    cycleTaskValuesList1: "",
    cycleTaskValuesList2: "",
    cycleTaskValuesList3: "",
    onlyLowercaseX: false,
    supportCanceledTasks: true,
    supportCyclingTasksReversely: false,
    supportCyclingWithListItem: false,
    supportAppendingTextAutomatically: false,
    appendTextAutoLineDefault: "none",
    appendTextAutoTaskDefault: "none",
    previewOnClick: false,
    rightClickComplete: false,
    rightClickMark: false,
    rightClickCycle: false,
    rightClickCycleList1: false,
    rightClickCycleList2: false,
    rightClickCycleList3: false,
    rightClickCycleReversely: false,
    rightClickCreate: false,
    rightClickAppend: false,
    rightClickAppendText2: false,
    rightClickAppendText3: false,
    rightClickAppendTextAuto: false,
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
