import * as vscode from 'vscode'; 

export function activate(context: vscode.ExtensionContext) {

	var disposable = vscode.commands.registerCommand('extension.prettyJson', () => {
		var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);
        try {
            var json = JSON.stringify(eval("(function(){return "+text+"})()"), null, 2);
            editor.edit((edit) => {
                edit.replace(selection, json)
            })
        }
        catch(e) {
            vscode.window.showErrorMessage("Couldnt parse JSON due to "+e.message)
        }
	});
	
	context.subscriptions.push(disposable);
}

export function deactivate() {
}