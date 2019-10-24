using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEngine.UIElements;
using UnityEditor.UIElements;
using ACTools.General;

namespace ACTools
{
    namespace DataManager
    {
        public class DataManagerWindow : EditorWindow
        {
            public static Action<DropdownMenuAction> CreateDataType = delegate { };

            public static bool DataTypeSelected { get; private set; } = false;
            public static bool ItemSelected { get; private set; } = false;
            
            private VisualElement leftColumnItems;
            private VisualElement rightColumnItems;

            List<DataManagerSettingsEntry> visibleEntries;

            DataManagerSettingsEntry selectedDataEntry;
            List<DataType> selectedDataObjects;

            private ToolbarMenu createMenu;
            public static string NewDataTypeButtonName => "Create New DataType";
            public static string CVSDataTypeButtonName => "Generate DataType via CSV";

            private ToolbarSearchField searchField;

            private ToolbarButton refreshButton;
            
            private Button createTypeButton;
            private Button createTypeFromCVSButton;

            private ListView leftList;
            private ListView rightList;

            [MenuItem("Window/ACTools/Data Manager Window")]
            public static void ShowWindow()
            {
                DataManagerWindow wnd = GetWindow<DataManagerWindow>();
                wnd.titleContent = new GUIContent("Data Manager");

                wnd.minSize = new Vector2(400f, 180f);
            }

            public void OnEnable()
            {
                #region UXML and USS set-up
                // Each editor window contains a root VisualElement object
                VisualElement root = rootVisualElement;

                // Import UXML and USS
                StyleSheet acToolsStyles = AssetDatabase.LoadAssetAtPath<StyleSheet>(ACToolsEditorUI.UniversalStyleSheet);

                VisualTreeAsset visualTree = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>("Assets/_ACTools/_Data Manager/Editor/Window/DataManagerWindow.uxml");
                StyleSheet styleSheet = AssetDatabase.LoadAssetAtPath<StyleSheet>("Assets/_ACTools/_Data Manager/Editor/Window/DataManagerWindow.uss");

                // Adds style sheets to root.
                root.styleSheets.Add(acToolsStyles);
                root.styleSheets.Add(styleSheet);

                // Clones the visual tree and adds it to the root.
                VisualElement tree = visualTree.CloneTree();
                tree.AddToClassList("ACTools_template-container");
                root.Add(tree);
                #endregion

                #region Toolbar
                // Sets up the add fields, buttons, and events.
                #region Create Menu
                createMenu = tree.Q<ToolbarMenu>("CreateMenu");
                createMenu.Q<TextElement>("").AddToClassList("ACTools_toolbar-icon_cross");

                CreateDataType += CreateNewDataType.CreateDataType;
                CreateDataType += CreateDataTypeFromCVSWindow.ShowWindow;

                createMenu.menu.InsertAction(0, NewDataTypeButtonName, CreateDataType);
                createMenu.menu.InsertAction(1, CVSDataTypeButtonName, CreateDataType);
                #endregion

                #region Search Field
                searchField = tree.Q<ToolbarSearchField>("SearchTypes");
                searchField.Q<Button>("unity-search").clickable.clicked += SearchDataManagerWindow;
                #endregion

                #region Refresh Button
                refreshButton = tree.Q<ToolbarButton>("RefreshButton");
                refreshButton.clickable.clicked += RefreshDataManagerAction;

                VisualElement refreshIcon = new VisualElement();
                refreshIcon.AddToClassList("ACTools_toolbar-icon_refresh");
                refreshButton.Add(refreshIcon);
                #endregion

                #endregion

                #region Main Row
                // Sets selected values to null;
                DataTypeSelected = false;
                ItemSelected = false;

                #region Left Column
                // Gets the left column.
                leftColumnItems = tree.Q<VisualElement>("LC_Items");

                DrawLeftColumnItems();
                #endregion

                #region Right Column
                // Gets the middle column.
                rightColumnItems = tree.Q<VisualElement>("RC_Items");

                DrawRightColumnItems();
                #endregion

                #endregion
            }

