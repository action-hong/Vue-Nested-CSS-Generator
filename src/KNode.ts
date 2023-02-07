export class KNode {
  tag: string
  clazz: string
  children: KNode[]
  constructor(tag: string, clazz: string) {
    this.tag = tag
    this.clazz = clazz
    this.children = []
  }

  addKNode(kNode: KNode) {
    this.children.push(kNode)
  }

  getCSS(depth = 0, includeTag = false): string {
    // 当前节点可以生成一个选择器
    const flag = this.tag && (includeTag || this.clazz)

    const inner = `${this.children.map(i => i.getCSS(flag ? depth + 1 : depth, includeTag)).join('\n')}`

    if (!flag) {
      return inner
    }
    else {
      const space = ' '.repeat(2 * depth)
      const selector = `${space}${includeTag ? this.tag : ''}${this.clazz}`
      return `${selector} {

${inner}
${space}}`
    }
  }

  isSame(kNode: KNode) {
    if (this.tag !== kNode.tag)
      return false
    if (this.clazz !== kNode.clazz)
      return false
    if (this.children.length !== kNode.children.length)
      return false
    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].isSame(kNode.children[i]))
        return false
    }

    return true
  }
}
