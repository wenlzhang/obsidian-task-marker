# How to configure

Task Marker commands can be assigned with hotkeys:

- Go to `Settings > Hotkeys` and search for "task marker"
    - Assign hotkeys for the desired commands
- Go to note editor, use `Command/Ctrl + P` and search for "task marker"
    - Select the desired commands and see the corresponding hotkeys

Task Marker commands can also be accessed through right-click context menu, if the they are enabled in the section "Marking tasks using menus" of settings.

Task Marker uses [moment.js](https://momentjs.com/docs/#/displaying/format/) to format the date and time to be appended. In addition, **square brackets** are needed to surround the content that is not part of the format string.

- For example, if `[completion::2023-01-01]` is the desired text to be appended, then `[[completion::]YYYY-MM-DD[]]` needs to be configured in settings.

## Create tasks

- **Append text to created task**
    - Examples:
        - `[📝 ]YYYY-MM-DD` results in `📝 2023-01-01`.
        - `[[created::]YYYY-MM-DD[]]` results in `[created::2023-01-01]`.

## Complete tasks

- **Append text to completed task**
    - Examples:
        - `[✅ ]YYYY-MM-DD` results in `✅ 2023-01-01`.
        - `[[completion::]YYYY-MM-DD[]]` results in `[completion::2023-01-01]`.

## Mark tasks

- **Additional task statuses (row 1/2)**
    - Examples:
        - `>?!`
        - Minimally a space (`[ ]`)
    - Notes:
        - Specify the set of characters that indicate incomplete tasks (see [Alternate Checkboxes](https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Guide/Alternate-Checkboxes.md) for more statuses.).
            - In **row 1**, a space would be automatically included at the beginning of the set values.
        - Different sets of additional task statuses can be set in rows 1 and 2.
            - **A task mark cannot exist in rows 1 and 2; otherwise, it would task effect as specified for row 1.**
- **Append text to marked task (row 1/2)**
    - See "**Append text to completed task**".
    - Notes:
        - In one row, one can choose to append text when marking a task; in another row, one can choose to append nothing.

## Cycle tasks

- **Cycled task (main)**
    - Examples:
        - `x- Rip`
- **Support cycling task reversely (main)**
    - If enabled, an additional command would be added to reversely cycle the statuses configured in **Cycled task (main)**.
    - For the example above, it means that this command would cycle among `piR -x`.

## Append text

- **Append text to any line (text 1)**
    - Examples:
        - `[📝 ]YYYY-MM-DD` results in `📝 2023-01-01`.
        - `[[created::]YYYY-MM-DD[]]` results in `[created::2023-01-01]`.
- **Append text to any line (text 2)**
    - Examples:
        - `[✅ ]YYYY-MM-DD` results in `✅ 2023-01-01`.
- **Append text to any line (text 3)**
    - Examples:
        - `[❎ ]YYYY-MM-DD` results in `❎ 2023-01-01`.

## Append text automatically

- **Append text to a task automatically**
    - For an uncompleted task (marked with `[ ]`)
        - This corresponds to the settings in the section "Create tasks".
        - Automatically append text such as `📝 2023-01-01`
    - For a completed task (marked with e.g. `[x]`)
        - This corresponds to the settings in the section "Complete tasks".
        - Automatically append text such as `✅ 2023-01-01`
- **Set for a marked task the default text to append automatically**
    - For a marked task (with e.g. `>?!`)
        - This corresponds to the settings in the section "Mark tasks".
        - The following options are for the settings in "rows 1 and 2"
    - Options
        - *None*
            - Default option.
            - Nothing would be appended, regardless of the settings in "Mark tasks".
        - *Append text according to individual rows*
            - If the current task status exists in "row 1", then the string corresponding to "row 1" would be appended.
            - If the current task status exists in "row 2", then the string corresponding to "row 2" would be appended.
        - *Append text according to the row with string*
            - If the current task status exists in "row 1" and "row 1/2" is set with a appending string, the string corresponding to "row 1/2" would be appended.
            - If the current task status exists in "row 2" and "row 2/1" is set with a appending string, the string corresponding to "row 2/1" would be appended.
        - *Append text always according to row 1*
            - Always append string according to the settings for "row 1", regardless the current task status exists in "row 1" or "row 2".
        - *Append text always according to row 2*
            - Always append string according to the settings for "row 2", regardless the current task status exists in "row 2" or "row 2".
- **Set for a non-task line the default text to append automatically**
    - This corresponds to the settings in the section "Append text".
    - Options
        - *None*
            - Default option.
            - Nothing would be appended, regardless of the settings in "Append text".
        - *Append text to any line (text 1)*
            - Append text according to the string for "Append text to any line (text 1)"
        - *Append text to any line (text 2)*
            - Append text according to the string for "Append text to any line (text 2)"
        - *Append text to any line (text 3)*
            - Append text according to the string for "Append text to any line (text 3)"
