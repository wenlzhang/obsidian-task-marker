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
        
        this.containerEl.createEl("p", {
            text: "**Restart Obsidian if the following setting changes do not take effect.**",
        });

        this.containerEl.createEl("h2", { text: "Completing tasks" });

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
                    .setPlaceholder("YYYY-MM-DD")
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
        
        this.containerEl.createEl("h2", { text: "Marking tasks" });

        this.containerEl.createEl("p", {
            text: "Marked tasks gain treatment based on the settings below. **Note that if a mark contains both in row 1 and row 2, then the mark would work as specified in row 1.**",
        });

        new Setting(this.containerEl)
            .setName("Additional task statuses (row 1)")
            .setDesc(
                "Specify the set of single characters that indicate in-progress or incomplete tasks, e.g. 'i>!?D'. **The first five (excluding the first open status) of them can be assigned with hotkeys.**"
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
                    .setPlaceholder("YYYY-MM-DD")
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
            "Specify the set of single characters that indicate task status, e.g. 'Rip'. **The first five of them can be assigned with hotkeys.**"
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
        
        this.containerEl.createEl("h2", { text: "Cycling tasks" });

        this.containerEl.createEl("p", {
            text: "Cycled tasks gain treatment based on the settings below.",
        });

        new Setting(this.containerEl)
        .setName("Cycled task statuses")
        .setDesc(
            "Specify the set of single characters that indicate any task statuses, e.g. 'x- Rip>'. Hotkeys can be used to cycle among these statuses."
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
        
        // this.containerEl.createEl("h2", { text: "Moving completed tasks" });

        // new Setting(this.containerEl)
        //     .setName("Completed area header")
        //     .setDesc(
        //         `Completed (or canceled) items will be inserted under the specified header (most recent at the top). When scanning the document for completed/canceled tasks, the contents from this configured header to the next heading or separator (---) will be ignored. This heading will be created if the command is invoked and the heading does not exist. The default heading is '${DEFAULT_SETTINGS.completedAreaHeader}'.`
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
        //     .setName("Remove the checkbox from moved items")
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
            text: "Marking items using menus",
        });

        this.containerEl.createEl("p", {
            text: "Task Marker creates commands that can be bound to hotkeys for completing, marking and resetting tasks in Editing view. The following settings add right click context menu items for those commands.",
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
            .setName("Add menu item for completing a task")
            .setDesc(
                "The menu item will complete the task, on the current line (or within the current selection), in a way as specified in the section **Completing tasks**."
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
                "The selected value will mark the task, on the current line (or within the current selection), in a way as specified in the section **Marking tasks**."
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
        .setName("Add menu item for cycling a a task")
        .setDesc(
            "The menu item will cycle the statuses of the task, on the current line (or within the current selection), in a way as specified in the section **Cycling tasks**."
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

        // new Setting(this.containerEl)
        //     .setName("Add menu items for completing all tasks")
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