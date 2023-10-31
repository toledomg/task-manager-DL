export const jwtConstants = {
  secret: 'curso_daniLeao_token',
};

export const RefreshJwtConstants = {
  secret: 'curso_daniLeao_refresh',
};

// Comando para Gerar key segura pelo terminal com node
// node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
