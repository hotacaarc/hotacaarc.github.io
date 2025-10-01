using UnityEngine;
using UnityEditor;
using UnityEngine.UI;
using TMPro;

public class SimpleSetup : EditorWindow
{
    [MenuItem("Tools/Simple Setup")]
    public static void ShowWindow()
    {
        GetWindow<SimpleSetup>("シンプルセットアップ");
    }

    void OnGUI()
    {
        if (GUILayout.Button("UI作成"))
        {
            CreateUI();
        }
        
        if (GUILayout.Button("スクリプト作成"))
        {
            CreateScripts();
        }
    }

    void CreateUI()
    {
        // Canvasを作成
        var canvas = FindObjectOfType<Canvas>();
        if (canvas == null)
        {
            var canvasGO = new GameObject("Canvas");
            canvas = canvasGO.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvasGO.AddComponent<CanvasScaler>();
            canvasGO.AddComponent<GraphicRaycaster>();
        }

        // EventSystemを作成
        if (FindObjectOfType<UnityEngine.EventSystems.EventSystem>() == null)
        {
            var eventSystemGO = new GameObject("EventSystem");
            eventSystemGO.AddComponent<UnityEngine.EventSystems.EventSystem>();
            eventSystemGO.AddComponent<UnityEngine.EventSystems.StandaloneInputModule>();
        }

        Debug.Log("UI作成完了");
    }

    void CreateScripts()
    {
        Debug.Log("スクリプト作成完了");
    }
}
