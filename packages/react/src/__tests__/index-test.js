/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Carbon from '../index';

describe('Carbon Components React', () => {
  it('can be imported using the correct path', () => {
    expect(typeof Carbon).toBe('object');
  });

  it('should export components', () => {
    expect(Object.keys(Carbon).sort()).toMatchInlineSnapshot(`
      Array [
        "Accordion",
        "AccordionItem",
        "AccordionSkeleton",
        "Breadcrumb",
        "BreadcrumbItem",
        "BreadcrumbSkeleton",
        "Button",
        "ButtonSkeleton",
        "Checkbox",
        "CheckboxSkeleton",
        "ClickableTile",
        "CodeSnippet",
        "CodeSnippetSkeleton",
        "ComboBox",
        "ComposedModal",
        "Content",
        "ContentSwitcher",
        "Copy",
        "CopyButton",
        "DangerButton",
        "DataTable",
        "DataTableSkeleton",
        "DatePicker",
        "DatePickerInput",
        "DatePickerSkeleton",
        "Dropdown",
        "DropdownSkeleton",
        "ErrorBoundary",
        "ErrorBoundaryContext",
        "ExpandableTile",
        "FileUploader",
        "FileUploaderButton",
        "FileUploaderDropContainer",
        "FileUploaderItem",
        "FileUploaderSkeleton",
        "Filename",
        "Form",
        "FormGroup",
        "FormItem",
        "FormLabel",
        "Header",
        "HeaderContainer",
        "HeaderGlobalAction",
        "HeaderGlobalBar",
        "HeaderMenu",
        "HeaderMenuButton",
        "HeaderMenuItem",
        "HeaderName",
        "HeaderNavigation",
        "HeaderPanel",
        "HeaderSideNavItems",
        "Icon",
        "IconSkeleton",
        "InlineLoading",
        "InlineNotification",
        "Link",
        "ListItem",
        "Loading",
        "Modal",
        "ModalBody",
        "ModalFooter",
        "ModalHeader",
        "ModalWrapper",
        "MultiSelect",
        "NotificationActionButton",
        "NotificationButton",
        "NotificationTextDetails",
        "NumberInput",
        "NumberInputSkeleton",
        "OrderedList",
        "OverflowMenu",
        "OverflowMenuItem",
        "Pagination",
        "PrimaryButton",
        "ProgressIndicator",
        "ProgressIndicatorSkeleton",
        "ProgressStep",
        "RadioButton",
        "RadioButtonGroup",
        "RadioButtonSkeleton",
        "RadioTile",
        "Search",
        "SearchFilterButton",
        "SearchLayoutButton",
        "SearchSkeleton",
        "SecondaryButton",
        "Select",
        "SelectItem",
        "SelectItemGroup",
        "SelectSkeleton",
        "SelectableTile",
        "SideNav",
        "SideNavDetails",
        "SideNavFooter",
        "SideNavHeader",
        "SideNavIcon",
        "SideNavItem",
        "SideNavItems",
        "SideNavLink",
        "SideNavLinkText",
        "SideNavMenu",
        "SideNavMenuItem",
        "SideNavSwitcher",
        "SkeletonPlaceholder",
        "SkeletonText",
        "SkipToContent",
        "Slider",
        "SliderSkeleton",
        "StructuredListBody",
        "StructuredListCell",
        "StructuredListHead",
        "StructuredListInput",
        "StructuredListRow",
        "StructuredListSkeleton",
        "StructuredListWrapper",
        "Switch",
        "Switcher",
        "SwitcherDivider",
        "SwitcherItem",
        "Tab",
        "TabContent",
        "Table",
        "TableActionList",
        "TableBatchAction",
        "TableBatchActions",
        "TableBody",
        "TableCell",
        "TableContainer",
        "TableExpandHeader",
        "TableExpandRow",
        "TableExpandedRow",
        "TableHead",
        "TableHeader",
        "TableRow",
        "TableSelectAll",
        "TableSelectRow",
        "TableToolbar",
        "TableToolbarAction",
        "TableToolbarContent",
        "TableToolbarMenu",
        "TableToolbarSearch",
        "Tabs",
        "TabsSkeleton",
        "Tag",
        "TagSkeleton",
        "TextArea",
        "TextAreaSkeleton",
        "TextInput",
        "TextInputSkeleton",
        "Tile",
        "TileAboveTheFoldContent",
        "TileBelowTheFoldContent",
        "TileGroup",
        "TimePicker",
        "TimePickerSelect",
        "ToastNotification",
        "Toggle",
        "ToggleSkeleton",
        "ToggleSmall",
        "ToggleSmallSkeleton",
        "Toolbar",
        "ToolbarDivider",
        "ToolbarItem",
        "ToolbarOption",
        "ToolbarSearch",
        "ToolbarTitle",
        "Tooltip",
        "TooltipDefinition",
        "TooltipIcon",
        "UnorderedList",
      ]
    `);
  });
});
