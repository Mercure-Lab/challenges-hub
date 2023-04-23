import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const MonacoEditor = forwardRef((_, ref) => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(undefined);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });

    const [editorWindowSize, setEditorWindowSize] = useState({
        size: 0
    });

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        if (windowSize.width >= 1920 && windowSize.height > 1080) {
            setEditorWindowSize({
                size: 550
            });
        } else {
            setEditorWindowSize({
                size: 350
            });
        }
    }, [windowSize.height, windowSize.width]);

    const defaultCode = `let func = (input) => {
    //votre code ici
    return 'votre expression'
}

module.exports = func
    `;

    useImperativeHandle(ref, () => ({
        getValue: () => editorRef.current?.getValue()
    }));

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
        editorRef.current = editor;
    }

    return (
        // 550
        <Editor
            height={editorWindowSize.size}
            defaultLanguage="javascript"
            defaultValue={defaultCode}
            theme="vs-dark"
            onMount={handleEditorDidMount}
        />
    );
});

MonacoEditor.displayName = 'MonacoEditor';

export default MonacoEditor;
