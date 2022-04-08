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
    expect(checkGame('1+1=2')).toBe(true)
    expect(checkGame('1+1=3')).toBe(false)
    expect(checkGame('1+2*3=7')).toBe(true)
    expect(checkGame('5+2×3÷3=7')).toBe(true)
  })
})
