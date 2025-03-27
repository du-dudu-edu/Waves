let cart = [];
let selectedItem = {};

// 🎯 Novo objeto para armazenar os preços dos tamanhos
const precosTamanhos = {
    "Casquinha Trufada": 3.00,
    "Casquinha c/Nutella": 4.00,
    "Cascão": 5.50,
    "Cascão Trufado": 7.00,
	"180ml.": 0.00, 
    "300ml.": 3.00,
    "500ml.": 7.00,
    "700ml.": 9.00,
	"300ml": 0.00,
	"500ml": 3.00,
	"700ml": 5.00,
	"Lata": 0.00,
	"600ml": 3.00,
	"Natural": 0.00,
	"Ao Leite": 3.00
};

function toggleCart() {
    let cartPopup = document.getElementById("cart-popup");
    cartPopup.style.display = (cartPopup.style.display === "block") ? "none" : "block";
}

// Atualiza o carrinho e o contador do botão
function updateCart() {
    let cartList = document.getElementById("cart-list");
    let cartCount = document.getElementById("cart-count");
    cartList.innerHTML = "";
    cartCount.textContent = cart.length;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.quantity} x ${item.name} - R$${(item.quantity * item.price).toFixed(2)}
            <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Exibe o pop-up de personalização de acordo com a categoria
