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
        "modalCardapioExp", "modalCardapioGel", "modal", "modalCardapioB", "modalTamanhos",
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

const adicionaisLista = {
    lanche: [{ nome: "Picanha", preco: 3.00 }],
    combo: [
        { nome: "Combo", preco: 12.00 },
    ],
 
    tamanhos: [
        { nome: "Pequeno (300ml)", preco: 0.00 },
        { nome: "Médio (500ml)", preco: 3.50 },
        { nome: "Grande (700ml)", preco: 5.50 }
    ],

    sorvete: [
        { nome: "Nutella", preco: 3.00 },
        { nome: "Ovomaltine", preco: 2.50 },
        { nome: "Chantilly", preco: 2.00 },
        { nome: "Granulado", preco: 1.50 }
    ],
    petisco: [{ nome: "Fritas", preco: 10.00 }],
    cappu: [
        { nome: "Borda de Nutella", preco: 3.00 },
        { nome: "Borda de Doce de Leite", preco: 3.00 },
        { nome: "Borda de Brigadeiro", preco: 3.00 }
    ],
    batata:[{ nome: "Batata P", preco: 0.00},
            { nome: "Batata G", preco: 4.00}  
    ],
    wavesmax: [
        { nome: "Ovomaltine", preco: 0.00 },
        { nome: "Sonho de Valsa", preco: 0.00 },
        { nome: "Ouro Branco", preco: 0.00 },
        { nome: "Mini Oreo", preco: 0.00 },
        { nome: "Kit Kat", preco: 0.00 },
        { nome: "Prestigio", preco: 0.00 },
        { nome: "M&M", preco: 0.00 },
        { nome: "Bis", preco: 0.00 }
    ], 
    açai:[ 
        {nome: "180ml", preco: 0.00},
        {nome: "300ml", preco: 3.00},
        {nome: "500ml", preco: 7.00},
        {nome: "700ml", preco: 9.00}  
    ],  
    sundae:[
        {nome: "Chocolate", preco: 0.00},
        {nome: "Morango", preco: 0.00},
        {nome: "Nutella", preco: 1.50},  
        {nome: "Oreo", preco: 1.50},
        {nome: "Caramelo", preco: 1.50},
        {nome: "Calda Quente", preco: 2.50},
        {nome: "Top Chocolate", preco: 4.50},
        {nome: "Top Morango", preco: 4.50},
        {nome: "Top Caramelo", preco: 6.50},
        {nome: "Top Nutella", preco: 6.50},
    ],  
    casquinha:[
        {nome: "Açaí", preco: 0.00},
        {nome: "Baunilha", preco: 0.00},
        {nome: "Açaí c/ Baunilha", preco: 0.00},
    ], 
    croassaint:[
        {nome: "Queijo", preco: 0.00},
        {nome: "Misto", preco: 0.00},
        {nome: "Peito de Peru", preco: 0.00},
        {nome: "Frango", preco: 0.00}
    ],
    bolo:[
        {nome: "Kit Kat", preco: 0.00},
        {nome: "Ferrero Rocher", preco: 0.00},
        {nome: "Ouro Branco", preco: 0.00},
    ],
    mate: [
        {nome: "Natural", preco:0.00},
        {nome: "Limão", preco:0.00},
        {nome: "Pêssego", preco:0.00},
    ],
    cha: [
        {nome: "Maça Verde", preco:0.00},
        {nome: "Limão Sicilliano", preco:0.00},
        {nome: "Cranberry", preco:0.00},
        {nome: "Tangerina", preco:0.00},
        {nome: "Morango ", preco:0.00},
        {nome: "Pêssego", preco:0.00}, 
    ],
    agua:[
        {nome: "S/Gás",preco: 0.00}, 
        {nome: "C/Gás",preco: 1.00}  
    ],
    refri:[
        {nome: "Lata",preco:0.00},
        {nome: "600ml",preco:3.00}
    ]

};

let pedido = [];
let total = 0;
let lancheAtual = "";
let precoAtual = 0;
let adicionais = [];
let tamanho

