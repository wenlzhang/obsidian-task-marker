# Obsidian: Task Marker

[![GitHub tag (Latest by date)](https://img.shields.io/github/v/tag/wenlzhang/obsidian-task-marker)](https://github.com/wenlzhang/obsidian-task-marker/releases) ![GitHub all releases](https://img.shields.io/github/downloads/wenlzhang/obsidian-task-marker/total?color=success)

A plugin to change task statuses with hotkeys and right-click context menu.

- **Completed tasks** are marked with `[x]`.
    - **Canceled tasks**, marked with `[-]`, can also be added to this group in settings.
- Any other task status, e.g. `[>]`, are considered **incomplete** (or in-progress).
- When a task is *completed* (assigned `[x]` or optionally `[-]`), it can be annotated with additional text, e.g. `✅ 2023-01-01`.
- When an item is _marked with additional task statuses_, text can also be appended at the end, e.g. `❎ 2023-01-01`.

---

## How to install

1. Go to **Community Plugins** in your [Obsidian](https://www.obsidian.md) settings and **disable** Safe Mode
2. Click on **Browse** and search for "task marker"
3. Click install
4. "Enable" the plugin directly after installation, or use the toggle on the community plugins tab to enable the plugin after it has been installed.

---

## How to use

### Complete tasks

If the current line is (or selection contains) a task, AND the task matches the configuration for an incomplete task:

1. It will mark the item as complete (`[x]` or `[X]` if selected). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

### Cancel tasks (if enabled)

If the current line is (or selection contains) a task, AND the task matches the configuration for an incomplete task:

1. It will mark the item as canceled (`[-]`). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

### Mark tasks

1. A dialog will pop up showing set task statuses in three groups: 
    - Group 1 contains marks for "completed" items.
    - Group 2 contains marks for "additional task statuses", minimally a space (`[ ]`).
    - Group 3 also contains marks for "additional task statuses".
    - **Note that a task mark cannot exist in Groups 2 and 3; otherwise, it would task effect as specified for Group 2.**
2. Use the mouse to select an icon, or type the associated character.
3. What happens next depends on the state of the task and the selected character.
    - If this is a plain list item, it will be converted into an empty incomplete task: processing continues...
    - If an incomplete task is completed (`[x]`, `[X]`), see [Complete Task](#complete-task).
    - If an incomplete task is canceled (`[-]`), see [Cancel Task](#cancel-task-if-enabled).
    - If an item is reset (`[ ]` or _other_), see [Reset Task](#reset-task).
    - If a completed item is completed or canceled, nothing happens.
    - If an unknown character is typed, nothing happens.

### Cycle task statuses

Hotkeys can be used to cycle among task statuses configured in settings.

1. If the current status of the item matches one of the configured statuses, the status would change to the next one.
      - For instance, if `Rip` is configured and the current status is `R`, then the status would change to `i` after executing the command.
1. If the current status of the item does not match any of the configured statuses, the status would change to the first one.
      - For instance, if `Rip` is configured and the current status is `x`, then the status would change to `R` after executing the command.

<!-- ### Reset tasks

If the current line is (or selection contains) a task:

1. It will set it to `[ ]` or an otherwise selected value. 
2. If an append text format string is configured, appended text that matches the configured format will be removed. -->

---

## How to configure

### Completing tasks

- **Append text to completed task**
    - Examples:
        - `[(]YYYY-MM-DD[)]` results in `(2023-01-01)`.
        - `[✅ ]YYYY-MM-DD` results in `✅ 2023-01-01`.
    - Notes:
        - Use [moment.js date format](https://momentjs.com/docs/#/displaying/format/) to format date and time to be appended.
        - Use square brackets to surround content that is not part of the format string.
        - When working with dataview-friendly annotations, for example, your format string should look somethng like this: `[[completion::]YYYY-MM-DD[]]`.

### Marking tasks

- **Additional task statuses**
    - Example: `> ?!`
    - Notes:
        - Specify the set of single characters that indicate in-progress or incomplete tasks (see [Alternate Checkboxes](https://github.com/SlRvb/Obsidian--ITS-Theme/blob/main/Guide/Alternate-Checkboxes.md) for more statuses.).
        - In **row 1**, a space is included at the beginning along with other values, e.g. `> ?!` would become ` > ?!` when saving the settings.
- **Append text to marked task**
    - See "**Append text to completed task**".
- One can assign different sets of additional task statuses to the two rows of options.
    - For instance, in one row, one can choose to append text when marking an item; in another row, nothing would be added.

## Credits

- [ebullient/obsidian-task-collector: Plugin for https://obsidian.md/ that assists with managing tasks within a document.](https://github.com/ebullient/obsidian-task-collector)
    - This plugin serves as a starting template for this plugin.

## Support me

<a href='https://ko-fi.com/C0C66C1TB' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
