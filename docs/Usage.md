# Usage

## Create tasks

If the current line is (or selection contains) a list item or a task with the mark `[ ]`:

- It will convert the list item to a task.
- If an append text format string is configured, append a formatted text string to the end of the task text.

## Complete tasks

### Complete tasks

If the current line is (or selection contains) a task, and the task matches the configuration for an incomplete task:

- It will mark the task as complete (`[x]` or `[X]` if selected). 
- If an append text format string is configured, append a formatted text string to the end of the task text.

### Cancel tasks (if enabled)

If the current line is (or selection contains) a task, and the task matches the configuration for an incomplete task:

- It will mark the task as canceled (`[-]`). 
- If an append text format string is configured, append a formatted text string to the end of the task text.

## Mark tasks

- A dialog will pop up showing set task statuses in three groups:
    - Group 1 contains marks for "completed" tasks.
    - Group 2 contains marks for "Additional task statuses (row 1)".
    - Group 3 contains marks for "Additional task statuses (row 2)".
- Use the **mouse** to select an icon, or **type** the associated character.
    - For instance, one can type `x` to complete the task.

## Cycle task status

### Cycle task status

- If the current status of the task matches one of the configured statuses, the status would change to the next one.
      - For instance, if `Rip` is configured and the current status is `R`, then the status become `i` after executing the command.
- If the current status of the task does not match any of the configured statuses, the status would change to the first one.
      - For instance, if `Rip` is configured and the current status is `x`, then the status would become `R` after executing the command.
- If it is an item, e.g., `- Item`, rather than a task, then the status would start from the first status in the configuration.

### Cycle task status reversely

- If **Support cycling task status reversely** is enabled, an additional command would be added to reversely cycle the statuses configured in **Cycled task statuses**.

## Append text

- If an append text format string is configured, append a formatted text string to the end of any line text.
- One can configure text of different formats to append.
      - For example, the formats can correspond to the texts for creating, completing and marking tasks.

## Append text automatically

- Automatically append text to a task according to settings
- Automatically append text to a non-task line according to settings
