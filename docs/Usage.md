# Usage

## Complete tasks

If the current line is (or selection contains) a task, and the task matches the configuration for an incomplete task:

1. It will mark the item as complete (`[x]` or `[X]` if selected). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

## Cancel tasks (if enabled)

If the current line is (or selection contains) a task, and the task matches the configuration for an incomplete task:

1. It will mark the item as canceled (`[-]`). 
1. If an append text format string is configured, append a formatted text string to the end of the task text.

## Mark tasks

1. A dialog will pop up showing set task statuses in three groups: 
    - Group 1 contains marks for "completed" items.
    - Group 2 contains marks for "additional task statuses".
    - Group 3 also contains marks for "additional task statuses".
2. Use the mouse to select an icon, or type the associated character.

## Cycle task statuses

1. If the current status of the item matches one of the configured statuses, the status would change to the next one.
      - For instance, if `Rip` is configured and the current status is `R`, then the status become `i` after executing the command.
1. If the current status of the item does not match any of the configured statuses, the status would change to the first one.
      - For instance, if `Rip` is configured and the current status is `x`, then the status would become `R` after executing the command.
