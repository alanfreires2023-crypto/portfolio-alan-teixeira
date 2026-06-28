/* ====================================================================
   Portfólio Pessoal — Alan Teixeira Freires
   JavaScript puro (sem jQuery / frameworks).
   ==================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. MENU RESPONSIVO ---------- */
  var navToggle = document.getElementById("navToggle");
  var menu = document.getElementById("menuPrincipal");

  navToggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  var menuLinks = menu.querySelectorAll(".menu__link");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 2. TEMA CLARO / ESCURO ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var themeIcon = themeToggle.querySelector(".theme-toggle__icon");
  var themeLabel = themeToggle.querySelector(".theme-toggle__label");

  function aplicarTema(tema) {
    if (tema === "escuro") {
      document.documentElement.setAttribute("data-theme", "escuro");
      themeIcon.textContent = "☾";
      themeLabel.textContent = "tema escuro";
      themeToggle.setAttribute("aria-pressed", "false");
    } else {
      document.documentElement.setAttribute("data-theme", "claro");
      themeIcon.textContent = "☀";
      themeLabel.textContent = "tema claro";
      themeToggle.setAttribute("aria-pressed", "true");
    }
  }

  // Define o estado inicial (começa escuro/Claro) com base no tema atual do sistema ou preferências do usuário
  var temaAtual = "escuro"; 
  themeToggle.addEventListener("click", function () {
    temaAtual = temaAtual === "claro" ? "escuro" : "claro";
    aplicarTema(temaAtual);
  });

  /* ---------- 3. FORMULÁRIO DE CONTATO ---------- */
  var form = document.getElementById("formContato");
  var campoNome = document.getElementById("nome");
  var campoEmail = document.getElementById("email");
  var campoMensagem = document.getElementById("mensagem");
  var terminalOutput = document.getElementById("terminalOutput");

  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function mostrarErro(campo, idErro, mensagem) {
    var spanErro = document.getElementById(idErro);
    spanErro.textContent = mensagem;
    campo.closest(".field").classList.add("field--invalid");
  }

  function limparErro(campo, idErro) {
    document.getElementById(idErro).textContent = "";
    campo.closest(".field").classList.remove("field--invalid");
  }

  function validarFormulario() {
    var valido = true;

    if (campoNome.value.trim() === "") {
      mostrarErro(campoNome, "erroNome", "Por favor, informe seu nome.");
      valido = false;
    } else {
      limparErro(campoNome, "erroNome");
    }

    if (campoEmail.value.trim() === "") {
      mostrarErro(campoEmail, "erroEmail", "Por favor, informe seu e-mail.");
      valido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, "erroEmail", "E-mail inválido.");
      valido = false;
    } else {
      limparErro(campoEmail, "erroEmail");
    }

    if (campoMensagem.value.trim() === "") {
      mostrarErro(campoMensagem, "erroMensagem", "Escreva uma mensagem.");
      valido = false;
    } else {
      limparErro(campoMensagem, "erroMensagem");
    }

    return valido;
  }

  function escreverNoTerminal(linhas, comoErro) {
    terminalOutput.textContent = linhas.join("\n");
    terminalOutput.classList.toggle("is-error", Boolean(comoErro));
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
      escreverNoTerminal(["$ enviar contato.sh", "✗ erro: verifique os campos."], true);
      return;
    }

    escreverNoTerminal([
      "$ enviar contato.sh",
      "> validando... ok",
      "> enviando mensagem...",
      "✓ Enviado com sucesso!"
    ], false);

    form.reset();
  });

  /* ---------- 4. ANO ATUAL NO RODAPÉ ---------- */
  document.getElementById("anoAtual").textContent = new Date().getFullYear();

});