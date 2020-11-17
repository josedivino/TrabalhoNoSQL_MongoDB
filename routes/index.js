var express = require('express');
var router = express.Router();

router.get('/edit/:id', function (req, res) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
    if (e) { return console.log(e); }
    res.render('new', { title: 'Edição de Aluno', doc: docs[0], action: '/edit/' + docs[0]._id });
  });
})

router.post('/edit/:id', function (req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var curso = req.body.curso;
  var periodo = req.body.periodo;
  var faculdade = req.body.faculdade;
  var estado = req.body.estado;
  var cidade = req.body.cidade;
  global.db.update(id, { nome, telefone, curso, periodo, faculdade, estado, cidade }, (e, result) => {
    if (e) { return console.log(e); }
    res.redirect('/');
  });
});

router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: { "nome": "", "telefone": "", "curso": "", "periodo": "", "faculdade": "", "estado": "", "cidade": "" }, action: '/new' });
});

router.post('/new', function (req, res) {
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var curso = req.body.curso;
  var periodo = req.body.periodo;
  var faculdade = req.body.faculdade;
  var estado = req.body.estado;
  var cidade = req.body.cidade;
  global.db.insert({ nome, telefone, curso, periodo, faculdade, estado, cidade }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  })
})

router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, result) => {
    if (e) { return console.log(e); }
    res.redirect('/');
  });
});

/* GET home page. */
router.get('/:pagina?', async function (req, res) {
  const pagina = parseInt(req.params.pagina || "1");
  const docs = await global.db.findAll(pagina);
  const count = await global.db.countAll();
  const qtdPaginas = Math.ceil(count / global.db.TAMANHO_PAGINA);
  res.render('index', { title: 'Lista de Alunos', docs, count, qtdPaginas, pagina });
})

module.exports = router;
