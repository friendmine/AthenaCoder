import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

// Improved generateCommand function with TypeScript typing
function generateCommand(context: vscode.ExtensionContext, commandType: string, processContent: string): string {
    const extensionPath = context.extensionPath;
    const executablePath = path.join(extensionPath, 'resources', 'main', "main");
    const modelPath = path.join(extensionPath, 'resources', 'main', 'stable-code-3b.gguf');
    const logPath = path.join(extensionPath, 'resources'); // Note: logPath is defined but not used

    let command = '';
    if (commandType === "aicode") {
        command = `${executablePath} -m ${modelPath} --logdir /tmp -n -1 -p "generate a source code according the following description \n${processContent}"`;
    } else if (commandType === "aicomment") {
        command = `${executablePath} -m ${modelPath} --logdir /tmp -n -1 -p "generate a comment according the following code \n${processContent}"`;
    }
    return command;
}

export function activate(context: vscode.ExtensionContext) {
    let outputChannel = vscode.window.createOutputChannel('AthenaCoder Output');

    // Registering a helloWorld command
    let disposable = vscode.commands.registerCommand('athenacoder.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from AthenaCoder!');
    });
    context.subscriptions.push(disposable);

    // Function to execute command and handle output
    const executeAndHandleCommand = (commandType: string) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor!');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!text || text.length < 1) {
            vscode.window.showInformationMessage('No text selected or text is too short.');
            return;
        }
        const start = new vscode.Position(selection.start.line, selection.start.character); // Identify the start position of the selection
        const end = new vscode.Position(selection.end.line, selection.end.character); // Identify the end position of the selection
        
        let insertPosition = start;
        if (commandType === "aicode") {
            let insertPosition = end;
        }else if(commandType === "aicomment") {
            let insertPosition = start;
        }

        const command = generateCommand(context, commandType, text);


        exec(command, (error, stdout, stderr) => {
            if (stdout) {
                
                editor.edit(editBuilder => {
                    editBuilder.insert(insertPosition, stdout);
                    //editBuilder.insert(editor.selection.active, stdout); // Inserting at the current selection position
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
            outputChannel.show(true);
        });
    };

    // Registering the aicode command
    disposable = vscode.commands.registerCommand('extension.aicode', () => executeAndHandleCommand("aicode"));
    context.subscriptions.push(disposable);

    // Registering the aicomment command
    disposable = vscode.commands.registerCommand('extension.aicomment', () => executeAndHandleCommand("aicomment"));
    context.subscriptions.push(disposable);
}

export function deactivate() {}
