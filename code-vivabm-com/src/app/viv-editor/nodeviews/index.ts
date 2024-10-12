import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { CodeMirrorView } from 'prosemirror-codemirror-6';
import { javascript } from '@codemirror/lang-javascript';
import { minimalSetup } from 'codemirror';

const nodeViews = {

    code_mirror: (node: ProseMirrorNode, view: EditorView, getPos: () => number): CodeMirrorView => {
        return new CodeMirrorView({
            node,
            view,
            getPos,
            cmOptions: {
                extensions: [
                    minimalSetup,
                    javascript(),
                ],
            },
        });
    },
};

export default nodeViews;
