import { rest } from 'msw'
export const handlers = [
  rest.get('https://sample.com/api/v1/products', (req, res, ctx) => {
    return res(
      ctx.status(422),
      // ctx.json({
      //   products: [
      //     {
      //       name: 'name1',
      //       price: 1200,
      //       memo: 'memo',
      //       isNew: true,
      //       created_at: new Date
      //     }
      //   ],
      // }),
    )
  }),
]