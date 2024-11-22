from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import sqlite3

app = Flask(__name__)
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'your_secret_key'
Session(app)

def init_db():
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios
                      (id INTEGER PRIMARY KEY AUTOINCREMENT,
                       nome TEXT NOT NULL,
                       cpf TEXT UNIQUE,
                       celular TEXT UNIQUE NOT NULL,
                       email TEXT UNIQUE NOT NULL,
                       senha TEXT NOT NULL,
                       foto_perfil TEXT)''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS produtos
                      (id INTEGER PRIMARY KEY AUTOINCREMENT,
                       id_usuario INTEGER NOT NULL,
                       titulo TEXT NOT NULL,
                       descricao TEXT,
                       categoria TEXT,
                       preco REAL NOT NULL,
                       imagem TEXT,
                       FOREIGN KEY (id_usuario) REFERENCES usuarios (id))''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS favoritos (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      id_usuario INTEGER NOT NULL,
                      id_produto INTEGER NOT NULL,
                      FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
                      FOREIGN KEY (id_produto) REFERENCES produtos (id))''')
    
    conn.commit()
    conn.close()
  

@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    nomeUsuario = data.get('nomeUsuario')
    cpfUsuario = data.get('cpfUsuario')
    celularUsuario = data.get('celularUsuario')
    emailUsuario = data.get('emailUsuario')
    senhaUsuario = data.get('senhaUsuario')
    foto_perfil = data.get('profile_image')

    if not emailUsuario or not senhaUsuario:
        return jsonify({'message': 'Email e senha são obrigatórios'}), 400

    try:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO usuarios (nome, cpf, celular, email, senha, foto_perfil) VALUES (?, ?, ?, ?, ?, ?)', (nomeUsuario, cpfUsuario, celularUsuario, emailUsuario, senhaUsuario, foto_perfil))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Dados já cadastro!'}), 400
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    emailUsuario = data.get('emailUsuario')
    senhaUsuario = data.get('senhaUsuario')
    
    if not emailUsuario or not senhaUsuario:
        return jsonify({'message': 'Email e senha são obrigatórios'}), 400

    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', (emailUsuario, senhaUsuario))
    user = cursor.fetchone()
    conn.close()

    if user:
        session['user_id'] = user[0] 
        session['nome'] = user[1]     
        session['celular'] = user[3]
        return jsonify({'success': True, 'message': 'Login bem-sucedido!'}), 200
    else:
        return jsonify({'success': False, 'message': 'Credenciais inválidas'}), 401
        

@app.route('/is_logged_in', methods=['GET'])
def is_logged_in():
    if 'user_id' in session:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()
        cursor.execute('SELECT foto_perfil FROM usuarios WHERE id = ?', (session['user_id'],))
        foto_perfil_row = cursor.fetchone()
        foto_perfil = foto_perfil_row[0] if foto_perfil_row else None
        conn.close()
        return jsonify({
            'logged_in': True,
            'user': session['nome'],
            'celular': session['celular'],
            'foto_perfil': foto_perfil or ''
        }), 200
    else:
        return jsonify({'logged_in': False}), 200


@app.route('/atualizarusuario', methods=['POST'])
def atualizar_usuario():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não autenticado'}), 401

    data = request.get_json()
    id_usuario = session['user_id']
    campos = []

    if 'nome' in data:
        campos.append(('nome', data['nome']))
        session['nome'] = data['nome'] 
    if 'email' in data:
        campos.append(('email', data['email']))
    if 'cpf' in data:
        campos.append(('cpf', data['cpf']))
    if 'celular' in data:
        campos.append(('celular', data['celular']))
        session['celular'] = data['celular']  
    if 'senha' in data:
        campos.append(('senha', data['senha']))    
    if 'foto_perfil' in data:
        campos.append(('foto_perfil', data['foto_perfil']))

    if not campos:
        return jsonify({'message': 'Nenhuma informação foi modificada'}), 400

    try:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()

        for campo, valor in campos:
            cursor.execute(f'UPDATE usuarios SET {campo} = ? WHERE id = ?', (valor, id_usuario))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Informações atualizadas com sucesso!'}), 200
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Erro ao atualizar informações'}), 400


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  
    return jsonify({'message': 'Logout bem-sucedido!'}), 200


@app.route('/novoproduto', methods=['POST'])
def novoproduto():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não está logado'}), 401

    data = request.get_json()
    id_usuario = session['user_id']  
    titulo = data.get('titulo')
    descricao = data.get('descricao')
    categoria = data.get('categoria')
    preco = data.get('preco')
    imagem = data.get('imagem')

    if not titulo or not descricao or not categoria or not preco or not imagem:
        return jsonify({'message': 'Preencha todos os campos'}), 400

    try:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO produtos (id_usuario, titulo, descricao, categoria, preco, imagem) VALUES (?, ?, ?, ?, ?, ?)',
            (id_usuario, titulo, descricao, categoria, preco, imagem)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Produto cadastrado com sucesso!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Erro ao cadastrar!'}), 400


@app.route('/meusprodutos', methods=['GET'])
def listar_produtos():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não autenticado'}), 401
    
    id_usuario = session['user_id']
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, titulo, descricao, categoria, preco, imagem FROM produtos WHERE id_usuario = ?', (id_usuario,))
    produtos = cursor.fetchall()
    conn.close()

    produtos_list = []
    for produto in produtos:
        produtos_list.append({
            'id': produto[0],
            'titulo': produto[1],
            'descricao': produto[2],
            'categoria': produto[3],
            'preco': produto[4],
            'imagem': produto[5]
        })
    
    return jsonify(produtos_list), 200


@app.route('/meusprodutos/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM produtos WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Produto excluído com sucesso!'}), 200


@app.route('/todosprodutos', methods=['GET'])
def todos_produtos():
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, titulo, descricao, categoria, preco, imagem FROM produtos')
    produtos = cursor.fetchall()
    conn.close()

    produtos_list = []
    for produto in produtos:
        produtos_list.append({
            'id': produto[0],
            'titulo': produto[1],
            'descricao': produto[2],
            'categoria': produto[3],
            'preco': produto[4],
            'imagem': produto[5]
        })

    return jsonify(produtos_list), 200


@app.route('/produtos/<int:id>', methods=['GET'])
def get_produto(id):
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()

    
    cursor.execute('SELECT id, titulo, descricao, categoria, preco, imagem, id_usuario FROM produtos WHERE id = ?', (id,))
    produto = cursor.fetchone()

    if produto:        
        id_usuario = produto[6]
        cursor.execute('SELECT nome, foto_perfil, celular FROM usuarios WHERE id = ?', (id_usuario,))
        usuario = cursor.fetchone()

        nome_usuario = usuario[0] if usuario else 'Usuário não encontrado'
        foto_perfil = usuario[1] if usuario else 'Usuário não encontrado'
        celular = usuario[2] if usuario else 'Usuário não encontrado'

        return jsonify({
            'id': produto[0],
            'titulo': produto[1],
            'descricao': produto[2],
            'categoria': produto[3],
            'preco': produto[4],
            'imagem': produto[5],
            'id_usuario': id_usuario,
            'nome_usuario': nome_usuario,
            'foto_perfil': foto_perfil,
            'celular': celular
        }), 200
    else:
        conn.close()
        return jsonify({'message': 'Produto não encontrado'}), 404


@app.route('/adicionar_favorito', methods=['POST'])
def adicionar_favorito():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não autenticado'}), 401

    data = request.get_json()
    id_usuario = session['user_id']
    id_produto = data.get('id_produto')

    if not id_produto:
        return jsonify({'message': 'ID do produto é obrigatório'}), 400

    try:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO favoritos (id_usuario, id_produto) VALUES (?, ?)', (id_usuario, id_produto))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Produto adicionado aos favoritos!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Erro ao adicionar favorito!'}), 400
    

@app.route('/favoritos', methods=['DELETE'])
def remover_favorito():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não autenticado'}), 401

    data = request.get_json()
    id_usuario = session['user_id']
    id_produto = data.get('id_produto')

    try:
        conn = sqlite3.connect('banco.db')
        cursor = conn.cursor()
        cursor.execute(
            'DELETE FROM favoritos WHERE id_usuario = ? AND id_produto = ?',
            (id_usuario, id_produto)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Favorito removido com sucesso!'}), 200
    except Exception as e:
        return jsonify({'message': 'Erro ao remover favorito'}), 400


@app.route('/favoritos', methods=['GET'])
def listar_favoritos():
    if 'user_id' not in session:
        return jsonify({'message': 'Faça login para acessar os favoritos'}), 401

    id_usuario = session['user_id']
    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    cursor.execute('''SELECT produtos.id, produtos.titulo, produtos.descricao, produtos.categoria, produtos.preco, produtos.imagem 
                      FROM favoritos 
                      JOIN produtos ON favoritos.id_produto = produtos.id 
                      WHERE favoritos.id_usuario = ?''', (id_usuario,))
    favoritos = cursor.fetchall()
    conn.close()

    favoritos_list = [{'id': item[0], 'titulo': item[1], 'descricao': item[2], 'categoria': item[3], 'preco': item[4], 'imagem': item[5]} for item in favoritos]
    return jsonify(favoritos_list), 200


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '') 
    if not query:
        return jsonify({'message': 'Consulta não fornecida'}), 400

    conn = sqlite3.connect('banco.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT id, titulo, descricao, categoria, preco, imagem FROM produtos WHERE titulo LIKE ? OR descricao LIKE ?', (f'%{query}%', f'%{query}%'))
    produtos = cursor.fetchall()
    conn.close()

    produtos_list = []
    for produto in produtos:
        produtos_list.append({
            'id': produto[0],
            'titulo': produto[1],
            'descricao': produto[2],
            'categoria': produto[3],
            'preco': produto[4],
            'imagem': produto[5]
        })
    
    return jsonify(produtos_list), 200


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)