const request = require('supertest');
const app = require('./app'); // Seu arquivo principal da API

describe('API Tests', () => {
  it('should login successfully', async () => {
    const res = await request(app)
      .post('/login')
      .send({ nomeUsuario: 'usuario_teste', senhaUsuario: 'senha_correta' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Outros testes para as demais rotas...
});
