# Task Marker

[![GitHub release (Latest by date)](https://img.shields.io/github/v/release/wenlzhang/obsidian-task-marker)](https://github.com/wenlzhang/obsidian-task-marker/releases) ![GitHub all releases](https://img.shields.io/github/downloads/wenlzhang/obsidian-task-marker/total?color=success)

An [Obsidian](https://obsidian.md/) plugin to change task status and append text with hotkeys and right-click context menu.

## Features

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

![demo](/docs/attachment/demo.gif)

### Miscellaneous

- Support operating on items that start with `-+*` 📝 2023-07-24
- Retain cursor location when operating on tasks 📝 2023-11-07
    - The cursor location is set with respect to text, excluding item/task prefix.
    - The behaviour is the same as the default Obsidian command `Cycle bullet/checkbox`.

## The story behind this plugin

[Obsidian Task Marker](https://exp.ptkm.net/obsidian-task-marker) was crafted with two [PTKM Core Principles](https://exp.ptkm.net/ptkm-core-principles) that shape its functionality:

- **Task-Centered Workflow**: Prioritizing efficient task management
- **Focus on Priority**: Helping users concentrate on what truly matters

This plugin was developed to address a simple yet essential need: tasks can have various statuses, such as open, completed, or transferred. In lengthy notes, like meeting notes, there can be numerous list items. When organizing and reviewing these notes, it’s helpful to mark different items with various statuses to highlight their importance and difference. Later, when revisiting the meeting notes, you can easily focus on these key items—such as ideas, questions, bookmarks, information, pros, cons, and similar elements—without having to sift through all the lengthy content.

Recognizing the need to mark tasks with different statuses, I developed this plugin to simplify the process. With it, you can easily assign different statuses to items and use hotkeys to cycle through them. Additionally, when marking tasks, the plugin automatically adds timestamps to indicate when tasks were created, completed, and marked. This timestamp information is crucial, which is also why I developed the [Obsidian Timestamp Link](https://exp.ptkm.net/obsidian-timestamp-link) plugin.

I hope you enjoy using this plugin!

## Usage

### How to use

See [Usage](docs/Usage.md) for details.

### How to configure

Task Marker uses [moment.js](https://momentjs.com/docs/#/displaying/format/) to format the date and time to be appended. In addition, **square brackets** are needed to surround the content that is not part of the format string.

- For example, if `[completion::2023-01-01]` is the desired text to be appended, then `[[completion::]YYYY-MM-DD[]]` needs to be configured in settings.

See [Setting](docs/Setting.md) for more detailed settings.

### How to install

Install the plugin from the Obsidian Community Plugins store:

1. Go to `Settings > Community plugins` and disable "Restricted mode"
2. Click "Browse" to search for plugins and type "task marker"
3. Select **Task Marker** and click "Install"
4. Enable Task Marker and configure it as desired

<!-- The plugin has been submitted to the Obsidian **Community Plugins** for review but is not available in the community plugin store yet. For now, there are two methods to install this plugin:

- Manually download `main.js`, `manifest.json` and `styles.css` and put them inside `.obsidian/obsidian-task-marker` of your Obsidian vault.
- Alternatively, you can use [obsidian42-brat](https://github.com/TfTHacker/obsidian42-brat) to install and update the plugin. -->

### Resources

See [Resource](docs/Resource.md) for details.

## Development process

You can see how this plugin is developed starting from scratch as follows:

- [Project actions - Develop an Obsidian plugin for changing task status - 202212262317 - PTKM Experiment](https://exp.ptkm.net/220-Development/Project+action/Project+actions+-+Develop+an+Obsidian+plugin+for+changing+task+status+-+202212262317)

## Credits

- [Obsidian: Task Collector](https://github.com/ebullient/obsidian-task-collector)
    - This plugin serves as a starting template.

## Support me

If you find this plugin helpful, consider [sponsoring my work](https://github.com/sponsors/wenlzhang) or

<a href='https://ko-fi.com/C0C66C1TB' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee' /></a>
