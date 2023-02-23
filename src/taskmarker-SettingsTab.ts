import { App, moment, PluginSettingTab, Setting } from "obsidian";
import {
    TaskMarkerSettings,
    // DEFAULT_SETTINGS,
} from "./taskmarker-Settings";
import { TaskMarker } from "./taskmarker-TaskMarker";
import TaskMarkerPlugin from "./main";

export class TaskMarkerSettingsTab extends PluginSettingTab {
    plugin: TaskMarkerPlugin;
    taskMarker: TaskMarker;

    constructor(
        app: App,
        plugin: TaskMarkerPlugin,
        taskMarker: TaskMarker
    ) {
        super(app, plugin);
        this.plugin = plugin;
        this.taskMarker = taskMarker;
    }

    display(): void {
        this.containerEl.empty();

        this.containerEl.createEl("h1", { text: "Task Marker" });

        const tempSettings: TaskMarkerSettings = Object.assign(
            this.taskMarker.settings
        );
        
        this.containerEl.createEl("h3", {
            text: "Reopen the vault or restart Obsidian if the following setting changes do not take effect.",
        });

        this.containerEl.createEl("h2", { text: "Create tasks" });

        this.containerEl.createEl("p", {
            text: "Created tasks gain treatment based on the settings below.",
        });

        new Setting(this.containerEl)
            .setName("Append text to created task")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the task text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("[📝 ]YYYY-MM-DD")
                    .setValue(tempSettings.appendTextFormatCreation)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendTextFormatCreation = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
            );

        this.containerEl.createEl("h2", { text: "Complete tasks" });

        this.containerEl.createEl("p", {
            text: "Completed tasks gain treatment based on the settings below.",
        });

