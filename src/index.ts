import { compileTemplate } from '@vue/compiler-sfc'
import type { TemplateNode } from '@vue/compiler-core'
import * as vscode from 'vscode'
import { parseSFCTemplateBlock } from './util'

const command = 'vue-generate-nested-css.generate'

function generateCSS() {
  const editor = vscode.window.activeTextEditor
  if (!editor)
    return

  const source = editor.document.getText()

  const result = compileTemplate({
    source,
    compilerOptions: {
      hoistStatic: false,
    },
    filename: editor.document.fileName,
    id: editor.document.fileName,
  })

  const template = result.ast?.children.find(item => (item as any).tag === 'template')

  if (template) {
    const css = parseSFCTemplateBlock(template as TemplateNode).getCSS()
    vscode.window.showInformationMessage('生成内容已复制到粘贴板')
    // 复制到
    vscode.env.clipboard.writeText(css)
  }
}

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.commands.registerCommand(
    command,
    () => {
      generateCSS()
    },
  ))
}

export function deactivate() {

}
