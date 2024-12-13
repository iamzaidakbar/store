import { describe, expect, it } from '@jest/globals'
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/products/route'

describe('Products API', () => {
  it('should create a new product', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        images: ['test.jpg'],
        category: 'Electronics',
        stock: 10
      }
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data.name).toBe('Test Product')
  })

  it('should get all products', async () => {
    const { req } = createMocks({
      method: 'GET',
      url: '/api/products'
    })

    const response = await GET(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })
}) 