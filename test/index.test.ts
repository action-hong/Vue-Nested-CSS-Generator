import fs from 'fs'
import { describe, expect, it } from 'vitest'
import { generateCSS } from '../src/util'

function read(name: string) {
  return fs.readFileSync(`./test/template/${name}.vue`, 'utf-8')
}

function css(name: string, flag = false) {
  const source = read(name)
  const css = generateCSS({
    source,
    filename: name,
    id: name,
  }, {
    includeTag: flag,
  })
  return css || ''
}

describe('should', () => {
  // it('static', () => {
  //   expect(css('static')).toMatchSnapshot()
  //   expect(css('static', true)).toMatchSnapshot()
  // })

  // it('component', () => {
  //   expect(css('component')).toMatchSnapshot()
  //   expect(css('component', true)).toMatchSnapshot()
  // })

  it('complex', () => {
    expect(css('complex')).toMatchSnapshot()
    expect(css('complex', true)).toMatchSnapshot()
  })
})