            /// <summary> Draws the left column from the avaliable types. </summary>
            private void DrawLeftColumnItems()
            {
                // Clears out old visual elements.
                leftColumnItems.Clear();
                DataManagerDataTypeFinder.CheckForNewDataTypes();

                #region Sets up ListView.
                visibleEntries = new List<DataManagerSettingsEntry>();
                foreach (DataManagerSettingsEntry entry in DataManagerSettingsAccessor.Settings.EntriesArray)
                {
                    if (entry.visiblity == VisiblityToManager.Visible)
                        visibleEntries.Add(entry);
                }

                Func<VisualElement> makeItem = () => new Label();

                Action<VisualElement, int> bindItem = (e, i) => (e as Label).text = visibleEntries.ToArray()[i].typeAsString;
                bindItem += (e, i) => (e as Label).AddToClassList("item_list"); // Adds the class but does not use styling for some reason.

                const int itemHeight = 20;

                leftList = new ListView(visibleEntries, itemHeight, makeItem, bindItem);
                leftList.AddToClassList("list");
                leftList.selectionType = SelectionType.Single;
                leftList.onSelectionChanged += CheckForSelectedType;
                
                leftColumnItems.Add(leftList);
                #endregion
            }

            /// <summary> Draws the right column based on the currently selected type. </summary>
            private void DrawRightColumnItems()
            {
                // Clears out old visual elements.
                rightColumnItems.Clear();

                if (DataTypeSelected)
                {
                    #region Sets up List.

                    selectedDataEntry = visibleEntries.ToArray()[leftList.selectedIndex];
                    Type stringToType = Type.GetType(selectedDataEntry.assemblyName);

                    List<UnityEngine.Object> objectArray = FolderUtility.FindAssetsByType(stringToType);
                    selectedDataObjects = new List<DataType>();

                    foreach (UnityEngine.Object obj in objectArray)
                    {
                        selectedDataObjects.Add((DataType) obj);
                    }

                    #endregion

                    #region Sets up ListView.
                    
                    Func<VisualElement> makeItem = () => new Label();

                    Action<VisualElement, int> bindItem = (e, i) => (e as Label).text = selectedDataObjects.ToArray()[i].name;
                    bindItem += (e, i) => (e as Label).AddToClassList("item_list"); // Adds the class but does not use styling for some reason.

                    const int itemHeight = 20;

                    rightList = new ListView(selectedDataObjects, itemHeight, makeItem, bindItem);
                    rightList.AddToClassList("list");
                    rightList.selectionType = SelectionType.Single;
                    rightList.onSelectionChanged += CheckForSelectedObject;

                    rightColumnItems.Add(rightList);
                    #endregion
                }
            }

            /// <summary> Shows the selected item in the inspector. </summary>
            private void DrawSelectedItemInInspector()
            {
                if (DataTypeSelected && ItemSelected)
                {
                    DataType selectedDataObject = selectedDataObjects.ToArray()[rightList.selectedIndex];
                    Type selectedDataObjectType = Type.GetType(selectedDataObject.AssemblyName);
                    
                    string[] guids = AssetDatabase.FindAssets(selectedDataObject.name);
                    string path = AssetDatabase.GUIDToAssetPath(guids[0]);
                    UnityEngine.Object asset = AssetDatabase.LoadAssetAtPath(path, selectedDataObjectType);

                    EditorUtility.FocusProjectWindow();
                    Selection.activeObject = asset;
                }
            }

            /// <summary> Checks when a new type has been selected. </summary>
            /// <param name="target"> Target of the new selection. </param>
            private void CheckForSelectedType(object target)
            {
                DataTypeSelected = true;
                ItemSelected = false;

                DrawRightColumnItems();
            }
            
            /// <summary> Checks when a new item has been selected. </summary>
            /// <param name="target"> Target of the new selection. </param>
            private void CheckForSelectedObject(object target)
            {
                ItemSelected = true;

                DrawSelectedItemInInspector();
            }
            
            /// <summary> Searchs the DataManagerWindow based on searchField.value. </summary>
            private void SearchDataManagerWindow()
            {
                Debug.Log(searchField.value);
                // Search code.
            }

            /// <summary> Called when the refreshDataManagerButton is pressed. </summary>
            private void RefreshDataManagerAction()
            {
                DataTypeSelected = false;
                ItemSelected = false;

                DataManagerDataTypeFinder.CheckForNewDataTypes();

                DrawLeftColumnItems();
                DrawRightColumnItems();
            }
        }
    }
}