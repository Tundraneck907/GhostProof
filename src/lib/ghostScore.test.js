import test from 'node:test'
import assert from 'node:assert/strict'
import { calcGhostScore } from './ghostScore.js'

test('all best inputs with no history', () => {
  assert.deepEqual(
    calcGhostScore({
      responseHours: 2,
      deposit: 'full',
      tone: 'clear',
      history: 'ontime',
      amount: 500,
      pastInvoiceCount: 0,
    }),
    {
      raw: 0,
      final: 48,
      band: 'Monitor',
      breakdown: { R: 0, D: 0, T: 0, H: 0, J: 0 },
    },
  )
})

test('all worst inputs with 10 past invoices', () => {
  assert.deepEqual(
    calcGhostScore({
      responseHours: 100,
      deposit: 'refused',
      tone: 'none',
      history: 'ghosted',
      amount: 20000,
      pastInvoiceCount: 10,
    }),
    {
      raw: 94,
      final: 83,
      band: 'High',
      breakdown: { R: 100, D: 100, T: 90, H: 100, J: 60 },
    },
  )
})

test('mid-case inputs with no history', () => {
  assert.deepEqual(
    calcGhostScore({
      responseHours: 24,
      deposit: 'half',
      tone: 'price',
      history: 'new',
      amount: 3000,
      pastInvoiceCount: 0,
    }),
    {
      raw: 43,
      final: 48,
      band: 'Monitor',
      breakdown: { R: 60, D: 30, T: 40, H: 50, J: 20 },
    },
  )
})
