import * as vscode from 'vscode'
import { generateCSS } from './util'

const command = 'vue-generate-nested-css.generate'

const openingTag = 'vgns.openingTag'
const closingTag = 'vgns.closingTag'
const includeTag = 'vgns.includeTag'

function generateCSSFromActiveTextEditor() {
  const editor = vscode.window.activeTextEditor
  if (!editor)
    return

  const source = editor.document.getText()

  const config = vscode.workspace.getConfiguration()
  const option = {
    includeTag: config.get(includeTag) as boolean,
    openingTag: config.get(openingTag) as string,
    closingTag: config.get(closingTag) as string,
  }

  const css = generateCSS({
    source,
    id: editor.document.fileName,
    filename: editor.document.fileName,
  }, option)

  if (css) {
    vscode.window.showInformationMessage('生成内容已复制到粘贴板')
    // 复制到
    vscode.env.clipboard.writeText(css)
  }
}

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.commands.registerCommand(
    command,
    () => {
      generateCSSFromActiveTextEditor()
    },
  ))
}

export function deactivate() {

}
