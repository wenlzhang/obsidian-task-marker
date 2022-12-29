import { App } from "obsidian";
import { TaskMarker } from "../src/taskmarker-TaskMarker";
import { DEFAULT_SETTINGS, TaskMarkerSettings } from "../src/taskmarker-Settings";
import * as Moment from 'moment';

jest.mock('obsidian', () => ({
    App: jest.fn().mockImplementation(),
    moment: () => Moment()
}));

const config: TaskMarkerSettings = Object.assign({}, DEFAULT_SETTINGS);;

afterEach(() => {
    // reset config to defaults
    Object.assign(config, DEFAULT_SETTINGS);
});

test('Test move -- no completed items', () => {
    const tc = new TaskMarker(new App());
    tc.updateSettings(config);

    const text = "- [ ] Incomplete";

    const result = tc.moveCompletedTasksInFile(text);
    expect(result).toEqual("- [ ] Incomplete\n\n## Log");
});

test('Test move -- no completed items; continuation', () => {
    const tc = new TaskMarker(new App());
    tc.updateSettings(config);

    const text = "a  \n    text continuation";

    const result = tc.moveCompletedTasksInFile(text);
    expect(result).toEqual("a  \n    text continuation\n\n## Log");
});

test('Move completed items to archive area', () => {
    const tc = new TaskMarker(new App());
    config.supportCanceledTasks = true;
    tc.updateSettings(config);

    const start = "- [ ] one\n- [>] two\n- [-] three\n- [x] four";
    expect(tc.moveCompletedTasksInFile(start))
        .toEqual("- [ ] one\n- [>] two\n\n## Log\n- [-] three\n- [x] four");
});

test('Test move completed item', () => {
    const tc = new TaskMarker(new App());
    tc.updateSettings(config);

    const start = "\n- [x] a  \n    text continuation  \n    \n    Including a longer paragraph in the same bullet\n";

    expect(tc.moveCompletedTasksInFile(start))
        .toEqual("\n\n## Log\n- [x] a  \n    text continuation  \n    \n    Including a longer paragraph in the same bullet");
});

test('Test move completed item from callout', () => {
    const tc = new TaskMarker(new App());
    tc.updateSettings(config);

    const start =
    "> - [x] This line ends with two spaces  \n" +
    ">    which allows text to wrap using strict markdown line wrapping syntax. This line should move, too.  \n" +
    ">\n" +
    ">    This is also how you support list items with multiple paragraphs (leading whitespace indent), and it should travel with the previous list item.\n" +
    ">\n" +
    "> - [ ] Another item";

    const result =
    "> - [ ] Another item\n" +
    "\n" +
    "## Log\n" +
    "> - [x] This line ends with two spaces  \n" +
    ">    which allows text to wrap using strict markdown line wrapping syntax. This line should move, too.  \n" +
    ">\n" +
    ">    This is also how you support list items with multiple paragraphs (leading whitespace indent), and it should travel with the previous list item.\n" +
    ">";

    expect(tc.moveCompletedTasksInFile(start)).toEqual(result);
});

test('Test move callout associated with completed item', () => {
    const tc = new TaskMarker(new App());
    tc.updateSettings(config);

    const start =
    "- [x] The nested quote should move with the item\n" +
    "    > [!note]\n" +
    "    > Nested blockquotes associated with it would also be moved.";

    const result =
    "\n" +
    "## Log\n" +
    "- [x] The nested quote should move with the item\n" +
    "    > [!note]\n" +
    "    > Nested blockquotes associated with it would also be moved.";

    expect(tc.moveCompletedTasksInFile(start)).toEqual(result);
});
