# Usage

## Complete tasks

If the current line is (or selection contains) a task, AND the task matches the configuration for an incomplete task:

1. It will mark the item as complete (`[x]` or `[X]` if selected). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

## Cancel tasks (if enabled)

If the current line is (or selection contains) a task, AND the task matches the configuration for an incomplete task:

1. It will mark the item as canceled (`[-]`). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

## Mark tasks

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

## Cycle task statuses

Hotkeys can be used to cycle among task statuses configured in settings.

1. If the current status of the item matches one of the configured statuses, the status would change to the next one.
      - For instance, if `Rip` is configured and the current status is `R`, then the status would change to `i` after executing the command.
1. If the current status of the item does not match any of the configured statuses, the status would change to the first one.
      - For instance, if `Rip` is configured and the current status is `x`, then the status would change to `R` after executing the command.

<!-- ## Reset tasks

If the current line is (or selection contains) a task:

1. It will set it to `[ ]` or an otherwise selected value. 
2. If an append text format string is configured, appended text that matches the configured format will be removed. -->
