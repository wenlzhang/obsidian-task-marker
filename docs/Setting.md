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

- **Additional task statuses**
    - Examples:
        - `>?!`
        - Minimally a space (`[ ]`)
    - Notes:
        - Specify the set of characters that indicate incomplete tasks (see [Alternate Checkboxes](https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Guide/Alternate-Checkboxes.md) for more statuses.).
            - In **row 1**, a space would be automatically included at the beginning of the set values.
        - Different sets of additional task statuses can be set in rows 1 and 2.
            - **A task mark cannot exist in rows 1 and 2; otherwise, it would task effect as specified for row 1.**
- **Append text to marked task**
    - See "**Append text to completed task**".
    - Notes:
        - In one row, one can choose to append text when marking a task; in another row, one can choose to append nothing.

## Cycle tasks

- **Cycled task statuses**
    - Examples:
        - `x- Rip`

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
