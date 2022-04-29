import { describe, expect, it } from 'vitest'
import { checkGame, diff, getTipFromResult } from '~/core'

describe('core', () => {
  it('diff', () => {
    expect(diff(
      '1+1=2',
      '2-1=1',
    )).toMatchSnapshot()

    const result = diff(
      '1+1=234',
      '1+1=147',
    )
    expect(result).toMatchSnapshot()

    expect(getTipFromResult([result])).toMatchSnapshot()
  })

  it('check answer', () => {
    expect(checkGame('1+1=2')).toMatchInlineSnapshot(`
      {
        "code": 0,
        "error": "",
      }
    `)
    expect(checkGame('1+1=3')).toMatchInlineSnapshot(`
      {
        "code": 2,
        "error": "表达式不正确",
      }
    `)
    expect(checkGame('1+2*3=7')).toMatchInlineSnapshot(`
      {
        "code": 0,
        "error": "",
      }
    `)
    expect(checkGame('5+2×3÷3=7')).toMatchInlineSnapshot(`
      {
        "code": 0,
        "error": "",
      }
    `)
  })
})
