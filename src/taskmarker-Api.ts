import { App } from "obsidian";
import { API } from "./@types/api";
import { TaskMarker } from "./taskmarker-TaskMarker";
import { promptForMark } from "./taskmarker-TaskMarkModal";

export class TaskMarkerApi implements API {
    app: App;
    taskMarker: TaskMarker;

    constructor(app: App, taskMarker: TaskMarker) {
        this.app = app;
        this.taskMarker = taskMarker;
    }

    getCompletedTaskValues(): string {
        return this.taskMarker.initSettings.completedTasks;
    }

    getIncompleteTaskValues(): string {
        return this.taskMarker.settings.incompleteTaskValues;
    }

    getMark(): Promise<string> {
        return promptForMark(this.app, this.taskMarker);
    }

    isComplete(value: string): boolean {
        // This may include cancelled tasks (those are still "complete")
        return this.getCompletedTaskValues().contains(value);
    }
    isCanceled(value: string): boolean {
        return value === "-";
    }
}
