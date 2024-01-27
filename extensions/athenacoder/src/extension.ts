// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/*
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "athenacoder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('athenacoder.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from AthenaCoder!');
	});

	context.subscriptions.push(disposable);
}
*/
export function activate(context: vscode.ExtensionContext) {
	let outputChannel = vscode.window.createOutputChannel('AthenaCoder Output');

	let disposable = vscode.commands.registerCommand('athenacoder.helloWorld', () => {
        const extensionPath = context.extensionPath;
        const executablePath = path.join(extensionPath, 'resources', 'main',"main");
        const modelPath = path.join(extensionPath, 'resources', 'main','stable-code-3b.gguf');

        const command = `${executablePath} -m ${modelPath} -n -1 -p "write a bubble sort in c"`;

        exec(command, (error, stdout, stderr) => {
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
