import { rest } from 'msw'
export const handlers = [
  rest.get('https://sample.com/api/v1/users/:id', (req, res, ctx) => {
    return res(
      // ctx.status(422),
      ctx.json({
        resources: {
          data: {
            id: 1,
            email: 'info@example.com',
            name: '勅使河原優',
            sex: 3,
          }
        }
      }),
    )
  }),
]