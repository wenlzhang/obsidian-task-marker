# How to configure

## Completing tasks

- **Append text to completed task**
    - Examples:
        - `[(]YYYY-MM-DD[)]` results in `(2023-01-01)`.
        - `[✅ ]YYYY-MM-DD` results in `✅ 2023-01-01`.
    - Notes:
        - Use [moment.js date format](https://momentjs.com/docs/#/displaying/format/) to format date and time to be appended.
        - Use square brackets to surround content that is not part of the format string.
        - When working with dataview-friendly annotations, for example, your format string should look somethng like this: `[[completion::]YYYY-MM-DD[]]`.

## Marking tasks

- **Additional task statuses**
    - Example: `> ?!`
    - Notes:
        - Specify the set of single characters that indicate in-progress or incomplete tasks (see [Alternate Checkboxes](https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Guide/Alternate-Checkboxes.md) for more statuses.).
        - In **row 1**, a space is included at the beginning along with other values, e.g. `> ?!` would become ` > ?!` when saving the settings.
- **Append text to marked task**
    - See "**Append text to completed task**".
- One can assign different sets of additional task statuses to the two rows of options.
    - For instance, in one row, one can choose to append text when marking an item; in another row, nothing would be added.
