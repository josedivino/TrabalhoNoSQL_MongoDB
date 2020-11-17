const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
  .then(conn => global.conn = conn.db("lista_de_alunos"))
  .catch(err => console.log('erro ao conectar no banco Mongo', err))

const TAMANHO_PAGINA = 5;

function findAll(pagina) {
  const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
  return global.conn.collection("alunos")
    .find({}).
    skip(tamanhoSkip)
    .limit(TAMANHO_PAGINA)
    .toArray();
}

const ObjectId = require("mongodb").ObjectId;
function findOne(id, callback) {
  global.conn.collection("alunos").find(new ObjectId(id)).toArray(callback);
}

function insert(aluno, callback) {
  global.conn.collection("alunos").insertOne(aluno, callback);
}

function update(id, aluno, callback) {
  global.conn.collection("alunos").updateOne({ _id: new ObjectId(id) }, { $set: aluno }, callback);
}

function deleteOne(id, callback) {
  global.conn.collection("alunos").deleteOne({ _id: new ObjectId(id) }, callback);
}
//callback deve considerar erro e contagem
function countAll() {
  return global.conn.collection("alunos").countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }