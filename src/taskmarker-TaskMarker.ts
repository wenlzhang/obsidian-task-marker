import { App, moment, Notice, Editor } from "obsidian";
import {
    TaskMarkerSettings,
    CompiledTasksSettings,
} from "./taskmarker-Settings";

export class TaskMarker {
    settings: TaskMarkerSettings;
    initSettings: CompiledTasksSettings;
    anyListItem: RegExp;
    taskMark: RegExp;
    anyTaskMark: RegExp;
    blockQuote: RegExp;
    blockRef: RegExp;
    continuation: RegExp;
    stripTask: RegExp;

    constructor(private app: App) {
        this.app = app;
        this.anyListItem = new RegExp(/^([\s>]*[-+*] )([^\\[].*)$/);
        this.anyTaskMark = new RegExp(/^([\s>]*[-+*] \[)(.)(\] .*)$/);
        this.blockQuote = new RegExp(/^(\s*>[\s>]*)(.*)$/);
        this.blockRef = new RegExp(/^(.*?)( \^[A-Za-z0-9-]+)?$/);
        this.continuation = new RegExp(/^( {2,}|\t)/);
        this.stripTask = new RegExp(/^([\s>]*[-+*]) \[.\] (.*)$/);
    }

    updateSettings(settings: TaskMarkerSettings): void {
        this.settings = settings;
        let momentMatchString = null;

        if (settings.appendDateFormat) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendDateFormat;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatMark) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatMark;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatMarkRow2) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatMarkRow2;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatCreation) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatCreation;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatAppend) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatAppend;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatAppendText2) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatAppendText2;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        if (settings.appendTextFormatAppendText3) {
            // YYYY-MM-DD or DD MM, YYYY or .. [(]YYYY-MM-DD[)] where the stuff in the brackets is literal
            const literals = [];

            const regex1 = RegExp("(\\[.*?\\]\\]?)", "g");
            let match;
            let i = 0;

            momentMatchString = settings.appendTextFormatAppendText3;
            while ((match = regex1.exec(momentMatchString)) !== null) {
                momentMatchString = momentMatchString.replace(
                    match[0],
                    `%$${i}$%`
                );
                literals.push(
                    match[0]
                        .substring(1, match[0].length - 1)
                        .replace(/\(/g, "\\(") // escape a naked (
                        .replace(/\)/g, "\\)") // escape a naked )
                        .replace(/\[/g, "\\[") // escape a naked [
                        .replace(/\]/g, "\\]")
                ); // escape a naked ]
                i++;
            }

            // Now let's replace moment date formatting
            momentMatchString = momentMatchString
                .replace("YYYY", "\\d{4}") // 4-digit year
                .replace("YY", "\\d{2}") // 2-digit year
                .replace("DD", "\\d{2}") // day of month, padded
                .replace("D", "\\d{1,2}") // day of month, not padded
                .replace("MMM", "[A-Za-z]{3}") // month, abbrv
                .replace("MM", "\\d{2}") // month, padded
                .replace("M", "\\d{1,2}") // month, not padded
                .replace("HH", "\\d{2}") // 24-hour, padded
                .replace("H", "\\d{1,2}") // 24-hour, not padded
                .replace("hh", "\\d{2}") // 12-hour, padded
                .replace("h", "\\d{1,2}") // 12-hour, not padded
                .replace("mm", "\\d{2}") // minute, padded
                .replace("m", "\\d{1,2}"); // minute, not padded

            if (literals.length > 0) {
                for (let i = 0; i < literals.length; i++) {
                    momentMatchString = momentMatchString.replace(
                        `%$${i}$%`,
                        literals[i]
                    );
                }
            }
            momentMatchString = `\\s*${momentMatchString}\\s*`;
        }

        const completedTasks =
            (this.settings.onlyLowercaseX ? "x" : "xX") +
            (this.settings.supportCanceledTasks ? "-" : "");

        if (this.settings.incompleteTaskValues.indexOf(" ") < 0) { // No need to handle Row2
            this.settings.incompleteTaskValues =
                " " + this.settings.incompleteTaskValues; // Not working if removing space
        }

        const rightClickTaskMenu =
            this.settings.rightClickComplete ||
            this.settings.rightClickMark ||
            this.settings.rightClickCycle ||
            this.settings.rightClickCycleReversely ||
            this.settings.rightClickCreate ||
            this.settings.rightClickAppend ||
            this.settings.rightClickAppendText2 ||
            this.settings.rightClickAppendText3 ||
            this.settings.rightClickAppendTextAuto ||
            // this.settings.rightClickMove ||
            this.settings.rightClickResetTask ||
            this.settings.rightClickResetAll ||
            this.settings.rightClickToggleAll;

        this.initSettings = {
            removeRegExp: this.tryCreateRemoveRegex(
                this.settings.removeExpression
            ),
            resetRegExp: this.tryCreateResetRegex(momentMatchString),
            incompleteTaskRegExp: this.tryCreateIncompleteRegex(
                this.settings.incompleteTaskValues
            ),
            incompleteTaskRegExpRow2: this.tryCreateIncompleteRegex(
                this.settings.incompleteTaskValuesRow2
            ),
            rightClickTaskMenu: rightClickTaskMenu,
            registerHandlers:
                rightClickTaskMenu || this.settings.previewOnClick,
            completedTasks: completedTasks,
            completedTaskRegExp: this.tryCreateCompleteRegex(completedTasks),
        };
        console.debug(
            "Task Marker: updated configuration %o, %o",
            this.settings,
            this.initSettings
        );
    }

    tryCreateRemoveRegex(param: string): RegExp {
        return param ? new RegExp(param, "g") : null;
    }

    private tryCreateResetRegex(param: string): RegExp {
        return param ? new RegExp(param + "( \\^[A-Za-z0-9-]+)?$") : null;
    }

    private tryCreateCompleteRegex(param: string): RegExp {
        return new RegExp(`^([\\s>]*- \\[)[${param}](\\] .*)$`);
    }

    private tryCreateIncompleteRegex(param: string): RegExp {
        return new RegExp(`^([\\s>]*- \\[)[${param}](\\] .*)$`);
    }

    private removeCheckboxFromLine(lineText: string): string {
        return lineText.replace(this.stripTask, "$1 $2");
    }

    /** _Complete_ a task: append completion text, remove configured strings */
    private completeTaskLine(lineText: string, mark = "x"): string {
        console.debug("Task Marker: complete task with %s: %s", mark, lineText);
        let marked = lineText.replace(this.anyTaskMark, `$1${mark}$3`);
        if (this.initSettings.removeRegExp) {
            marked = marked.replace(this.initSettings.removeRegExp, "");
        }
        if (this.settings.appendDateFormat) {
            const strictLineEnding = lineText.endsWith("  ");
            let blockid = "";
            const match = this.blockRef.exec(marked);
            if (match && match[2]) {
                marked = match[1];
                blockid = match[2];
            }
            if (!marked.endsWith(" ")) {
                marked += " ";
            }
            marked += moment().format(this.settings.appendDateFormat) + blockid;
            if (strictLineEnding) {
                marked += "  ";
            }
        }
        return marked;
    }

    markAllTasksComplete(source: string, mark: string): string {
        const lines = source.split("\n");
        const result: string[] = [];

        for (const line of lines) {
            if (this.initSettings.incompleteTaskRegExp.exec(line)) {
                result.push(this.completeTaskLine(line, mark));
            } else if (this.initSettings.incompleteTaskRegExpRow2.exec(line)) {
                result.push(this.completeTaskLine(line, mark));
            } else {
                result.push(line);
            }
        }
        return result.join("\n");
    }

    markTaskInSource(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.markTaskLine(split[n], mark);
        }
        return split.join("\n");
    }

    markTaskInSourceCycle(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.markTaskLineCycle(split[n], mark);
        }
        return split.join("\n");
    }

    markTaskInSourceCycleReversely(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.markTaskLineCycleReversely(split[n], mark);
        }
        return split.join("\n");
    }

    markTaskInSourceCreate(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.markTaskLineCreate(split[n], mark);
        }
        return split.join("\n");
    }

    appendTextInSource(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.appendTextLine(split[n], mark);
        }
        return split.join("\n");
    }

    appendTextInSourceText2(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.appendTextLineText2(split[n], mark);
        }
        return split.join("\n");
    }

    appendTextInSourceText3(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.appendTextLineText3(split[n], mark);
        }
        return split.join("\n");
    }

    appendTextInSourceAuto(
        source: string,
        mark: string,
        lines: number[] = []
    ): string {
        const split = source.split("\n");
        for (const n of lines) {
            split[n] = this.appendTextLineAuto(split[n], mark);
        }
        return split.join("\n");
    }

    markTaskLine(lineText: string, mark: string): string {
        const taskMatch = this.anyTaskMark.exec(lineText);
        const markString = "- [" + mark + "] ";

        if (mark === "Backspace") {
            lineText = this.removeCheckboxFromLine(lineText);
        } else if (taskMatch) {
            const completeMark =
                this.initSettings.completedTasks.indexOf(mark) >= 0;

            if (mark !== " ") { // Mark tasks
                if (lineText.trim().startsWith(markString)) {
                    new Notice(`Task Marker: task already marked with the same status "${mark}"!`);
                } else { // Mark tasks
                    let marked = lineText.replace(this.anyTaskMark, `$1${mark}$3`);
                    if (this.initSettings.removeRegExp) {
                        marked = marked.replace(this.initSettings.removeRegExp, "");
                    }
                    if (this.settings.appendDateFormat && completeMark) {
                        const strictLineEnding = lineText.endsWith("  ");
                        let blockid = "";
                        const match = this.blockRef.exec(marked);
                        if (match && match[2]) {
                            marked = match[1];
                            blockid = match[2];
                        }
                        if (!marked.endsWith(" ")) {
                            marked += " ";
                        }
                        marked += moment().format(this.settings.appendDateFormat) + blockid;
                        if (strictLineEnding) {
                            marked += "  ";
                        }
                    } else if (this.settings.appendTextFormatMark && this.settings.incompleteTaskValues.indexOf(mark) >= 0) {
                        const strictLineEnding = lineText.endsWith("  ");
                        let blockid = "";
                        const match = this.blockRef.exec(marked);
                        if (match && match[2]) {
                            marked = match[1];
                            blockid = match[2];
                        }
                        if (!marked.endsWith(" ")) {
                            marked += " ";
                        }
                        marked += moment().format(this.settings.appendTextFormatMark) + blockid;
                        if (strictLineEnding) {
                            marked += "  ";
                        }
                    } else if (this.settings.appendTextFormatMarkRow2 && this.settings.incompleteTaskValuesRow2.indexOf(mark) >= 0) {
                        const strictLineEnding = lineText.endsWith("  ");
                        let blockid = "";
                        const match = this.blockRef.exec(marked);
                        if (match && match[2]) {
                            marked = match[1];
                            blockid = match[2];
                        }
                        if (!marked.endsWith(" ")) {
                            marked += " ";
                        }
                        marked += moment().format(this.settings.appendTextFormatMarkRow2) + blockid;
                        if (strictLineEnding) {
                            marked += "  ";
                        }
                    }
                    lineText = marked;
                }
            } else if (mark === " ") { // Reset tasks
                lineText = this.resetTaskLine(lineText, mark); // Original code
            } else {
                new Notice(`Task Marker: unknown mark ${mark}!`);
                console.log(
                    "Task Marker: unknown mark (%s), leaving unchanged: %s",
                    mark,
                    lineText
                );
            }
        } else if (mark !== "Backspace") {
            const listMatch = this.anyListItem.exec(lineText);

            if ((listMatch && listMatch[2]) || lineText.trim().startsWith("- [")) {
                console.debug("Task Marker: list item, convert to a task %s", lineText);

                // convert to a task, and then mark
                if ((listMatch && listMatch[2])) {
                    var marked = `${listMatch[1]}[ ] ${listMatch[2]}`;
                } else if (lineText.trim().startsWith("- [")) {
                    let listIndex = lineText.indexOf("- [");
                    var marked = lineText.slice(0, listIndex+1) + ' [ ] ' + lineText.slice(listIndex+2);
                }

                lineText = this.markTaskLine(
                    marked,
                    mark
                );
            } else {
                new Notice(`Task Marker: not a task or list item!`);
                console.debug("Task Marker: not a task or list item %s", lineText);
            }
        }        
        return lineText;
    }

    markTaskLineCycle(lineText: string, mark: string): string {

        const taskMatch = this.anyTaskMark.exec(lineText);
        const markValue = this.settings.cycleTaskValues;
        const markValueLength = markValue.length;

        // Regroup mark as string array
        let markStringArray = new Array<string>(markValueLength);
        for (let i = 0; i < markValueLength; i++) {
            markStringArray[i] = "- [" + markValue[i] + "] ";
        }

        // Find the next index
        let markIndex = 0;
        for (let i = 0; i < markValueLength; i++) {
            if (lineText.trim().startsWith(markStringArray[i])) {
                if (i + 2 <= markValueLength) {
                    markIndex = i + 1;
                } else {
                    markIndex = 0;
                }
            }
        }
        
        // Cycle task statuses
        if (taskMatch) {
            let marked = lineText.replace(this.anyTaskMark, `$1${markValue[markIndex]}$3`);

            const strictLineEnding = lineText.endsWith("  ");
            let blockid = "";
            const match = this.blockRef.exec(marked);
            if (match && match[2]) {
                marked = match[1];
                blockid = match[2];
            }
            marked += blockid;
            if (strictLineEnding) {
                marked += "  ";
            }

            lineText = marked;
        } else {
            const listMatch = this.anyListItem.exec(lineText);

            if ((listMatch && listMatch[2]) || lineText.trim().startsWith("- [")) {
                console.debug("Task Marker: list item, convert to a task %s", lineText);

                // convert to a task, and then mark
                if ((listMatch && listMatch[2])) {
                    var marked = `${listMatch[1]}[ ] ${listMatch[2]}`;
                } else if (lineText.trim().startsWith("- [")) {
                    let listIndex = lineText.indexOf("- [");
                    var marked = lineText.slice(0, listIndex+1) + ' [ ] ' + lineText.slice(listIndex+2);
                }

                const strictLineEnding = lineText.endsWith("  ");
                let blockid = "";
                const match = this.blockRef.exec(marked);
                if (match && match[2]) {
                    marked = match[1];
                    blockid = match[2];
                }
                marked += blockid;
                if (strictLineEnding) {
                    marked += "  ";
                }
                
                lineText = marked;
            } else {
                new Notice(`Task Marker: not a task or list item!`);
                console.debug("Task Marker: not a task or list item %s", lineText);
            }
        }

        return lineText;
    }

    markTaskLineCycleReversely(lineText: string, mark: string): string {

        const taskMatch = this.anyTaskMark.exec(lineText);
        var markValue = this.settings.cycleTaskValues;
        const markValueLength = markValue.length;

        let reverseString = "";
        for (let char of markValue) {
            reverseString = char + reverseString;
        }
        markValue = reverseString;

        // Regroup mark as string array
        let markStringArray = new Array<string>(markValueLength);
        for (let i = 0; i < markValueLength; i++) {
            markStringArray[i] = "- [" + markValue[i] + "] ";
        }

        // Find the next index
        let markIndex = 0;
        for (let i = 0; i < markValueLength; i++) {
            if (lineText.trim().startsWith(markStringArray[i])) {
                if (i + 2 <= markValueLength) {
                    markIndex = i + 1;
                } else {
                    markIndex = 0;
                }
            }
        }
        
        // Cycle task statuses
        if (taskMatch) {
            let marked = lineText.replace(this.anyTaskMark, `$1${markValue[markIndex]}$3`);

            const strictLineEnding = lineText.endsWith("  ");
            let blockid = "";
            const match = this.blockRef.exec(marked);
            if (match && match[2]) {
                marked = match[1];
                blockid = match[2];
            }
            marked += blockid;
            if (strictLineEnding) {
                marked += "  ";
            }

            lineText = marked;
        } else {
            const listMatch = this.anyListItem.exec(lineText);

            if ((listMatch && listMatch[2]) || lineText.trim().startsWith("- [")) {
                console.debug("Task Marker: list item, convert to a task %s", lineText);

                // convert to a task, and then mark
                if ((listMatch && listMatch[2])) {
                    var marked = `${listMatch[1]}[${markValue[markIndex]}] ${listMatch[2]}`;
                } else if (lineText.trim().startsWith("- [")) {
                    let listIndex = lineText.indexOf("- [");
                    var marked = lineText.slice(0, listIndex+1) + ` [${markValue[markIndex]}] ` + lineText.slice(listIndex+2);
                }

                const strictLineEnding = lineText.endsWith("  ");
                let blockid = "";
                const match = this.blockRef.exec(marked);
                if (match && match[2]) {
                    marked = match[1];
                    blockid = match[2];
                }
                marked += blockid;
                if (strictLineEnding) {
                    marked += "  ";
                }
                
                lineText = marked;
            } else {
                new Notice(`Task Marker: not a task or list item!`);
                console.debug("Task Marker: not a task or list item %s", lineText);
            }
        }

        return lineText;
    }

    markTaskLineCreate(lineText: string, mark: string): string {
        const taskMatch = this.anyTaskMark.exec(lineText);

        if (taskMatch) {
            if (!lineText.trim().startsWith("- [ ] ")) {
                new Notice(`Task Marker: task already marked!`);
                console.log("Task Marker: task already marked, leaving unchanged: %s", lineText);
            // } else if (lineText.trim().startsWith("- [ ] ")) {
            //     new Notice(`Task Marker: task already created!`);
            //     console.log("Task Marker: task already created, leaving unchanged: %s", lineText);
            } else { // Create task and append text
                let marked = lineText.replace(this.anyTaskMark, `$1${mark}$3`);
                if (this.settings.appendTextFormatCreation) {
                    const strictLineEnding = lineText.endsWith("  ");
                    let blockid = "";
                    const match = this.blockRef.exec(marked);
                    if (match && match[2]) {
                        marked = match[1];
                        blockid = match[2];
                    }
                    if (!marked.endsWith(" ")) {
                        marked += " ";
                    }
                    marked += moment().format(this.settings.appendTextFormatCreation) + blockid;
                    if (strictLineEnding) {
                        marked += "  ";
                    }
                } else {
                    console.log("Task Marker: appending string empty, nothing appended: %s", lineText);
                }
                lineText = marked;
            }
        } else {
            const listMatch = this.anyListItem.exec(lineText);

            if ((listMatch && listMatch[2]) || lineText.trim().startsWith("- [")) {
                console.debug("Task Marker: list item, convert to a task %s", lineText);

                // convert to a task, and then mark
                if ((listMatch && listMatch[2])) {
                    var marked = `${listMatch[1]}[ ] ${listMatch[2]}`;
                } else if (lineText.trim().startsWith("- [")) {
                    let listIndex = lineText.indexOf("- [");
                    var marked = lineText.slice(0, listIndex+1) + ' [ ] ' + lineText.slice(listIndex+2);
                }

                if (this.settings.appendTextFormatCreation) {
                    const strictLineEnding = lineText.endsWith("  ");
                    let blockid = "";
                    const match = this.blockRef.exec(marked);
                    if (match && match[2]) {
                        marked = match[1];
                        blockid = match[2];
                    }
                    if (!marked.endsWith(" ")) {
                        marked += " ";
                    }
                    marked += moment().format(this.settings.appendTextFormatCreation) + blockid;
                    if (strictLineEnding) {
                        marked += "  ";
                    }
                } else {
                    console.log("Task Marker: appending string empty, nothing appended: %s", lineText);
                }
                lineText = marked;
            } else {
                new Notice(`Task Marker: not a task or list item!`);
                console.debug("Task Marker: not a task or list item %s", lineText);
            }
        }
        return lineText;
    }

    appendTextLineFunction(lineText: string, appendTextFormat: string): string {
        let marked = lineText;

        const strictLineEnding = lineText.endsWith("  ");
        let blockid = "";
        const match = this.blockRef.exec(marked);
        if (match && match[2]) {
            marked = match[1];
            blockid = match[2];
        }
        if (!marked.endsWith(" ")) {
            marked += " ";
        }
        marked += moment().format(appendTextFormat) + blockid;
        if (strictLineEnding) {
            marked += "  ";
        }
        return marked;
    }

    appendTextLine(lineText: string, mark: string): string {
        let marked = lineText;

        if (this.settings.appendTextFormatAppend) {
            marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatAppend);
        } else {
            new Notice(`Task Marker: appending string empty!`);
            console.log("Task Marker: appending string empty, nothing appended: %s", lineText);
        }
        lineText = marked;
        return lineText;
    }

    appendTextLineText2(lineText: string, mark: string): string {
        let marked = lineText;

        if (this.settings.appendTextFormatAppendText2) {
            marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatAppendText2);
        } else {
            new Notice(`Task Marker: appending string empty!`);
            console.log("Task Marker: appending string empty, nothing appended: %s", lineText);
        }
        lineText = marked;
        return lineText;
    }

    appendTextLineText3(lineText: string, mark: string): string {
        let marked = lineText;

        if (this.settings.appendTextFormatAppendText3) {
            marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatAppendText3);
        } else {
            new Notice(`Task Marker: appending string empty!`);
            console.log("Task Marker: appending string empty, nothing appended: %s", lineText);
        }
        lineText = marked;
        return lineText;
    }

    appendTextLineAuto(lineText: string, mark: string): string {
        let marked = lineText;
        const taskMatch = this.anyTaskMark.exec(lineText);

        if (taskMatch) {
            // Determine task mark
            const taskMark = lineText.trim()[3];

            const createMark = taskMark === " ";            
            const completeMark = this.initSettings.completedTasks.indexOf(taskMark) >= 0;
            const markRow1Mark = this.settings.incompleteTaskValues.indexOf(taskMark) >= 0;
            const markRow2Mark = this.settings.incompleteTaskValuesRow2.indexOf(taskMark) >= 0;

            const defaultTaskTextRows12 = this.settings.appendTextAutoTaskDefault === "text-rows-1-2";
            const defaultTaskTextRowString = this.settings.appendTextAutoTaskDefault === "text-row-string";
            const defaultTaskTextRow1 = this.settings.appendTextAutoTaskDefault === "text-row-1";
            const defaultTaskTextRow2 = this.settings.appendTextAutoTaskDefault === "text-row-2";
            const defaultTaskNone = this.settings.appendTextAutoTaskDefault === "none";

            if (createMark && this.settings.appendTextFormatCreation) {
                marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatCreation);
            } else if (completeMark && this.settings.appendDateFormat) {
                marked = this.appendTextLineFunction(lineText, this.settings.appendDateFormat);
            } else if (markRow1Mark || markRow2Mark) {
                if (defaultTaskTextRows12) {
                    if (markRow1Mark && this.settings.appendTextFormatMark) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMark);
                    } else if (markRow2Mark && this.settings.appendTextFormatMarkRow2) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMarkRow2);
                    } else {
                        new Notice(`Task Marker: empty appending string!`);
                        console.debug("Task Marker: empty appending string!");
                    }
                } else if (defaultTaskTextRowString) {
                    if (markRow1Mark && this.settings.appendTextFormatMark) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMark);
                    } else if (markRow1Mark && !this.settings.appendTextFormatMark && this.settings.appendTextFormatMarkRow2) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMarkRow2);
                    } else if (markRow2Mark && this.settings.appendTextFormatMarkRow2) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMarkRow2);
                    } else if (markRow2Mark && !this.settings.appendTextFormatMarkRow2 && this.settings.appendTextFormatMark) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMark);
                    } else {
                        new Notice(`Task Marker: empty appending string!`);
                        console.debug("Task Marker: empty appending string!");
                    }
                } else if (defaultTaskTextRow1) {
                    if (markRow1Mark && this.settings.appendTextFormatMark) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMark);
                    } else if (markRow2Mark && this.settings.appendTextFormatMark) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMark);
                    } else {
                        new Notice(`Task Marker: empty appending string in row 1!`);
                        console.debug("Task Marker: empty appending string in row 1!");
                    }
                } else if (defaultTaskTextRow2) {
                    if (markRow1Mark && this.settings.appendTextFormatMarkRow2) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMarkRow2);
                    } else if (markRow2Mark && this.settings.appendTextFormatMarkRow2) {
                        marked = this.appendTextLineFunction(lineText, this.settings.appendTextFormatMarkRow2);
                    } else {
                        new Notice(`Task Marker: empty appending string in row 2!`);
                        console.debug("Task Marker: empty appending string in row 2!");
                    }
                } else if (defaultTaskNone) {
                    new Notice(`Task Marker: set to append nothing!`);
                    console.log("Task Marker: set to append nothing!");
                } else {
                    new Notice(`Task Marker: nothing to append!`);
                    console.log("Task Marker: nothing to append!");
                }
            } else {
                new Notice(`Task Marker: undefined mark or empty appending string!`);
                console.debug("Task Marker: undefined mark or empty appending string!");
            }
        } else {
            const defaultLineText1 = this.settings.appendTextAutoLineDefault === "text-1";
            const defaultLineText2 = this.settings.appendTextAutoLineDefault === "text-2";
            const defaultLineText3 = this.settings.appendTextAutoLineDefault === "text-3";
            const defaultLineNone = this.settings.appendTextAutoLineDefault === "none";

            if (defaultLineText1) {
                marked = this.appendTextLine(marked, "y");                
            } else if (defaultLineText2) {
                marked = this.appendTextLineText2(marked, "y");
            } else if (defaultLineText3) {
                marked = this.appendTextLineText3(marked, "y");
            } else if (defaultLineNone) {
                new Notice(`Task Marker: not a task, and set to append nothing!`);
                console.log("Task Marker: not a task, and set to append nothing!");
            } else {
                new Notice(`Task Marker: not a task, and nothing to append!`);
                console.log("Task Marker: not a task, and nothing to append!");
            }
        }
        lineText = marked;
        return lineText;
    }

    private resetTaskLine(lineText: string, mark = " "): string {
        console.debug("Task Marker: reset task with %s: %s", mark, lineText);
        lineText = lineText.replace(this.anyTaskMark, `$1${mark}$3`);
        const strictLineEnding = lineText.endsWith("  ");

        let blockid = "";
        const match = this.blockRef.exec(lineText);
        if (match && match[2]) {
            lineText = match[1];
            blockid = match[2];
        }
        if (this.initSettings.resetRegExp) {
            lineText = lineText.replace(this.initSettings.resetRegExp, "");
        }
        lineText = lineText.replace(/\s*$/, blockid);
        if (this.settings.appendRemoveAllTasks && mark !== " ") {
            // clear previous appended text
            lineText = this.completeTaskLine(lineText, mark);
            // lineText = this.markTaskLine(lineText, mark);
        }
        if (strictLineEnding) {
            lineText += "  ";
        }
        return lineText;
    }

    resetAllTasks(source: string): string {
        // const LOG_HEADING = this.settings.completedAreaHeader || "## Log";
        const lines = source.split("\n");

        const result: string[] = [];
        let inCompletedSection = false;
        for (const line of lines) {
            if (inCompletedSection) {
                if (line.startsWith("#") || line.trim() === "---") {
                    inCompletedSection = false;
                }
                result.push(line);
            // } else if (line.trim() === LOG_HEADING) {
            //     inCompletedSection = true;
            //     result.push(line);
            } else if (this.isCompletedTaskLine(line)) {
                result.push(this.resetTaskLine(line));
            } else {
                result.push(line);
            }
        }
        return result.join("\n");
    }

    // moveCompletedTasksInFile(source: string): string {
    //     const LOG_HEADING = this.settings.completedAreaHeader || "## Log";
    //     const lines = source.split("\n");

    //     if (source.indexOf(LOG_HEADING) < 0) {
    //         if (lines[lines.length - 1].trim() !== "") {
    //             lines.push("");
    //         }
    //         lines.push(LOG_HEADING);
    //     }

    //     const remaining = [];
    //     const completedSection = [];
    //     const newTasks = [];
    //     let inCompletedSection = false;
    //     let inTask = false;
    //     let inCallout = false;
    //     let completedTasksIndex = lines.length;

    //     for (let line of lines) {
    //         if (inCompletedSection) {
    //             if (line.startsWith("#") || line.trim() === "---") {
    //                 inCompletedSection = false;
    //                 remaining.push(line);
    //             } else {
    //                 completedSection.push(line);
    //             }
    //         } else if (line.trim() === LOG_HEADING) {
    //             inCompletedSection = true;
    //             completedTasksIndex = remaining.push(line);
    //             remaining.push("%%%COMPLETED_ITEMS_GO_HERE%%%");
    //         } else {
    //             if (this.isCompletedTaskLine(line)) {
    //                 if (this.settings.completedAreaRemoveCheckbox) {
    //                     line = this.removeCheckboxFromLine(line);
    //                 }
    //                 inTask = true;
    //                 inCallout = this.isCallout(line); // is task _inside_ the callout
    //                 newTasks.push(line);
    //             } else if (
    //                 inTask &&
    //                 !this.isTaskLine(line) &&
    //                 this.isContinuation(line, inCallout)
    //             ) {
    //                 newTasks.push(line);
    //             } else {
    //                 inTask = false;
    //                 inCallout = false;
    //                 remaining.push(line);
    //             }
    //         }
    //     }

    //     let result = remaining
    //         .slice(0, completedTasksIndex)
    //         .concat(...newTasks)
    //         .concat(...completedSection);
    //     if (completedTasksIndex < remaining.length - 1) {
    //         result = result.concat(remaining.slice(completedTasksIndex + 1));
    //     }
    //     return result.join("\n");
    // }

    private isCompletedTaskLine(lineText: string): boolean {
        return this.initSettings.completedTaskRegExp.test(lineText);
    }

    private isIncompleteTaskLine(lineText: string): boolean {
        return this.initSettings.incompleteTaskRegExp.test(lineText) || this.initSettings.incompleteTaskRegExpRow2.test(lineText); // Add Row2 here or not? Yes.
    }

    private isTaskLine(lineText: string): boolean {
        return this.anyTaskMark.test(lineText);
    }

    private isContinuation(lineText: string, inCallout: boolean): boolean {
        if (inCallout) {
            const match = this.blockQuote.exec(lineText);
            if (match) {
                return (
                    match[1].endsWith(">") ||
                    match[1].endsWith("  ") ||
                    match[1].endsWith("\t")
                );
            }
        }
        return this.continuation.test(lineText);
    }

    private isCallout(lineText: string): boolean {
        return this.blockQuote.test(lineText);
    }
}