        new Setting(this.containerEl)
            .setName("Only support x for completed tasks")
            .setDesc(
                "Only use 'x' (lower case) to indicate completed tasks (hide X (upper case))."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.onlyLowercaseX)
                    .onChange(async (value) => {
                        tempSettings.onlyLowercaseX = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(this.containerEl)
            .setName("Support canceled tasks")
            .setDesc(
                "Use '-' to indicate canceled tasks. Canceled tasks are processed in the same way as completed tasks."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.supportCanceledTasks)
                    .onChange(async (value) => {
                        tempSettings.supportCanceledTasks = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(this.containerEl)
            .setName("Append text to completed task")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the task text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("[✅ ]YYYY-MM-DD")
                    .setValue(tempSettings.appendDateFormat)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendDateFormat = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
            );

        // new Setting(this.containerEl)
        //     .setName("Remove text in completed task")
        //     .setDesc(
        //         "Text matching this regular expression should be removed from the task text. Be careful! Test your expression first. The global flag, 'g' is used for a per-line match."
        //     )
        //     .addText((text) =>
        //         text
        //             .setPlaceholder(" #(todo|task)")
        //             .setValue(tempSettings.removeExpression)
        //             .onChange(async (value) => {
        //                 try {
        //                     // try compiling the regular expression
        //                     this.taskMarker.tryCreateRemoveRegex(value);

        //                     tempSettings.removeExpression = value;
        //                     this.taskMarker.updateSettings(tempSettings);
        //                     await this.plugin.saveSettings();
        //                 } catch (e) {
        //                     console.log(
        //                         `Error parsing regular expression for text replacement: ${value}`
        //                     );
        //                 }
        //             })
        //     );

        // new Setting(this.containerEl)
        //     .setName("Apply these settings to all tasks")
        //     .setDesc(
        //         "Append and remove text as configured above when marking tasks with anything other than a space (to reset)."
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.appendRemoveAllTasks)
        //             .onChange(async (value) => {
        //                 tempSettings.appendRemoveAllTasks = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );
        
        this.containerEl.createEl("h2", { text: "Mark tasks" });

        this.containerEl.createEl("p", {
            text: "Marked tasks gain treatment based on the settings below. Note that if a mark contains both in row 1 and row 2, then the mark would work as specified in row 1.",
        });

        new Setting(this.containerEl)
            .setName("Additional task statuses (row 1)")
            .setDesc(
                "Specify the set of characters that indicate in-progress or incomplete tasks, e.g. 'i>!?D'. **All of them (excluding the first open status) can be assigned with hotkeys.**"
            )
            .addText((text) =>
                text
                    .setPlaceholder(">!?")
                    .setValue(tempSettings.incompleteTaskValues)
                    .onChange(async (value) => {
                        if (value.contains("x")) {
                            console.log(
                                `Set of characters should not contain the marker for completed tasks (x): ${value}`
                            );
                        } else if (
                            !tempSettings.onlyLowercaseX &&
                            value.contains("X")
                        ) {
                            console.log(
                                `Set of characters should not contain the marker for completed tasks (X): ${value}`
                            );
                        } else if (
                            tempSettings.supportCanceledTasks &&
                            value.contains("-")
                        ) {
                            console.log(
                                `Set of characters should not contain the marker for canceled tasks (-): ${value}`
                            );
                        } else {
                            if (!value.contains(" ")) { // Not working if removed
                                // make sure space is included
                                value = " " + value;
                            }
                            tempSettings.incompleteTaskValues = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        }
                    })
            );
        
        new Setting(this.containerEl)
            .setName("Append text to marked task (row 1)")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the task text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("[❎ ]YYYY-MM-DD")
                    .setValue(tempSettings.appendTextFormatMark)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendTextFormatMark = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
            );
        
        new Setting(this.containerEl)
        .setName("Additional task statuses (row 2)")
        .setDesc(
            "Specify the set of characters that indicate task statuses, e.g. 'Rip'. **All of them can be assigned with hotkeys.**"
        )
        .addText((text) =>
            text
                .setPlaceholder("Rip")
                .setValue(tempSettings.incompleteTaskValuesRow2)
                .onChange(async (value) => {
                    if (value.contains("x")) {
                        console.log(
                            `Set of characters should not contain the marker for completed tasks (x): ${value}`
                        );
                    } else if (
                        !tempSettings.onlyLowercaseX &&
                        value.contains("X")
                    ) {
                        console.log(
                            `Set of characters should not contain the marker for completed tasks (X): ${value}`
                        );
                    } else if (
                        tempSettings.supportCanceledTasks &&
                        value.contains("-")
                    ) {
                        console.log(
                            `Set of characters should not contain the marker for canceled tasks (-): ${value}`
                        );
                    } else {
                        tempSettings.incompleteTaskValuesRow2 = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    }
                })
        );
        
        new Setting(this.containerEl)
            .setName("Append text to marked task (row 2)")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the task text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("YYYY-MM-DD")
                    .setValue(tempSettings.appendTextFormatMarkRow2)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendTextFormatMarkRow2 = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
            );
        
        this.containerEl.createEl("h2", { text: "Cycle tasks" });

        this.containerEl.createEl("p", {
            text: "Cycled tasks gain treatment based on the settings below.",
        });

