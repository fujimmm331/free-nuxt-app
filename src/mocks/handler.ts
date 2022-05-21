import { rest } from 'msw'
export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: [
          {
            name: 'name1',
            price: 1200,
            memo: 'memo',
            isNew: true,
            created_at: new Date
          }
        ],
      }),
    )
  }),
]