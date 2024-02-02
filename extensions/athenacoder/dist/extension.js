/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
const child_process_1 = __webpack_require__(3);
// Improved generateCommand function with TypeScript typing
function generateCommand(context, commandType, processContent) {
    const extensionPath = context.extensionPath;
    const executablePath = path.join(extensionPath, 'resources', 'main', "main");
    const modelPath = path.join(extensionPath, 'resources', 'main', 'stable-code-3b.gguf');
    const logPath = path.join(extensionPath, 'resources'); // Note: logPath is defined but not used
    let command = '';
    if (commandType === "aicode") {
        command = `${executablePath} -m ${modelPath} --logdir /tmp -n -1 -p "generate a source code according the following description \n${processContent}"`;
    }
    else if (commandType === "aicomment") {
        command = `${executablePath} -m ${modelPath} --logdir /tmp -n -1 -p "generate a comment according the following code \n${processContent}"`;
    }
    return command;
}
function activate(context) {
    let outputChannel = vscode.window.createOutputChannel('AthenaCoder Output');
    // Registering a helloWorld command
    let disposable = vscode.commands.registerCommand('athenacoder.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from AthenaCoder!');
    });
    context.subscriptions.push(disposable);
    // Function to execute command and handle output
    const executeAndHandleCommand = (commandType) => {
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
        }
        else if (commandType === "aicomment") {
            let insertPosition = start;
        }
        const command = generateCommand(context, commandType, text);
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map