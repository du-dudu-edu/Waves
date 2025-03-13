document.addEventListener("DOMContentLoaded", function () {
    /** 🔹 Scroll suave para links internos */
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajuste para não colar no topo
                    behavior: 'smooth'
                });
            }
        });
    });

    /** 🔹 Exibir botão "Voltar ao Topo" ao rolar a página */
    const botaoTopo = document.getElementById("btnTopo");
    if (botaoTopo) {
        window.addEventListener("scroll", function () {
            botaoTopo.style.display = window.scrollY > 300 ? "block" : "none";
        });

        botaoTopo.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /** 🔹 Garante que todas as modais começam ocultas */
    const modais = [
        "caixaSabores", "modalCardapio", "modalCardapioCombo",
        "modalCardapioPetis", "modalCardapioBat", "modalCardapioCappu",
        "modalCardapioExp", "modalCardapioGel"
    ];

    modais.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "none";
    });
});

/** 🔹 Funções genéricas para abrir e fechar qualquer modal */
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
}

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

/** 🔹 Exibir sabores ao clicar em um lanche */
function mostrarSabores(lanche) {
    const titulo = document.getElementById("tituloLanche");
    const lista = document.getElementById("listaSabores");
    const modal = document.getElementById("caixaSabores");

    if (!titulo || !lista || !modal) {
        console.error("Elemento não encontrado no HTML!");
        return;
    }

    const sabores = {
        "Waves Max": ["Ovomaltine", "Sonho de Valsa", "Ouro Branco","Mini Oreo","Kit Kat","Prestigio","M&M","Bis"], 
        "Milk Shake": ["Morango", "Morango c/Nutella", "Ninho"," Ninho c/Nutella","Maracuja","Maracuja c/Nutella","Ovomaltine","Oreo","Nutella","Paçoca","Flocos","Açaí c/Nutella"],
        "Casquinhas":["Casquinha. . . . . . . . . . . . . . . .R$:7,50","Casquinha Recheada c/Nutella R$:7,50","Casquinha Trufada . . . . . . R$:6,50","Cascão . . . . . . . . . . . . . . . . . . . R$:7,50","Cascão Trufado . . . . . . . . . R$:10,50"],
        "Sundaes":["Chocolate. . . . . . . . . . . . . . . . . . . . R$:9,00","Morango. . . . . . . . . . . . . . . . . . . . .R$:9,00","Nutella. . . . . . . . . . . . . . . . . . . . . .R$:10,50","Oreo. . . . . . . . . . . . . . . . . . . . . . . . R$:10,50", "Caramelo. . . . . . . . . . . . . . . . . . . R$:10,50", "Calda Quente. . . . . . . . . . . . . . . R$;11,50"," Top Chocolate. . . . . . . . . . . . . .R$:13,50","Top Morango. . . . . . . . . . . . . . .R$13,50","Top Caramelo. . . . . . . . . . . . . .R$:15,50"," Top Nutella. . . . . . . . . . . . . . . . R$:15,50"],
        "Açaí":["180ml. . . . . . . . . . . . . . . . . . . . . . . .R$:8,99","300ml. . . . . . . . . . . . . . . . . . . . . . .R$:11,99","500ml. . . . . . . . . . . . . . . . . . . . . .  R$:15,99","700ml . . . . . . . . . . . . . . . . . . . . . .R$:17,99"],
        "Croassaint":["Queijo:. . . . . . . . . . . . . . . . . . . . . . .R$:9,00","Misto:. . . . . . . . . . . . . . . . . . . . . . . R$:9,00","Peito de Peru:. . . . . . . . . . . . . . . R$:9,00","Frango:. . . . . . . . . . . . . . . . . . . . . .R$:9,00"],
        "Bolos":["Bolo Kit Kat","Bolo Ferrero Rocher", "Bolo Ouro Branco"]
    };

    if (!sabores[lanche]) {
        console.error("Lanche não encontrado no menu!");
        return;
    }

    titulo.innerText = `Escolha o sabor do ${lanche}`;
    lista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    sabores[lanche].forEach(sabor => {
        let li = document.createElement("li");
        li.innerText = sabor;
        lista.appendChild(li);
    });

    abrirModal("caixaSabores");
}

let pedido = [];
let total = 0;
let lancheAtual = "";
let precoAtual = 0;

const adicionais = [
    { nome: "Bacon", preco: 2.00 },
    { nome: "Cheddar", preco: 2.50 },
    { nome: "Ovo", preco: 1.50 },
    { nome: "Molho Especial", preco: 1.00 }
];

function abrirPersonalizacao(nome, preco) {
    lancheAtual = nome;
    precoAtual = preco;
    
    document.getElementById("tituloLanche").innerText = `Personalizar ${nome}`;
    
    let opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";
    
    adicionais.forEach((item, index) => {
        opcoes.innerHTML += `
            <label>
                <input type="checkbox" value="${index}" data-preco="${item.preco}">
                ${item.nome} (+R$ ${item.preco.toFixed(2)})
            </label><br>
        `;
    });

    document.getElementById("modal").style.display = "flex";
}

function fecharPersonalizacao() {
    document.getElementById("modal").style.display = "none";
}

function adicionarAoPedido() {
    let adicionaisSelecionados = [];
    let inputs = document.querySelectorAll("#opcoes input:checked");
    let precoFinal = precoAtual;

    inputs.forEach(input => {
        let index = input.value;
        adicionaisSelecionados.push(adicionais[index].nome);
        precoFinal += adicionais[index].preco;
    });

    pedido.push({ nome: lancheAtual, preco: precoFinal, adicionais: adicionaisSelecionados });
    total += precoFinal;

    atualizarPedido();
    fecharPersonalizacao();
}

function atualizarPedido() {
    let listaPedido = document.getElementById("lista-pedido");
    let totalPedido = document.getElementById("total-pedido");

    listaPedido.innerHTML = "";
    pedido.forEach((item, index) => {
        let li = document.createElement("li");
        let adicionaisTexto = item.adicionais.length > 0 ? ` (Adicionais: ${item.adicionais.join(", ")})` : "";
        li.innerHTML = `${item.nome} ${adicionaisTexto} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerItem(${index})">❌</button>`;
        listaPedido.appendChild(li);
    });

    totalPedido.innerText = total.toFixed(2);
}

function removerItem(index) {
    total -= pedido[index].preco;
    pedido.splice(index, 1);
    atualizarPedido();
}

function finalizarPedido() {
    if (pedido.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Pedido:\n";
    pedido.forEach(item => {
        let adicionaisTexto = item.adicionais.length > 0 ? ` (Adicionais: ${item.adicionais.join(", ")})` : "";
        mensagem += `- ${item.nome}${adicionaisTexto} R$ ${item.preco.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    let numeroWhatsApp = "5522997302115"; // Substitua pelo número correto
    let link = `https://wa.me/${5522997302115}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}
