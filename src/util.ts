import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { AttributeNode, DirectiveNode, TemplateNode } from '@vue/compiler-core'
import { compileTemplate } from '@vue/compiler-sfc'

import { KNode } from './KNode'

type ElementNode = SFCTemplateBlock['ast']

export interface GenerateCSSOption {
  includeTag: boolean
  openingTag: string
  closingTag: string
}

interface FileOption {
  source: string
  id: string
  filename: string
}

export function parseSFCTemplateBlock(node: SFCTemplateBlock['ast']) {
  const kNode = new KNode('', '')
  walk(node, kNode)
  return kNode
}

export function isAttributeNode(node: AttributeNode | DirectiveNode): node is AttributeNode {
  return !!(node as AttributeNode).value
}

function walk(node: SFCTemplateBlock['ast'], parentKNode: KNode, depth = 0) {
  if (node.tag && node.tagType === 0) {
    const clazz = node.props.find(item => item.name === 'class')
    const tag = node.tag
    let clz = ''
    if (clazz && isAttributeNode(clazz)) {
      const content = clazz.value?.content.trim()
      if (content)
        clz = `.${content.replace(/\s/g, '.')}`
    }
    const t = new KNode(tag === 'template' ? '' : tag, clz)
    parentKNode.addKNode(t)
    parentKNode = t
  }
  if (node.children)
    node.children.forEach(n => walk(n as ElementNode, parentKNode, depth + 1))

  // 查看node.children下是否有重复的
  let i = parentKNode.children.length - 1
  while (i > 0) {
    const index = parentKNode.children.findIndex(item => item.isSame(parentKNode.children[i]))
    if (index !== -1 && index !== i) {
      // 有不同的
      parentKNode.children.splice(i, 1)
    }
    i--
  }
}

export function generateCSS(fileOption: FileOption, option: GenerateCSSOption = {
  closingTag: '</style>',
  openingTag: '<style lang="scss" scoped>',
  includeTag: false,
}) {
  const template = transformSourceToTemplate(fileOption)

  if (template) {
    let css = parseSFCTemplateBlock(template as TemplateNode)
      .getCSS(0, option.includeTag)
    css = `${option.openingTag}
${css}
${option.closingTag}`

    return css
  }
}

function transformSourceToTemplate(fileOption: FileOption) {
  const result = compileTemplate({
    ...fileOption,
    compilerOptions: {
      hoistStatic: false,
    },
  })

  const template = result.ast?.children.find(item => (item as any).tag === 'template')

  return template
}
