document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajusta para não colar no topo
                    behavior: 'smooth' // Rola suavemente
                });
            }
        });
    });


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajusta para não colar no topo
                    behavior: 'smooth' // Rola suavemente
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const botaoTopo = document.getElementById("btnTopo");

    // Exibir o botão ao descer a página
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Mostra o botão após rolar 300px
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }
    });

    // Rolar suavemente para o topo ao clicar
    botaoTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("caixaSabores");

    // Garante que o modal está oculto ao carregar a página
    if (modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
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
           "Sundaes":["Chocolate. . . . . . . . . . . . . . . . . . . . R$:9,00","Morango. . . . . . . . . . . . . . . . . . . . .R$:9,00","Nutella. . . . . . . . . . . . . . . . . . . . . .R$:10,50","Oreo. . . . . . . . . . . . . . . . . . . . . . . . R$:10,50", "Caramelo. . . . . . . . . . . . . . . . . . . R$:10,50", "Calda Quente. . . . . . . . . . . . . . . R$;11,50"],
           "Top Sundaes":["Chocolate. . . . . . . . . . . . . . . . . . .R$:13,50","Morango. . . . . . . . . . . . . . . . . . . .R$13,50","Caramelo. . . . . . . . . . . . . . . . . . .R$:15,50","Nutella. . . . . . . . . . . . . . . . . . . . . R$:15,50"],
           "Açaí":["180ml. . . . . . . . . . . . . . . . . . . . . . . .R$:8,99","300ml. . . . . . . . . . . . . . . . . . . . . . .R$:11,99","500ml. . . . . . . . . . . . . . . . . . . . . .  R$:15,99","700ml . . . . . . . . . . . . . . . . . . . . . .R$:17,99"],
           "Petisco de Calabresa":["Padrão:. . . . . . . . . . . . . . . . . . . . R$:29,00","Calabresa c/Fritas:. . . . . . . . .R$:39,00"],
           "Petisco de Pernil":["Padrão:. . . . . . . . . . . . . . . . . . . . . R$:39,00","Pernil c/Fritas:. . . . . . . . . . . . . R$:49,00"],
           "Petisco de Alcatra":["Padrão:. . . . . . . . . . . .  . . . . . . . . . R$:49,00","Alcatra c/Fritas:. . . . . . . . . . . . R$:59,00"],
           "Expresso":["Expresso 35ml:. . . . . . . . . . . . . . .R$:5,99","Expresso longo:. . . . . . . . . . . . . .R$:5,99","Expresso Duplo 100ml:. . . . . . R$:8,99","Expresso Carioca 50ml. . . . . . R$4,99","Machiatto 60ml. . . . . . . . . . . . . .R$:7,99"],
           "Cappuccino":["Cappuccino Tradicional:. . . R$:14,99","Cappuccino Italiano:. . . . . . .R$:12,99","Cappuccino de Nutella:. . . . .R$:17,99"," Cappuccino Nutella c/Brigadeiro: R$:18,99","Chocotela:. . . . . . . . . . . . . . . . . .R$:16,00"],
           "Café Gelado":["Iced Caramel:. . . . . . . . . . . . . . .R$:14,99","Mocaccino Gelado:. . . . . . . . .R$:14,99","Affogato:. . . . . . . . . . . . . . . . . . . R$:15,00","Iced Latte:. . . . . . . . . . . . . . . . . .R$:12,99"],
           "Batata":["Batata P:. . . . . . . . . . . . . . . . . . . . .R$:8,00","Batata G:. . . . . . . . . . . . . . . . . . . R$:12,00","Batata Waves:. . . . . . . . . . . . . R$:38,00","Batata Maluca:. . . . . . . . . . . . R$:33,00"],
           "Waves Burguer":["Pão,carne,alface e maionese"," Carne ou frango:. . . . . . . . . . . .R$:13,99","Picanha:. . . . . . . . . . . . . . . . . . . . R$:16,99"],
           "X-Burguer":["Pão, carne, queijo, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$15,50","Picanha:. . . . . . . . . . . . . . . . . . . . R$:18,50"],
           "X-Bacon":["Pão, carne, bacon, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$17,50","Picanha:. . . . . . . . . . . . . . . . . . . . R$:20,50"],
           "X-Calabresa":["Pão, carne, calabresa, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$17,50","Picanha:. . . . . . . . . . . . . . . . . . . . R$:20,50"],
           "X-Egg":["Pão, carne, ovo, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$19,99","Picanha:. . . . . . . . . . . . . . . . . . . .R$:22,99"],
           "Cheddar Prime":["Pão,carne picanha 120g,cheddar cremoso e cebola caramelizada","Picanha:. . . . . . . . . . . . . . . . . . . . R$:19,50"],
           "X-tudo":["Pão, carne, queijo, ovo, bacon, calabresa, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$26,50"],
           "Duplo X-Burguer":["Pão,2 carnes,2 queijos, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$25,50","Picanha:. . . . . . . . . . . . . . . . . . . . R$:28,50"],
           "Waves Montanha":["2 Pães, 2 carnes, 2 queijos, ovo, bacon, calabresa, alface e maionese","Carne ou frango:. . . . . . . . . . . .R$27,99","Picanha:. . . . . . . . . . . . . . . . . . . . R$:30,99"],
           "Big Waves":["Pão,3 carnes,3 queijos,ovo,alface e maionese","Carne ou frango:. . . . . . . . . . . .R$29,99","Picanha:. . . . . . . . . . . . . . . . . . . . R$:32,99"],
           "Waves Premium Artesanal":["Pão brioche,carne de picanha 180g,queijo cheddar, bacon triturado, salada e molho especial","Normal:. . . . . . . . . . . . . . . . . . . . R$:34,99","Combo:. . . . . . . . . . . . . . . . . . . . . R$:46,99"],
           "Delicia de Frango":["Pão árabe, filé de frango grelhado, queijo, tomate e alface","R$:. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .20,50"],
           "Gula de Filé":["Pão árabe, filé bovino grelhado, queijo, cebola grelhada no shoyu,tomate e alface","R$:. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .27,50"],
           "Combo 1":["Waves burguer(Carne ou frango),refri lata, batata","Normal:. . . . . . . . . . . . . . . . . . . .R$:19,99","Picaha:. . . . . . . . . . . . . . . . . . . . .R$:22,99"],
           "Combo 2":["X-Calabresa ou X-Bacon(Carne ou frango),refri lata, batata P","Normal:. . . . . . . . . . . . . . . . . . . .R$:24,99","Picaha: . . . . . . . . . . . . . . . . . . . . .R$:27,99"],
           "Combo 3":["X-Tudo(Carne ou frango),refri lata, batata P","Normal:. . . . . . . . . . . . . . . . . . . .R$:29,99","Picaha:. . . . . . . . . . . . . . . . . . . . .R$:32,99"],
           "Combo 4":["Big Waves(Carne ou frango),refri lata, batata P","Normal:. . . . . . . . . . . . . . . . . . . .R$:35,99","Picaha: . . . . . . . . . . . . . . . . . . . .R$:38,99"],
           "Combo 5":["2 X-Tudo(Carne ou frango),refri lata, batata P","Normal:. . . . . . . . . . . . . . . . . . . .R$:55,99","Picaha: . . . . . . . . . . . . . . . . . . . .R$:58,99"],
           "Combo 6":["2 X-Tudo(Carne ou frango),2 Milk Shake 300ml","Normal:. . . . . . . . . . . . . . . . . . . .R$:49,99","Picaha: . . . . . . . . . . . . . . . . . . . .R$:52,99"]
        
        };
        
        };

        // Se o lanche for válido, mostrar a modal com os sabores correspondentes
        if (sabores[lanche]) {
            titulo.innerText = `Escolha o sabor do ${lanche}`;
            lista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

            sabores[lanche].forEach(sabor => {
                let li = document.createElement("li");
                li.innerText = sabor;
                lista.appendChild(li);
            });

            modal.style.display = "flex";
        }
    }

    function fecharSabores() {
        document.getElementById("caixaSabores").style.display = "none";
    }

    // Deixando as funções globais para serem chamadas no HTML
    window.mostrarSabores = mostrarSabores;
    window.fecharSabores = fecharSabores;
});
