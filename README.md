# Task Marker

[![GitHub release (Latest by date)](https://img.shields.io/github/v/release/wenlzhang/obsidian-task-marker)](https://github.com/wenlzhang/obsidian-task-marker/releases) ![GitHub all releases](https://img.shields.io/github/downloads/wenlzhang/obsidian-task-marker/total?color=success)

An [Obsidian](https://obsidian.md/) plugin to change task status and append text with hotkeys and right-click context menu.

## Features

### Main

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

<a href='https://ko-fi.com/C0C66C1TB' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