function abrirPersonalizacao(nome, preco, tipo) {
    lancheAtual = nome;
    precoAtual = preco;
    adicionais = adicionaisLista[tipo] || [];

    document.getElementById("tituloLanche").innerText = `Personalizar ${nome}`;
    
    let opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";
  
    let isSingleChoice = (adicionaisLista); // Apenas um pode ser selecionado
    
    adicionais.forEach((item, index) => {
        opcoes.innerHTML += `
            <label>
                <input type="${isSingleChoice ? 'radio' : 'checkbox'}" name="adicional-${tipo}" value="${index}" data-preco="${item.preco}">
                ${item.nome} (+R$ ${item.preco.toFixed(2)})
            </label><br>
        `;
    });

    abrirModal("modal");
}



function fecharPersonalizacao() {
    fecharModal("modal");
}

function adicionarAoPedido() {
    let adicionaisSelecionados = [];
    let precoFinal = precoAtual;

    document.querySelectorAll("#opcoes input:checked").forEach(input => {
        let index = parseInt(input.value);
        if (index >= 0 && index < adicionais.length) {
            adicionaisSelecionados.push(adicionais[index].nome);
            precoFinal += adicionais[index].preco;
        }
    });

    pedido.push({ nome: lancheAtual, preco: precoFinal, adicionais: adicionaisSelecionados });
    total += precoFinal;

    salvarPedidoNoLocalStorage();
    atualizarPedido();
    fecharPersonalizacao();
}

function salvarPedidoNoLocalStorage() {
    localStorage.setItem("pedido", JSON.stringify(pedido));
    localStorage.setItem("total", total);
}

/** 🔹 Carregar pedido do localStorage */
function carregarPedidoDoLocalStorage() {
    let pedidoSalvo = localStorage.getItem("pedido");
    let totalSalvo = localStorage.getItem("total");

    if (pedidoSalvo) {
        pedido = JSON.parse(pedidoSalvo);
        total = parseFloat(totalSalvo);
        atualizarPedido();
    }
}
function atualizarPedido() {
    let listaPedido = document.getElementById("lista-pedido");
    let totalPedido = document.getElementById("total-pedido");

    if (!listaPedido || !totalPedido) {
        console.error("Elementos do carrinho não encontrados!");
        return;
    }

    listaPedido.innerHTML = "";
    pedido.forEach((item, index) => {
        let adicionaisTexto = item.adicionais.length > 0 ? `(Adicionais: ${item.adicionais.join(", ")})` : "";
        listaPedido.innerHTML += `
            <li>${item.nome} ${adicionaisTexto} - R$ ${item.preco.toFixed(2)}
                <button onclick="removerItem(${index})">❌</button>
            </li>`;
    });

    totalPedido.innerText = total.toFixed(2);
    salvarPedidoNoLocalStorage();
}

/** 🔹 Remover item do pedido */
function removerItem(index) {
    if (index >= 0 && index < pedido.length) {
        total -= pedido[index].preco;
        pedido.splice(index, 1);
        atualizarPedido();
    }
}

/** 🔹 Finalizar pedido via WhatsApp */
function finalizarPedido() {
    if (pedido.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = pedido.map(item => `- ${item.nome} (${item.adicionais.join(", ")}) R$ ${item.preco.toFixed(2)}`).join("\n");
    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    let numeroWhatsApp = "5522997302115";
    let link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    if (mensagem.length > 1000) {
        alert("O pedido é muito grande! Será enviado em partes.");
        let partes = mensagem.match(/.{1,900}/g);
        partes.forEach((parte, i) => {
            setTimeout(() => {
                let linkParcial = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(parte)}`;
                window.open(linkParcial, "_blank");
            }, i * 1000);
        });
    } else {
        window.open(link, "_blank");
    }
}

/** 🔹 Alternar exibição do carrinho */
function toggleCarrinho() {
    let carrinho = document.getElementById("carrinho-modal");
    if (carrinho) {
        carrinho.style.display = carrinho.style.display === "block" ? "none" : "block";
    }
}
