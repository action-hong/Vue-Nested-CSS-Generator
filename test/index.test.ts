import fs from 'fs'
import { describe, expect, it } from 'vitest'
import { generateCSS } from '../src/util'

function read(name: string) {
  return fs.readFileSync(`./test/template/${name}.vue`, 'utf-8')
}

function css(name: string) {
  const source = read(name)
  const css = generateCSS({
    source,
    filename: name,
    id: name,
  })
  return css || ''
}

describe('should', () => {
  it('static', () => {
    expect(css('static')).toMatchSnapshot()
  })

  it('component', () => {
    expect(css('component')).toMatchSnapshot()
  })
})
