document.addEventListener('DOMContentLoaded', function() {
    const cifrasParaCriptografar = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };

    const cifrasParaDescriptografar = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };

    function criptografaTexto(texto) {
        return texto.replace(/[eioua]/g, match => cifrasParaCriptografar[match]);
    }

    function descriptografaTexto(texto) {
        return texto.replace(/enter|imes|ai|ober|ufat/g, match => cifrasParaDescriptografar[match]);
    }

    function validaTexto(texto) {
        const minusculas = texto === texto.toLowerCase();
        const semAcento = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === texto;
        const semCaracterEspecial = !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(texto);

        return minusculas && semAcento && semCaracterEspecial;
    }

    function exibirResultado(resultado) {
        const campoVazio = document.querySelector(".sem-retorno");
        const campoPreenchido = document.querySelector(".texto-criptografado");
        const paragrafo = document.querySelector(".texto-criptografado p");

        if (validaTexto(resultado)) {
            campoVazio.classList.add("d-none");
            campoPreenchido.classList.remove("d-none");
            paragrafo.textContent = resultado;
        } else {
            campoVazio.classList.remove("d-none");
            campoPreenchido.classList.add("d-none");

            if (!resultado.trim()) {
                paragrafo.textContent = "Digite um texto para criptografar ou descriptografar.";
            } else {
                alert("O texto deve conter apenas letras minúsculas, sem acentos e sem caracteres especiais.");
            }
        }
    }

    function copiarTexto() {
        const textoCopiado = document.querySelector(".texto-criptografado p").innerText;
        navigator.clipboard.writeText(textoCopiado).then(() => {
            alert("Texto copiado");
        });
    }

    document.querySelector("#criptografar").addEventListener("click", function(event) {
        event.preventDefault();
        const campoTexto = document.getElementById("texto-principal").value;
        const resultado = criptografaTexto(campoTexto);
        exibirResultado(resultado);
    });

    document.querySelector("#descriptografar").addEventListener("click", function(event) {
        event.preventDefault();
        const campoTexto = document.getElementById("texto-principal").value;
        const resultado = descriptografaTexto(campoTexto);
        exibirResultado(resultado);
    });

    document.querySelector("#copiar").addEventListener("click", copiarTexto);

    const textArea = document.querySelector("#texto-principal");

    textArea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});
