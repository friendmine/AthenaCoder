// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	let outputChannel = vscode.window.createOutputChannel('AthenaCoder Output');

	let disposable = vscode.commands.registerCommand('athenacoder.helloWorld', () => {
        const extensionPath = context.extensionPath;
        const executablePath = path.join(extensionPath, 'resources', 'main',"main");
        const modelPath = path.join(extensionPath, 'resources', 'main','stable-code-3b.gguf');
        const logPath = path.join(extensionPath, 'resources');

        const command = `${executablePath} -m ${modelPath} --logdir /tmp  -n -1 -p "write a bubble sort in c"`;

        exec(command, (error, stdout, stderr) => {
            if(stdout){
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showInformationMessage('No active editor!');
                    return; // No open text editor
                }
                const position = editor.selection.active; // Current cursor position

                editor.edit(editBuilder => {
                    editBuilder.insert(position, stdout); // Insert text at current cursor position
                });
            }
            if (error) {
                outputChannel.appendLine(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                outputChannel.appendLine(`Stderr: ${stderr}`);
                return;
            }
            outputChannel.appendLine(`Output: ${stdout}`);
            outputChannel.show(true); // This brings the output channel into focus
        });
    });
  
	context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.myContextMenuCommand', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Your code here. For example, manipulate the editor's text.
            vscode.window.showInformationMessage('Context menu command executed!');
        }
    });

    context.subscriptions.push(disposable);
  }

// This method is called when your extension is deactivated
export function deactivate() {}
