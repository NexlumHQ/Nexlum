import { describe, it, expect } from 'vitest'
import { formatNumber, formatPercent, formatDuration } from '../../src/utils/format'

describe('formatNumber', () => {
  it('should format billions', () => {
    expect(formatNumber(1_500_000_000)).toBe('1.50B')
  })
  it('should format millions', () => {
    expect(formatNumber(2_400_000)).toBe('2.40M')
  })
  it('should format thousands', () => {
    expect(formatNumber(42_000)).toBe('42.00K')
  })
  it('should format small numbers', () => {
    expect(formatNumber(99.5)).toBe('99.50')
  })
})

describe('formatPercent', () => {
  it('should show + for positive', () => {
    expect(formatPercent(5.23)).toBe('+5.23%')
  })
  it('should show - for negative', () => {
    expect(formatPercent(-2.1)).toBe('-2.10%')
  })
})

describe('formatDuration', () => {
  it('should format seconds', () => {
    expect(formatDuration(45)).toBe('45s')
  })
  it('should format minutes', () => {
    expect(formatDuration(120)).toBe('2m')
  })
  it('should format hours', () => {
    expect(formatDuration(7200)).toBe('2h')
  })
  it('should format days', () => {
    expect(formatDuration(86400 * 3)).toBe('3d')
  })
})