function showCustomization(itemName, price) {
    selectedItem = { name: itemName, price: price };

    let customOptions = document.getElementById("custom-options");
    customOptions.innerHTML = "";

    document.getElementById("popup-title").textContent = `Personalizar ${itemName}`;

    if (itemName.includes("Burguer") || itemName.includes("X") || itemName.includes("Combo") || itemName.includes("Big") || itemName.includes("Montanha")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="meat" value="Carne" checked> Carne</label><br>
            <label><input type="radio" name="meat" value="Frango"> Frango</label><br>
            <label><input type="radio" name="meat" value="Picanha"> Picanha (+R$3,00)</label><br>
        `;
    } else if (itemName.includes("Casquinha")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="sabor" value="Açaí"> Açaí</label><br>
            <label><input type="radio" name="sabor" value="Baunilha"> Baunilha</label><br>
            <label><input type="radio" name="sabor" value="Misto"> Misto</label><br>
            <select id="Tamanho">
                <option value="Casquinha">Casquinha</option>
                <option value="Casquinha Trufada">Casquinha Trufada (+R$3,00)</option>
                <option value="Casquinha c/Nutella">Casquinha c/Nutella (+R$4,00)</option>
                <option value="Cascão">Cascão (+R$5,50)</option>
                <option value="Cascão Trufado">Cascão Trufado (+R$7,00)</option>
            </select>
        `;
    } else if (itemName.includes("Açaí")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="sabor" value="Açaí"> Açaí</label><br>
            <label><input type="radio" name="sabor" value="Baunilha"> Baunilha(+R$:1,00)</label><br>
            <label><input type="radio" name="sabor" value="Misto"> Misto(+R$:1,00)</label><br>
            <select id="tamanho-copo">
			    <option value="180ml.">Pequeno. (180ml)</option>
                <option value="300ml.">Médio. (300ml) (+R$3,00)</option>
                <option value="500ml.">Grande. (500ml) (+R$7,00)</option>
                <option value="700ml.">Gigante. (700ml) (+R$9,00)</option>
            </select>
        `;
    }else if (itemName.includes("Milk")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="saborMilk" value="Maracujá"> Maracujá</label><br>
            <label><input type="radio" name="saborMilk" value="Maracujá c/Nutella"> Maracujá c/Nutella</label><br>
            <label><input type="radio" name="saborMilk" value="Morango"> Morango</label><br>
            <label><input type="radio" name="saborMilk" value="Morango c/Nutella"> Morango c/Nutella</label><br>
            <label><input type="radio" name="saborMilk" value="Ninho"> Ninho</label><br>
            <label><input type="radio" name="saborMilk" value="Ninho c/Nutella">Ninho c/Nutella</label><br>
            <label><input type="radio" name="saborMilk" value="Nutella"> Nutella</label><br>
            <label><input type="radio" name="saborMilk" value="Oreo"> Oreo</label><br>
			<label><input type="radio" name="saborMilk" value="Paçoca">Paçoca</label><br>
			<label><input type="radio" name="saborMilk" value="Flocos"> Flocos</label><br>
            <select id="tamanho-copo-m">
                <option value="300ml">Médio (300ml)</option>
                <option value="500ml">Grande (500ml) (+R$3,00)</option>
                <option value="700ml">Gigante (700ml) (+R$5,00)</option>
            </select>
        `;
    }else if (itemName.includes("Max")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="recheio" value="Ovomaltine"> Ovomaltine</label><br>
            <label><input type="radio" name="recheio" value="Sonho de Valsa"> Sonho de Valsa</label><br>
            <label><input type="radio" name="recheio" value="Ouro Branco"> Ouro Branco</label><br>
            <label><input type="radio" name="recheio" value="Mini Oreo"> Mini Oreo</label><br>
            <label><input type="radio" name="recheio" value="Kit Kat"> Kit Kat</label><br>
            <label><input type="radio" name="recheio" value="Prestigio"> Prestigio</label><br>
            <label><input type="radio" name="recheio" value="M&M"> M&M</label><br>
            <label><input type="radio" name="recheio" value="Bis"> Bis</label><br>
       `;
	}else if (itemName.includes("Sundaes")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="S" value="Chocolate">Chocolate</label><br>
            <label><input type="radio" name="S" value="Morango">Morango</label><br>
            <label><input type="radio" name="S" value="Nutella">Nutella(+R$:1,50)</label><br>
            <label><input type="radio" name="S" value="Oreo">Oreo(+R$:1,50)</label><br>
            <label><input type="radio" name="S" value="Caramelo">Caramelo(+R$:1,50)</label><br>
            <label><input type="radio" name="S" value="Calda Quente">Calda Quente(+R$:2,50)</label><br>
       `;
	}else if (itemName.includes("Top")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="St" value="Chocolate">Chocolate</label><br>
            <label><input type="radio" name="St" value="Morango">Morango</label><br>
            <label><input type="radio" name="St" value="Nutella">Nutella(+R$:2,00)</label><br>
            <label><input type="radio" name="St" value="Caramelo">Caramelo(+R$:2,00)</label><br>
       `;
	}else if (itemName.includes("Soda") || itemName.includes("Chá")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="xarope" value="Maçã Verde">Maçã Verde</label><br>
            <label><input type="radio" name="xarope" value="Limão Sicilliano">Limão Sicilliano</label><br>
            <label><input type="radio" name="xarope" value="Cranberry">Cranberry</label><br>
            <label><input type="radio" name="xarope" value="Tangerina">Tangerina</label><br>
			<label><input type="radio" name="xarope" value="Morangoo">Morango</label><br>
            <label><input type="radio" name="xarope" value="Pêssego">Pêssego</label><br>
       `;
	}else if (itemName.includes("MATE")) {
        customOptions.innerHTML = `
            <label><input type="radio" name="mate" value="Natural">Natural</label><br>
            <label><input type="radio" name="mate" value="Pêssego">Pêssego</label><br>
            <label><input type="radio" name="mate" value="Limão">Limão</label><br>
       `;
	}else if (itemName.includes("Petisco")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="petisco" value="Normal">Sem Batata</label><br>
            <label><input type="radio" name="petisco" value="Fritas">Com Batata(+R$10,00)</label><br>
       `;
	}else if (itemName.includes("Refrigerante")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="refri" value="gas">Coca-Cola</label><br>
            <label><input type="radio" name="refri" value="gas">Guaraná</label><br>
			<label><input type="radio" name="refri" value="gas">Sprite</label><br>
			<select id="tamanho-lata">
                <option value="Lata">Lata</option>
                <option value="600ml">600ml(+R$3,00)</option>
            </select>
       `;
	}else if (itemName.includes("Machiatto") || itemName.includes("Cappuccino") || itemName.includes("Cremoso") || itemName.includes("Mocaccino")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="borda" value="Sem adicional">Sem borda adicional</label><br>
		    <label><input type="radio" name="borda" value="Borda de Nutella">Borda de Nutella(+R$:3,00)</label><br>
            <label><input type="radio" name="borda" value="Borda de Doce de Leite">Borda de Doce de Leite(+R$:3,00)</label><br>
			<label><input type="radio" name="borda" value="Borda de Brigadeiro">Borda de Brigadeiro(+R$:3,00)</label><br>
			
       `;
	}else if (itemName.includes("Suco")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="suco" value="Abacaxi">Abacaxi</label><br>
		    <label><input type="radio" name="suco" value="Abacaxi c/Hortelã">Abacaxi c/Hortelã</label><br>
            <label><input type="radio" name="suco" value="Acerola">Acerola</label><br>
			<label><input type="radio" name="suco" value="Açaí">Açaí</label><br>
			<label><input type="radio" name="suco" value="Cajá">Cajá</label><br>
		    <label><input type="radio" name="suco" value="Cupuaçu">Cupuaçu</label><br>
            <label><input type="radio" name="suco" value="Goiaba">Goiaba</label><br>
			<label><input type="radio" name="suco" value="Graviola">Graviola</label><br>
			<label><input type="radio" name="suco" value="Laranja">Laranja</label><br>
			<label><input type="radio" name="suco" value="Manga">Manga</label><br>
			<label><input type="radio" name="suco" value="Maracujá">Maracujá</label><br>
		    <label><input type="radio" name="suco" value="Melancia">Melancia</label><br>
            <label><input type="radio" name="suco" value="Morango">Morango</label><br>
			<label><input type="radio" name="suco" value="Uva">Uva</label><br>
			<select id="liquido">
                <option value="Natural">Natural</option>
                <option value="Ao Leite">Ao Leite(+R$3,00)</option>
            </select>
			
       `;
	}else if (itemName.includes("Croassaint")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="cro" value="Queijo">Queijo</label><br>
		    <label><input type="radio" name="cro" value="Misto">Misto</label><br>
            <label><input type="radio" name="cro" value="Peito de Peru">Peito de Peru</label><br>
			<label><input type="radio" name="cro" value="Frango">Frango</label><br>
       `;
	}else if (itemName.includes("Bolo")) {
        customOptions.innerHTML = `
		    <label><input type="radio" name="Bolo" value="Kit Kat">Kit Kat</label><br>
		    <label><input type="radio" name="Bolo" value="Ferrero Rocher">Ferrero Rocher</label><br>
            <label><input type="radio" name="Bolo" value="Ouro Branco">Ouro Branco</label><br>
       `;
	}


    document.getElementById("custom-popup").style.display = "block";
}

// Confirma a personalização e adiciona ao carrinho
function confirmCustomization() {
    let customizations = [];
    let finalPrice = selectedItem.price ?? 0;

    if (selectedItem.name.includes("Burguer") || selectedItem.name.includes("X") || selectedItem.name.includes("Combo") || selectedItem.name.includes("Big") || selectedItem.name.includes("Montanha")) {
        let selectedMeat = document.querySelector('input[name="meat"]:checked')?.value;
        if (selectedMeat) customizations.push(selectedMeat);
        if(selectedMeat === "Picanha"){
			finalPrice += 3.00;
		}
    }else if (selectedItem.name.includes("Casquinha")) {
        let selectedSabor = document.querySelector('input[name="sabor"]:checked');
        if (!selectedSabor) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedSabor.value);

        let tamanhoSelecionado = document.getElementById("Tamanho")?.value;
        if (tamanhoSelecionado) {
            customizations.push(tamanhoSelecionado);
            finalPrice += precosTamanhos[tamanhoSelecionado] || 0;
        }
    } else if (selectedItem.name.includes("Açaí")) {
		let selectedSabor = document.querySelector('input[name="sabor"]:checked')?.value;
		if (selectedSabor) customizations.push(selectedSabor);
		if (selectedSabor === "Baunilha" || "Misto"){
			finalPrice += 1.00;
		}
        if (!selectedSabor) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        let tamanhoSelecionado = document.getElementById("tamanho-copo")?.value;
        if (tamanhoSelecionado) {
            customizations.push(tamanhoSelecionado);
            finalPrice += precosTamanhos[tamanhoSelecionado] || 0;
        }
    }else if (selectedItem.name.includes("Milk")) {
        let tamanhoSelecionado = document.getElementById("tamanho-copo-m")?.value;
        if (tamanhoSelecionado) {
            customizations.push(tamanhoSelecionado);
            finalPrice += precosTamanhos[tamanhoSelecionado] || 0;
        }
    }else if (selectedItem.name.includes("Max")) {
        // Captura o sabor escolhido
        let selectedRecheio = document.querySelector('input[name="recheio"]:checked');
        if (selectedRecheio) {
            customizations.push(selectedRecheio.value);
        } else {
            alert("Por favor, selecione um sabor.");
            return;
        }
        
    }else if (selectedItem.name.includes("Sundaes")) {
        let selectedS = document.querySelector('input[name="S"]:checked');
        if (!selectedS) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedS.value);
        if (selectedS.value === "Nutella" || selectedS.value ==="Oreo" || selectedS.value ==="Caramelo") {
            finalPrice += 1.50;
        }
		if (selectedS.value === "Calda Quente" ) {
            finalPrice += 2.50;
        }
    }else if (selectedItem.name.includes("Top")) {
        let selectedSabor = document.querySelector('input[name="St"]:checked');
        if (!selectedSabor) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedSabor.value);

        if (selectedSabor.value === "Nutella" || selectedSabor.value === "Caramelo") {
            finalPrice += 2.00;
        }
    }else if (selectedItem.name.includes("Soda") || selectedItem.name.includes("Chá")) {
        let selectedXarope = document.querySelector('input[name="xarope"]:checked');
        if (!selectedXarope) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedXarope.value);
		
    }else if (selectedItem.name.includes("MATE")) {
        let selectedMate = document.querySelector('input[name="mate"]:checked');
        if (!selectedMate) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedMate.value);
		
    }else if (selectedItem.name.includes("Petisco")) {
        let selectedPet = document.querySelector('input[name="petisco"]:checked');
       
	   if (!selectedPet) {
            alert("Por favor, selecione uma opção.");
            return;
        }
        customizations.push(selectedPet.value);
		if (selectedPet.value === "Fritas") {
            finalPrice += 10.00;
        }
    }else if (selectedItem.name.includes("Refrigerante")) {
        let selectedRefri = document.querySelector('input[name="refri"]:checked');
       
	   if (!selectedRefri) {
            alert("Por favor, selecione uma opção.");
            return;
        }
		let tamanhoSelecionado = document.getElementById("tamanho-lata")?.value;
        if (tamanhoSelecionado) {
            customizations.push(tamanhoSelecionado);
            finalPrice += precosTamanhos[tamanhoSelecionado] || 0;
        }
        
    }else if (selectedItem.name.includes("Machiatto") || selectedItem.name.includes("Cappuccino") || selectedItem.name.includes("Cremoso") || selectedItem.name.includes("Mocaccino")) {
        let selectedBorda = document.querySelector('input[name="borda"]:checked');
       
	   if (!selectedBorda) {
            alert("Por favor, selecione uma opção.");
            return;
        }
        customizations.push(selectedBorda.value);
		if (selectedBorda.value === "Borda de Brigadeiro" || selectedBorda.value === "Borda de Doce de Leite" || selectedBorda.value === "Borda de Nutella"  ) {
            finalPrice += 3.00;
        }
    }else if (selectedItem.name.includes("Suco")) {
        let selectedSuco = document.querySelector('input[name="suco"]:checked');
        if (!selectedSuco) {
            alert("Por favor, selecione um sabor.");
            return;
        }
        customizations.push(selectedSuco.value);

        let tamanhoSelecionado = document.getElementById("liquido")?.value;
        if (tamanhoSelecionado) {
            customizations.push(tamanhoSelecionado);
            finalPrice += precosTamanhos[tamanhoSelecionado] || 0;
        }
    }else if (selectedItem.name.includes("Croassaint")) {
        let selectedCro = document.querySelector('input[name="cro"]:checked');
       
	   if (!selectedCro) {
            alert("Por favor, selecione uma opção.");
            return;
        }
		customizations.push(selectedCro.value);
    }else if (selectedItem.name.includes("Bolo")) {
        let selectedBolo = document.querySelector('input[name="Bolo"]:checked');
       
	   if (!selectedBolo) {
            alert("Por favor, selecione uma opção.");
            return;
        }
		customizations.push(selectedBolo.value);
    }

    cart.push({ name: `${selectedItem.name} (${customizations.join(", ")})`, price: finalPrice, quantity: 1 });

    updateCart();
    closePopup();
}

// Fecha o pop-up
function closePopup() {
    document.getElementById("custom-popup").style.display = "none";
}

// Envia o pedido pelo WhatsApp
function sendOrder() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let phoneNumber = "5522997302115";
    let message = "Olá, gostaria de fazer um pedido:\n";

    let total = 0;
    cart.forEach(item => {
        message += `- ${item.quantity} x ${item.name} (R$${(item.quantity * item.price).toFixed(2)})\n`;
        total += item.quantity * item.price;
    });

    message += `\nTotal: R$${total.toFixed(2)}`;
    let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toggleCart();
}

// Alterna a visibilidade das categorias
function toggleCategory(element) {
    let category = element.closest(".menu-category");
    if (!category) return;

    let items = category.querySelector(".menu-items");
    if (!items) return;

    if (items.style.display === "none" || items.style.display === "") {
        items.style.display = "grid";
        element.innerHTML = element.innerHTML.replace("▼", "▲");
    } else {
        items.style.display = "none";
        element.innerHTML = element.innerHTML.replace("▲", "▼");
    }
}

// Carregar avaliações do LocalStorage
document.addEventListener("DOMContentLoaded", loadReviews);

function loadReviews() {
    let reviewsContainer = document.getElementById("reviews-container");
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviewsContainer.innerHTML = "";
    reviews.forEach(review => {
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <p class="rating">${review.rating}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

// Enviar nova avaliação
document.getElementById("review-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let reviewText = document.getElementById("review-text").value;
    let rating = document.getElementById("rating").value;

    let review = { name: name, text: reviewText, rating: "⭐".repeat(rating) };
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("review-form").reset();
    loadReviews();
});