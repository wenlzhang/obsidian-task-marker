# How to configure

## Creating tasks

- **Append text to created task**
    - Examples:
        - `[📝 ]YYYY-MM-DD` results in `📝 2023-01-01`.
        - `[[created::]YYYY-MM-DD[]]` results in `[created::2023-01-01]`.
    - Notes:
        - Use [moment.js date format](https://momentjs.com/docs/#/displaying/format/) to format date and time to be appended.
        - Use square brackets to surround content that is not part of the format string.

## Completing tasks

- **Append text to completed task**
    - Examples:
        - `[✅ ]YYYY-MM-DD` results in `✅ 2023-01-01`.
        - `[[completion::]YYYY-MM-DD[]]` results in `[completion::2023-01-01]`.

## Marking tasks

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

## Cycling tasks

- **Cycled task statuses**
    - Examples:
        - `x- Rip`

## Appending text

- **Append text to any line**
    - Examples:
        - `[📝 ]YYYY-MM-DD` results in `📝 2023-01-01`.
        - `[[created::]YYYY-MM-DD[]]` results in `[created::2023-01-01]`.
