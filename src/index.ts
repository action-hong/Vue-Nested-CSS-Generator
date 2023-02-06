import * as vscode from 'vscode'

const command = 'vue-generate-nested-css.generate'

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.commands.registerCommand(
    command,
    () => vscode.window.showInformationMessage('Hello'),
  ))
}

export function deactivate() {

}
