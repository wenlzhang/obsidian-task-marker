import {
    addIcon,
    Editor,
    MarkdownView,
    Plugin,
    Command,
    Menu,
    EventRef,
    MarkdownPostProcessor,
    MarkdownPreviewRenderer,
} from "obsidian";
import { TaskMarker } from "./taskmarker-TaskMarker";
import { DEFAULT_SETTINGS } from "./taskmarker-Settings";
import { TaskMarkerSettingsTab } from "./taskmarker-SettingsTab";
import { promptForMark } from "./taskmarker-TaskMarkModal";
import { API } from "./@types/api";
import { TaskMarkerApi } from "./taskmarker-Api";

enum Icons {
    COMPLETE = "tm-complete-task",
    CANCEL = "tm-cancel-task",
    RESET = "tm-reset-task",
    MARK = "tm-mark-task",
    COMPLETE_ALL = "tm-complete-all-tasks",
    CLEAR = "tm-clear-all-tasks",
    MOVE = "tm-move-all-checked-tasks",
}

export class TaskMarkerPlugin extends Plugin {
    taskMarker: TaskMarker;

    /** External-facing plugin API. */
    public api: API;

    async onload(): Promise<void> {
        console.log("loading Task Marker (TM)");
        this.taskMarker = new TaskMarker(this.app);
        this.addSettingTab(
            new TaskMarkerSettingsTab(this.app, this, this.taskMarker)
        );
        await this.loadSettings();

        addIcon(
            Icons.COMPLETE,
            '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 14 14">  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>'
        );
        addIcon(
            Icons.CANCEL,
            '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 14 14">  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/></svg>'
        );
        addIcon(
            Icons.RESET,
            '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-square-fill" viewBox="0 0 14 14"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>'
        );
        addIcon(
            Icons.MARK,
            '<svg class="bi bi-square-fill" width="100px" height="100px" fill="currentColor" version="1.1" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path transform="scale(.16)" d="m12.5 0a12.5 12.5 0 00-12.5 12.5v75a12.5 12.5 0 0012.5 12.5h75a12.5 12.5 0 0012.5-12.5v-75a12.5 12.5 0 00-12.5-12.5h-75zm38.146 21.135 8.7324 19.098 20.684 3.6328-15.465 14.207 2.9355 20.793-18.289-10.316-18.869 9.2188 4.1602-20.584-14.598-15.098 20.861-2.4043 9.8477-18.547z" stroke-width="6.25"/></svg>'
        );
        addIcon(
            Icons.COMPLETE_ALL,
            '<svg class="bi bi-square-fill" fill="currentColor" version="1.1" width="100px" height="100px" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="m2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-12a2 2 0 00-2-2h-12zm1.5098 2.041h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5a1.5 1.5 0 011.5-1.5zm4.3945 1.2207h5.6895a.40645.5 0 01.40625.5v1a.40645.5 0 01-.40625.5h-5.6895a.40645.5 0 01-.40625-.5v-1a.40645.5 0 01.40625-.5zm-4.4023 6.2656h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5a1.5 1.5 0 011.5-1.5zm4.4023 1.2656h5.6895a.40645.5 0 01.40625.5v1a.40645.5 0 01-.40625.5h-5.6895a.40645.5 0 01-.40625-.5v-1a.40645.5 0 01.40625-.5z"/><g transform="translate(.49737 -.0026315)" fill="currentColor"><path d="m3.6171 13.149a.5.5 0 01-.708 0l-1-1a.50063.50063 0 01.708-.708l.646.647 1.646-1.647a.50063.50063 0 01.708.708z"/><path d="m3.6171 5.6181a.5.5 0 01-.708 0l-1-1a.50063.50063 0 11.708-.708l.646.647 1.646-1.647a.50063.50063 0 11.708.708z"/></g></svg>'
        );
        addIcon(
            Icons.CLEAR,
            '<svg class="bi bi-square-fill" fill="currentColor" version="1.1" width="100px" height="100px" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="m2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-12a2 2 0 00-2-2h-12zm1.5098 2.041h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5a1.5 1.5 0 011.5-1.5zm4.3945 1.2207h5.6895a.40645.5 0 01.40625.5v1a.40645.5 0 01-.40625.5h-5.6895a.40645.5 0 01-.40625-.5v-1a.40645.5 0 01.40625-.5zm-4.4023 6.2656h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5a1.5 1.5 0 011.5-1.5zm4.4023 1.2656h5.6895a.40645.5 0 01.40625.5v1a.40645.5 0 01-.40625.5h-5.6895a.40645.5 0 01-.40625-.5v-1a.40645.5 0 01.40625-.5z"/></svg>'
        );
        // addIcon(
        //     Icons.MOVE,
        //     '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 14 14">  <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/></svg>'
        // );

        this.addCommand({
            id: "task-marker-create",
            name: "Create task",
            icon: Icons.RESET,
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.markTaskOnLinesCreate(
                    " ",
                    this.getCurrentLinesFromEditor(editor)
                );
            },
        });

