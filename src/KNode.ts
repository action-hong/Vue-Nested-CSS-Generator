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
    const inner = `${this.children.map(i => i.getCSS(includeTag || this.clazz ? depth + 1 : depth, includeTag)).join('\n')}`

    if (!includeTag && !this.clazz) {
      return inner
    }
    else {
      const space = ' '.repeat(2 * depth)
      const selector = `${space}${this.tag}${this.clazz}`
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
