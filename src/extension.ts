/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as openai from './openai';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.buddy', async () => {
        var buddyConfig = vscode.workspace.getConfiguration('buddy');
        var openapiApiKey: string | undefined = buddyConfig.get('openapi_api_key');
        if (!openapiApiKey) {
            return vscode.window.showErrorMessage("OpenAPI API Key can not be empty. Please, provide your API key in this extension's configuration");
        }

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showErrorMessage('No active editor');
		}

		// Get the current document
		const document = editor.document;
		if (!document) {
			return vscode.window.showErrorMessage('No active document');
		}
		
        // // Prompt user for input
        // const input = await vscode.window.showInputBox();

		const generatedText = await openai.aiResponse(openapiApiKey, document.getText());
		console.log(document);
		// Replace the entire contents of the document
        editor.edit((builder) => {
            builder.replace(new vscode.Range(0, 0, document.lineCount, 0), generatedText);
        }).then(() => {
            console.log('File replaced successfully!');
        }, (error) => {
            console.error(error);
        });
        // Create a new editor with the generated text
        // const newEditor = await vscode.workspace.openTextDocument({ content: generatedText });
        // vscode.window.showTextDocument(newEditor);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}



// import * as vscode from 'vscode';
// import * as openai from './openai';

// export function activate(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('extension.openai', async () => {
//         // Get the active text editor
//         const editor = vscode.window.activeTextEditor;
//         if (!editor) {
//             return vscode.window.showErrorMessage('No active editor');
//         }

//         // Get the current document
//         const document = editor.document;
//         if (!document) {
//             return vscode.window.showErrorMessage('No active document');
//         }

//         // Prepare the prompt for the OpenAI API
//         let prompt = "";
//         for (let i = 0; i < document.lineCount; i++) {
//             prompt += document.lineAt(i).text + "\n";
			
//         }
//         prompt += "\n\n";
// 		console.log(prompt);
// 		const generatedText = await openai.aiResponse(`${prompt} # Add documentation`);
//         // Extract the generated comments from the API response
//         let generatedComments = generatedText;
//         generatedComments = generatedComments.split("\n");

//         // Add the generated comments as line comments
//         editor.edit((editBuilder) => {
//             for (let i = 0; i < document.lineCount; i++) {
//                 const line = document.lineAt(i);
//                 editBuilder.insert(line.range.end, " // " + generatedComments[i]);
//             }
//         });
//     });

//     context.subscriptions.push(disposable);
// }

// export function deactivate() {}