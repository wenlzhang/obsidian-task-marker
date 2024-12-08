# Task Marker

[![GitHub release (Latest by date)](https://img.shields.io/github/v/release/wenlzhang/obsidian-task-marker)](https://github.com/wenlzhang/obsidian-task-marker/releases) ![GitHub all releases](https://img.shields.io/github/downloads/wenlzhang/obsidian-task-marker/total?color=success)

An [Obsidian](https://obsidian.md/) plugin to change task status and append text with hotkeys and right-click context menu.

![demo](/docs/attachment/demo.gif)

## Key Features

- Create tasks
    - Mark list items with `[ ]`
    - Optionally append text such as `📝 2023-01-01`
- Complete and cancel tasks
    - Mark tasks with `[x]` and `[-]`
    - Optionally append text such as `✅ 2023-01-01`
- Mark tasks
    - Mark tasks with statuses such as `[>]` and `[/]`
    - Mark individual task statuses with hotkeys
    - Optionally append text such as `❎ 2023-01-01`
- Cycle tasks
    - Cycle among configured statuses such as `[x]`, `[-]`, `[>]` and `[/]`
    - Reversely cycle among configured statuses
    - Include list item as the first cycled status 📝 2023-11-06
        - A toggle is added for selecting whether to include the list item as the first cycled status or not.
- Cycle tasks among additional lists of statuses 📝 2023-11-04
    - E.g., list 1 `x->/` for task execution status
    - E.g., list 2 `?!biI` for task importance
    - E.g., list 3 `pcud` for task pro/con/up/down
- Append text
    - Command to append text such as `📝 2023-01-01` to any line
    - Command to append text such as `✅ 2023-01-01` to any line
    - Command to append text such as `❎ 2023-01-01` to any line
- Append text automatically 📝 2023-03-04
    - Automatically append text according to task/line status

### Miscellaneous

- Support operating on items that start with `-+*` 📝 2023-07-24
- Retain cursor location when operating on tasks 📝 2023-11-07
    - The cursor location is set with respect to text, excluding item/task prefix.
    - The behaviour is the same as the default Obsidian command `Cycle bullet/checkbox`.

## The Story Behind Task Marker

[Obsidian Task Marker](https://exp.ptkm.net/obsidian-task-marker) was crafted with two [PTKM Core Principles](https://exp.ptkm.net/ptkm-core-principles) that shape its functionality:

- **Task-Centered Workflow**: Prioritizing efficient task management
- **Focus on Priority**: Helping users concentrate on what truly matters

This plugin was developed to address a simple yet essential need: tasks can have various statuses, such as open, completed, or transferred. In lengthy notes, like meeting notes, there can be numerous list items. When organizing and reviewing these notes, it’s helpful to mark different items with various statuses to highlight their importance and difference. Later, when revisiting the meeting notes, you can easily focus on these key items—such as ideas, questions, bookmarks, information, pros, cons, and similar elements—without having to sift through all the lengthy content.

Recognizing the need to mark tasks with different statuses, I developed this plugin to simplify the process. With it, you can easily assign different statuses to items and use hotkeys to cycle through them. Additionally, when marking tasks, the plugin automatically adds timestamps to indicate when tasks were created, completed, and marked. This timestamp information is crucial, which is also why I developed the [Obsidian Timestamp Link](https://exp.ptkm.net/obsidian-timestamp-link) plugin.

I hope you enjoy using this plugin!

## Documentation

📚 **[View Full Documentation](https://exp.ptkm.net/obsidian-task-marker)**

Visit the documentation site to learn how to make the most of Task Marker in your Obsidian workflow.

## Support & Community

This plugin is a labor of love, developed and maintained during my free time after work and on weekends. A lot of thought, energy, and care goes into making it reliable, user-friendly, and aligned with PTKM principles.

If you find this plugin valuable in your daily workflow:

- If it helps you manage tasks more effectively
- If it saves you time and mental energy
- If it makes your work between Obsidian and Todoist smoother

Please consider supporting my work. Your support would mean the world to me and would help me dedicate more time and energy to:

- Developing new features
- Maintaining code quality
- Providing support and documentation
- Making the plugin even better for everyone

### Ways to Support

You can support this project in several ways:

- ⭐ Star the project on GitHub
- 💝 <a href='https://ko-fi.com/C0C66C1TB' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee' /></a>
- [Sponsor](https://github.com/sponsors/wenlzhang) my work on GitHub
- 💌 Share your success stories and feedback
- 📢 Spread the word about the plugin
- 🐛 [Report issues](https://github.com/wenlzhang/obsidian-task-marker/issues) to help improve the plugin

Thank you for being part of this journey! 🙏
