## 🛠 Especificações Técnicas

- **Node.js**: Versão 20 ou superior.
- **Banco de Dados**: Mongo 7+.
- **ORM**: Mongoose
- **Linguagem**: Typescript.
- **Comunicação com MongoDB**: Deve ser feita via container.

## 🔍 Funcionalidades

### Usuários

- **CRUD** completo para usuários.
- Cada usuário deve ter nome, email, endereço e coordenadas.
- Na criação, o usuário pode fornecer endereço ou coordenadas. Haverá erro caso forneça ambos ou nenhum.
- Uso de serviço de geolocalização para resolver endereço ↔ coordenadas.
- Atualização de endereço ou coordenadas deve seguir a mesma lógica.

### Regiões

- **CRUD** completo para regiões.
- Cada região tem um nome, coordenadas e um usuário que será o dono da região.
- Listar regiões contendo um ponto específico.

## 🚀 Rotas

### Usuários

**POST** `/users/`  
Cria um novo usuário.

**GET** `/users/`  
Retorna todos os usuários.

**GET** `/users/:id`  
Retorna um usuário específico com o ID fornecido.

**PUT** `/users/:id`  
Atualiza um usuário específico com o ID fornecido.

**DELETE** `/users/:id`  
Exclui um usuário específico com o ID fornecido.

### Regiões

**POST** `/regions/`  
Cria uma nova região.

**GET** `/regions/`  
Retorna todas as regiões.

**GET** `/regions/:id`  
Retorna uma região específica com o ID fornecido.

**PUT** `/regions/:id`  
Atualiza uma região específica com o ID fornecido.

**DELETE** `/regions/:id`  
Exclui uma região específica com o ID fornecido.

**GET** `/regions/coordinates`  
Retorna regiões com base em coordenadas fornecidas.
