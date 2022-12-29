import { App, Modal } from "obsidian";
import { TaskMarker } from "./taskmarker-TaskMarker";

export function promptForMark(
    app: App,
    taskMarker: TaskMarker
): Promise<string> {
    return new Promise((resolve) => {
        const modal = new TaskMarkModal(app, taskMarker);

        modal.onClose = () => {
            resolve(modal.chosenMark);
        };

        modal.open();
    });
}

export class TaskMarkModal extends Modal {
    taskMarker: TaskMarker;
    chosenMark: string;
    constructor(app: App, taskMarker: TaskMarker) {
        super(app);
        this.taskMarker = taskMarker;
        this.containerEl.id = "taskmarker-modal";
    }

    onOpen(): void {
        const selector = this.contentEl.createDiv(
            "taskmarker-selector markdown-preview-view"
        );

        const completedList = selector.createEl("ul");
        completedList.addClass("contains-task-list");
        this.addTaskValues(
            completedList,
            this.taskMarker.initSettings.completedTasks,
            true
        );

        const list = selector.createEl("ul");
        list.addClass("contains-task-list");
        this.addTaskValues(
            list,
            this.taskMarker.settings.incompleteTaskValues,
            false
        );

        const listRow2 = selector.createEl("ul");
        listRow2.addClass("contains-task-list");
        this.addTaskValues(
            listRow2,
            this.taskMarker.settings.incompleteTaskValuesRow2,
            false
        );

        const footer = selector.createEl("nav");
        const esc = footer.createSpan();
        esc.innerHTML = "<b>esc</b> to dismiss";
        const bksp = footer.createSpan();
        bksp.innerHTML = "<b>bksp</b> to remove <code>[]</code>";

        const self = this;

        const keyListener = function (event: KeyboardEvent) {
            self.chosenMark = event.key;
            event.preventDefault();
            event.stopImmediatePropagation();
            self.close();
        };
        this.scope.register([], null, keyListener);
        this.scope.register(["Shift"], null, keyListener);
    }

    addTaskValues(
        list: HTMLUListElement,
        choices: string,
        markComplete: boolean
    ): void {
        const self = this;
        for (const character of choices) {
            const li = list.createEl("li", {
                cls:
                    "task-list-item " + (character == " " ? "" : " is-checked"),
                attr: {
                    "data-task": character,
                },
            });
            li.addEventListener("click", function (event) {
                self.chosenMark = character;
                self.close();
            });

            const input = li.createEl("input", {
                cls: "task-list-item-checkbox",
                attr: {
                    id: "task-list-item-checkbox-" + character,
                    type: "checkbox",
                    style: "pointer-events: none;",
                },
            });
            if (character != " ") {
                input.setAttribute("checked", "");
            }
            li.createEl("span", {
                text: character == " " ? "␣" : character,
                attr: {
                    style: "pointer-events: none;",
                },
            });
        }
    }

    onClose(): void {
        this.contentEl.empty();
    }
}