        this.addCommand({
            id: "task-marker-complete",
            name: "Complete task",
            icon: Icons.COMPLETE,
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.markTaskOnLines(
                    "x",
                    this.getCurrentLinesFromEditor(editor)
                );
            },
        });

        this.addCommand({
            id: "task-marker-cancel",
            name: "Cancel task",
            icon: Icons.CANCEL,
            editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
                const value = this.taskMarker.settings.supportCanceledTasks;
    
                if (value) {
                  if (!checking) {
                      this.markTaskOnLines(
                          "-",
                          this.getCurrentLinesFromEditor(editor)
                      );
                  }
                  return true
                }            
                return false;
              },
        });

        this.addCommand({
            id: "task-marker-mark",
            name: "Mark task",
            icon: Icons.MARK,
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                const mark = await promptForMark(this.app, this.taskMarker);
                if (mark) {
                    this.markTaskOnLines(
                        mark,
                        this.getCurrentLinesFromEditor(editor)
                    );
                }
            },
        });

        this.addCommand({
            id: "task-marker-reset",
            name: "Reset task",
            icon: Icons.RESET,
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.markTaskOnLines(
                    " ",
                    this.getCurrentLinesFromEditor(editor)
                );
            },
        });

        this.addCommand({
            id: "task-marker-complete-all",
            name: "Complete all tasks",
            icon: Icons.COMPLETE_ALL,
            callback: async () => {
                this.completeAllTasks();
            },
        });

        this.addCommand({
            id: "task-marker-reset-all",
            name: "Reset all completed tasks",
            icon: Icons.CLEAR,
            callback: async () => {
                this.resetAllTasks();
            },
        });

        // Set hotkeys for additional task statuses (row 1)
        const incompleteTaskValuesLength = this.taskMarker.settings.incompleteTaskValues.length

        if (incompleteTaskValuesLength >= 2) {
            for (let i = 1; i <= incompleteTaskValuesLength - 1; i++) {
                this.addCommand({
                    id: "task-marker-mark-task-status-row1-" + i.toString(),
                    name: "Mark task (row 1) as status " + i.toString() + " \"" + this.taskMarker.settings.incompleteTaskValues[i] + "\"",
                    icon: Icons.MARK,
                    editorCallback: (editor: Editor, view: MarkdownView) => {
                        this.markTaskOnLines(
                            this.taskMarker.settings.incompleteTaskValues[i],
                            this.getCurrentLinesFromEditor(editor)
                        );
                    },
                });
            }
        }

        // Set hotkeys for additional task statuses (row 2)
        const incompleteTaskValuesRow2Length = this.taskMarker.settings.incompleteTaskValuesRow2.length

        if (incompleteTaskValuesRow2Length >= 1) {
            for (let i = 0; i <= incompleteTaskValuesRow2Length - 1; i++) {
                this.addCommand({
                    id: "task-marker-mark-task-status-row2-" + (i + 1).toString(),
                    name: "Mark task (row 2) as status " + (i + 1).toString() + " \"" + this.taskMarker.settings.incompleteTaskValuesRow2[i] + "\"",
                    icon: Icons.MARK,
                    editorCallback: (editor: Editor, view: MarkdownView) => {
                        this.markTaskOnLines(
                            this.taskMarker.settings.incompleteTaskValuesRow2[i],
                            this.getCurrentLinesFromEditor(editor)
                        );
                    },
                });
            }
        }

        // Add hotkeys for cycling task statuses
        this.addCommand({
            id: "task-marker-cycle-task-status",
            name: "Cycle task status",
            icon: Icons.MARK,
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.markTaskOnLinesCycle(
                    'y', // This value does not matter.
                    this.getCurrentLinesFromEditor(editor)
                );
            },
        });

        // Add hotkeys for appending text
        this.addCommand({
            id: "task-marker-append-text",
            name: "Append text",
            // icon: Icons.RESET,
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.appendTextOnLines(
                    "y", // The mark value does not matter.
                    this.getCurrentLinesFromEditor(editor)
                );
            },
        });

        this.registerHandlers();
        this.api = new TaskMarkerApi(this.app, this.taskMarker);
    }

    getCurrentLinesFromEditor(editor: Editor): number[] {
        const lines: number[] = [];
        if (editor.somethingSelected()) {
            const cursorStart = editor.getCursor("from");
            const cursorEnd = editor.getCursor("to");
            for (let i = cursorStart.line; i <= cursorEnd.line; i++) {
                lines.push(i);
            }
        } else {
            const anchor = editor.getCursor("from");
            lines.push(anchor.line);
        }
        return lines;
    }

    buildMenu(menu: Menu, lines?: number[]): void {
        // if right-click create menu item is enabled
        if (this.taskMarker.settings.rightClickCreate) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Create task")
                    .setIcon(Icons.RESET)
                    .onClick(() => {
                        this.markTaskOnLinesCreate(" ", lines);
                    })
            );
        }

        // if right-click complete menu item is enabled
        if (this.taskMarker.settings.rightClickComplete) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Complete task")
                    .setIcon(Icons.COMPLETE)
                    .onClick(() => {
                        this.markTaskOnLines("x", lines);
                    })
            );

            // if cancelling tasks is supported, add the menu item for that.
            if (this.taskMarker.settings.supportCanceledTasks) {
                menu.addItem((item) =>
                    item
                        .setTitle("(TM) Cancel task")
                        .setIcon(Icons.CANCEL)
                        .onClick(() => {
                            this.markTaskOnLines("-", lines);
                        })
                );
            }
        }

        // if right-click mark menu item is enabled
        if (this.taskMarker.settings.rightClickMark) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Mark task")
                    .setIcon(Icons.MARK)
                    .onClick(async () => {
                        const mark = await promptForMark(
                            this.app,
                            this.taskMarker
                        );
                        if (mark) {
                            this.markTaskOnLines(mark, lines);
                        }
                    })
            );
        }

        // if right-click cycle menu item is enabled
        if (this.taskMarker.settings.rightClickCycle) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Cycle task status")
                    .setIcon(Icons.COMPLETE)
                    .onClick(() => {
                        this.markTaskOnLinesCycle("y", lines); // The mark value does not matter.
                    })
            );
        }

        // add an item for resetting selected tasks if enabled
        if (this.taskMarker.settings.rightClickResetTask) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Reset task")
                    .setIcon(Icons.RESET)
                    .onClick(() => {
                        this.markTaskOnLines(" ", lines);
                    })
            );
        }

        // if right-click append menu item is enabled
        if (this.taskMarker.settings.rightClickAppend) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Append text")
                    // .setIcon(Icons.RESET)
                    .onClick(() => {
                        this.appendTextOnLines("y", lines); // The mark value does not matter.
                    })
            );
        }

        // If right-click move completed tasks is enabled:
        // if (this.taskMarker.settings.rightClickMove) {
        //     menu.addItem((item) =>
        //         item
        //             .setTitle("(TM) Move completed tasks")
        //             .setIcon(Icons.MOVE)
        //             .onClick(async () => {
        //                 this.moveAllTasks();
        //             })
        //     );
        // }

        // If right-click toggle-all menu item is enabled:
        if (this.taskMarker.settings.rightClickToggleAll) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Complete all tasks")
                    .setIcon(Icons.COMPLETE_ALL)
                    .onClick(async () => {
                        this.completeAllTasks();
                    })
            );
        }

        // add an item for resetting selected tasks if enabled
        if (this.taskMarker.settings.rightClickResetAll) {
            menu.addItem((item) =>
                item
                    .setTitle("(TM) Reset all tasks")
                    .setIcon(Icons.CLEAR)
                    .onClick(async () => {
                        this.resetAllTasks();
                    })
            );
        }
    }

    async markTaskOnLines(mark: string, lines?: number[]): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.markTaskInSource(source, mark, lines);
        this.app.vault.modify(activeFile, result);
    }

    async markTaskOnLinesCycle(mark: string, lines?: number[]): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.markTaskInSourceCycle(source, mark, lines);
        this.app.vault.modify(activeFile, result);
    }

    async markTaskOnLinesCreate(mark: string, lines?: number[]): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.markTaskInSourceCreate(source, mark, lines);
        this.app.vault.modify(activeFile, result);
    }

    async appendTextOnLines(mark: string, lines?: number[]): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.appendTextInSource(source, mark, lines);
        this.app.vault.modify(activeFile, result);
    }

    // async moveAllTasks(): Promise<void> {
    //     const activeFile = this.app.workspace.getActiveFile();
    //     const source = await this.app.vault.read(activeFile);
    //     const result = this.taskMarker.moveCompletedTasksInFile(source);
    //     this.app.vault.modify(activeFile, result);
    // }

    async completeAllTasks(): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.markAllTasksComplete(source, "x");
        this.app.vault.modify(activeFile, result);
    }

    async resetAllTasks(): Promise<void> {
        const activeFile = this.app.workspace.getActiveFile();
        const source = await this.app.vault.read(activeFile);
        const result = this.taskMarker.resetAllTasks(source);
        this.app.vault.modify(activeFile, result);
    }

    handlersRegistered = false;
    eventRef: EventRef;
    postProcessor: MarkdownPostProcessor;
    registerHandlers(): void {
        if (
            this.taskMarker.initSettings.registerHandlers &&
            !this.handlersRegistered
        ) {
            this.handlersRegistered = true;

            // Source / Edit mode
            if (this.taskMarker.initSettings.rightClickTaskMenu) {
                this.registerEvent(
                    (this.eventRef = this.app.workspace.on(
                        "editor-menu",
                        (menu, editor) => {
                            //get line selections here
                            this.buildMenu(
                                menu,
                                this.getCurrentLinesFromEditor(editor)
                            );
                        }
                    ))
                );
            }

            // Preview / Live Preview
            this.registerMarkdownPostProcessor(
                (this.postProcessor = (el, ctx) => {
                    const checkboxes = el.querySelectorAll<HTMLInputElement>(
                        ".task-list-item-checkbox"
                    );
                    if (!checkboxes.length) return;

                    const section = ctx.getSectionInfo(el);
                    if (!section) return;

                    const { lineStart } = section;

                    for (const checkbox of Array.from(checkboxes)) {
                        const line = Number(checkbox.dataset.line);

                        if (
                            this.taskMarker.initSettings.rightClickTaskMenu
                        ) {
                            this.registerDomEvent(
                                checkbox.parentElement,
                                "contextmenu",
                                (ev) => {
                                    ev.preventDefault();
                                    const view =
                                        this.app.workspace.getActiveViewOfType(
                                            MarkdownView
                                        );
                                    if (view && view.editor) {
                                        const menu = new Menu(this.app);
                                        this.buildMenu(menu, [
                                            lineStart + line,
                                        ]);
                                        menu.showAtMouseEvent(ev);
                                    }
                                }
                            );
                        }

                        if (this.taskMarker.settings.previewOnClick) {
                            this.registerDomEvent(
                                checkbox,
                                "click",
                                async (ev) => {
                                    ev.stopImmediatePropagation();
                                    ev.preventDefault();
                                    const mark = await promptForMark(
                                        this.app,
                                        this.taskMarker
                                    );
                                    if (mark) {
                                        this.markTaskOnLines(mark, [
                                            lineStart + line,
                                        ]);
                                    }
                                }
                            );
                        }
                    }
                })
            );
        }
    }

    unregisterHandlers(): void {
        this.handlersRegistered = false;

        if (this.eventRef) {
            this.app.workspace.offref(this.eventRef);
            this.eventRef = null;
        }

        if (this.postProcessor) {
            MarkdownPreviewRenderer.unregisterPostProcessor(this.postProcessor);
            this.postProcessor = null;
        }
    }

    onunload(): void {
        console.log("unloading Task Marker (TM)");
    }

    async loadSettings(): Promise<void> {
        const settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        );
        // remove old attribute
        if (settings.rightClickReset) {
            delete settings.rightClickReset;
            await this.saveData(settings);
        }
        this.taskMarker.updateSettings(settings);
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.taskMarker.settings);
        if (
            this.taskMarker.initSettings.rightClickTaskMenu &&
            !this.handlersRegistered
        ) {
            this.registerHandlers();
        }
        if (
            !this.taskMarker.initSettings.rightClickTaskMenu &&
            this.handlersRegistered
        ) {
            this.unregisterHandlers();
        }
    }
}
