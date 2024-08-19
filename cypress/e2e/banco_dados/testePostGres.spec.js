
import { connectToDatabase, disconnectFromDatabase, insertData, executeSql, deleteData } from './commons/database/databaseOperations';

describe('Database Operations Test Example', () => {

    before(() => {
        connectToDatabase();
    });

    it('Example Test with Database', () => {
        // Inserir Dados
        const nome = 'Arnaldo Silva';
        const email = 'arnaldo@mail.com';
        const senha = '123';
        const sexo = 'M';
        const cpf = '11111111191';

        insertData(nome, email, senha, sexo, cpf);

        // Executar SQL para recuperar o ID inserido
        const selectQuery = 'SELECT id FROM PUBLIC.PESSOA ORDER BY id DESC LIMIT 1';
        executeSql(selectQuery).then(result => {
            const id = result[0].id;
            cy.log(`ID da pessoa inserida: ${id}`);

            // Excluir Dados usando o ID recuperado
            deleteData(id);
        });
    });

    after(() => {
        disconnectFromDatabase();
    });
});