        new Setting(this.containerEl)
            .setName("Cycled task statuses")
            .setDesc(
                "Specify the set of characters that indicate any task statuses, e.g. 'x- Rip>'."
        )
        .addText((text) =>
            text
                .setPlaceholder("x- Rip")
                .setValue(tempSettings.cycleTaskValues)
                .onChange(async (value) => {
                    tempSettings.cycleTaskValues = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        new Setting(this.containerEl)
            .setName("Support cycling task status reversely")
            .setDesc(
                "Default disabled. If enabled, a command would be added to cycle reversely among the statuses as specified above."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.supportCyclingTasksReversely)
                    .onChange(async (value) => {
                        tempSettings.supportCyclingTasksReversely = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
        );

        this.containerEl.createEl("h2", { text: "Append text" });

        this.containerEl.createEl("p", {
            text: "Appended text gains treatment based on the settings below.",
        });

        new Setting(this.containerEl)
            .setName("Append text to any line (text 1)")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the line text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("[📝 ]YYYY-MM-DD")
                    .setValue(tempSettings.appendTextFormatAppend)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendTextFormatAppend = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
        );
        
        new Setting(this.containerEl)
        .setName("Append text to any line (text 2)")
        .setDesc(
            "Default empty. If set non-empty, append the string of moment.js format to the end of the line text."
        )
        .addMomentFormat((momentFormat) =>
            momentFormat
                .setPlaceholder("[✅ ]YYYY-MM-DD")
                .setValue(tempSettings.appendTextFormatAppendText2)
                .onChange(async (value) => {
                    try {
                        // Try formatting "now" with the specified format string
                        moment().format(value);
                        tempSettings.appendTextFormatAppendText2 = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    } catch (e) {
                        console.log(
                            `Error parsing specified date format: ${value}`
                        );
                    }
                })
        );

        new Setting(this.containerEl)
            .setName("Append text to any line (text 3)")
            .setDesc(
                "Default empty. If set non-empty, append the string of moment.js format to the end of the line text."
            )
            .addMomentFormat((momentFormat) =>
                momentFormat
                    .setPlaceholder("[❎ ]YYYY-MM-DD")
                    .setValue(tempSettings.appendTextFormatAppendText3)
                    .onChange(async (value) => {
                        try {
                            // Try formatting "now" with the specified format string
                            moment().format(value);
                            tempSettings.appendTextFormatAppendText3 = value;
                            this.taskMarker.updateSettings(tempSettings);
                            await this.plugin.saveSettings();
                        } catch (e) {
                            console.log(
                                `Error parsing specified date format: ${value}`
                            );
                        }
                    })
        );

        new Setting(this.containerEl)
            .setName("Append text to a task automatically")
            .setDesc(
                "Default false. If set true, automatically append text to tasks according to task status. See \"Usage.md\" for details."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.supportAppendingTextAutomatically)
                    .onChange(async (value) => {
                        tempSettings.supportAppendingTextAutomatically = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );
        
        // this.containerEl.createEl("h2", { text: "Moving completed tasks" });

        // new Setting(this.containerEl)
        //     .setName("Completed area header")
        //     .setDesc(
        //         `Completed (or canceled) tasks will be inserted under the specified header (most recent at the top). When scanning the document for completed/canceled tasks, the contents from this configured header to the next heading or separator (---) will be ignored. This heading will be created if the command is invoked and the heading does not exist. The default heading is '${DEFAULT_SETTINGS.completedAreaHeader}'.`
        //     )
        //     .addText((text) =>
        //         text
        //             .setPlaceholder("## Log")
        //             .setValue(tempSettings.completedAreaHeader)
        //             .onChange(async (value) => {
        //                 tempSettings.completedAreaHeader = value.trim();
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );

        // new Setting(this.containerEl)
        //     .setName("Remove the checkbox from moved tasks")
        //     .setDesc(
        //         `Remove the checkbox from completed (or canceled) tasks during the move to the completed area. This transforms tasks into normal list items. Task Marker will not be able to reset these items. They also will not appear in task searches or queries. The default value is: '${DEFAULT_SETTINGS.completedAreaRemoveCheckbox}'.`
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.completedAreaRemoveCheckbox)
        //             .onChange(async (value) => {
        //                 tempSettings.completedAreaRemoveCheckbox = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );

        this.containerEl.createEl("h2", {
            text: "Mark tasks using menu items",
        });

        this.containerEl.createEl("p", {
            text: "Task Marker creates commands that can be bound to hotkeys for creating, completing, marking and cycling tasks, as well as appending text in Editing view. The following settings add right click context menu items for those commands.",
        });

        // new Setting(this.containerEl)
        //     .setName(
        //         "Preview / Live preview: Show the selection menu when a checkbox is clicked"
        //     )
        //     .setDesc(
        //         "Display a panel that allows you to select (with mouse or keyboard) the value to assign when you click the task. The selected value will determine follow-on actions: complete, cancel, or reset."
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.previewOnClick)
        //             .onChange(async (value) => {
        //                 tempSettings.previewOnClick = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );

        new Setting(this.containerEl)
            .setName("Add menu item for creating a task")
            .setDesc(
                "The menu item will create the task, on the current line (or within the current selection), in a way as specified in the section **Create tasks**."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.rightClickCreate)
                    .onChange(async (value) => {
                        tempSettings.rightClickCreate = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );
        
        new Setting(this.containerEl)
            .setName("Add menu item for completing a task")
            .setDesc(
                "The menu item will complete the task, on the current line (or within the current selection), in a way as specified in the section **Complete tasks**."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.rightClickComplete)
                    .onChange(async (value) => {
                        tempSettings.rightClickComplete = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );
        
        new Setting(this.containerEl)
            .setName("Add menu item for marking a task")
            .setDesc(
                "The selected value will mark the task, on the current line (or within the current selection), in a way as specified in the section **Mark tasks**."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.rightClickMark)
                    .onChange(async (value) => {
                        tempSettings.rightClickMark = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(this.containerEl)
        .setName("Add menu item for cycling a task")
        .setDesc(
            "The menu item will cycle the status of the task, on the current line (or within the current selection), in a way as specified in the section **Cycle tasks**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickCycle)
                .onChange(async (value) => {
                    tempSettings.rightClickCycle = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        new Setting(this.containerEl)
        .setName("Add menu item for cycling a task reversely")
        .setDesc(
            "The menu item will cycle the status of the task reversely, on the current line (or within the current selection), in a way as specified in the section **Cycle tasks**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickCycleReversely)
                .onChange(async (value) => {
                    tempSettings.rightClickCycleReversely = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );
        
        new Setting(this.containerEl)
            .setName("Add menu item for resetting a task")
            .setDesc(
                "The menu item will reset the task on the current line (or within the current selection)."
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(tempSettings.rightClickResetTask)
                    .onChange(async (value) => {
                        tempSettings.rightClickResetTask = value;
                        this.taskMarker.updateSettings(tempSettings);
                        await this.plugin.saveSettings();
                    })
            );
        
        new Setting(this.containerEl)
        .setName("Add menu item for appending text to a line (text 1)")
        .setDesc(
            "The menu item will append text, on the current line (or within the current selection), in a way as specified in the section **Append text**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickAppend)
                .onChange(async (value) => {
                    tempSettings.rightClickAppend = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        new Setting(this.containerEl)
        .setName("Add menu item for appending text to a line (text 2)")
        .setDesc(
            "The menu item will append text, on the current line (or within the current selection), in a way as specified in the section **Append text**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickAppendText2)
                .onChange(async (value) => {
                    tempSettings.rightClickAppendText2 = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        new Setting(this.containerEl)
        .setName("Add menu item for appending text to a line (text 3)")
        .setDesc(
            "The menu item will append text, on the current line (or within the current selection), in a way as specified in the section **Append text**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickAppendText3)
                .onChange(async (value) => {
                    tempSettings.rightClickAppendText3 = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        new Setting(this.containerEl)
        .setName("Add menu item for appending text to a task automatically")
        .setDesc(
            "The menu item will append text, on the current line (or within the current selection), in a way as specified in the section **Append text**."
        )
        .addToggle((toggle) =>
            toggle
                .setValue(tempSettings.rightClickAppendTextAuto)
                .onChange(async (value) => {
                    tempSettings.rightClickAppendTextAuto = value;
                    this.taskMarker.updateSettings(tempSettings);
                    await this.plugin.saveSettings();
                })
        );

        // new Setting(this.containerEl)
        //     .setName("Add menu item for completing all tasks")
        //     .setDesc(
        //         "Add an item to the right-click menu in edit mode to mark all incomplete tasks in the current document complete."
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.rightClickToggleAll)
        //             .onChange(async (value) => {
        //                 tempSettings.rightClickToggleAll = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );

        // new Setting(this.containerEl)
        //     .setName("Add menu item for resetting all tasks")
        //     .setDesc(
        //         "Add an item to the right-click menu to reset all completed (or canceled) tasks."
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.rightClickResetAll)
        //             .onChange(async (value) => {
        //                 tempSettings.rightClickResetAll = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );

        // new Setting(this.containerEl)
        //     .setName("Add menu item for moving all completed tasks")
        //     .setDesc(
        //         "Add an item to the right-click menu to move all completed (or canceled) tasks."
        //     )
        //     .addToggle((toggle) =>
        //         toggle
        //             .setValue(tempSettings.rightClickMove)
        //             .onChange(async (value) => {
        //                 tempSettings.rightClickMove = value;
        //                 this.taskMarker.updateSettings(tempSettings);
        //                 await this.plugin.saveSettings();
        //             })
        //     );
    }
}
