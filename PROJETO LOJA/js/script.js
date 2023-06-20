let modalQt = 1;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);


//Listagem dos modelos
modeloJson.map((item, index) => {
    let modeloItem = c('.models .modelo-item').cloneNode(true);

    modeloItem.setAttribute('data-key', index);

    modeloItem.querySelector('.modelo-item-img img').src = item.img;
    modeloItem.querySelector('.modelo-item-name').innerHTML = item.name;
    modeloItem.querySelector('.modelo-item-desc').innerHTML = item.description;
    modeloItem.querySelector('.modelo-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    modeloItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.modelo-item').getAttribute('data-key');
        modalQt = 1;

        c('.modeloBig img').src = modeloJson[key].img;
        c('.modeloInfo h1').innerHTML = modeloJson[key].name;
        c('.modeloInfo-desc').innerHTML = modeloJson[key].description;
        c('.modeloInfo-actualPrice').innerHTML = `R$ ${modeloJson[key].price.toFixed(2)}`;
        c('.modeloInfo-size.selected').classList.remove('selected');

        cs('.modeloInfo-size').forEach((size, sizeIndex) => {
            if (sizeIndex == 0){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = modeloJson[key].sizes[sizeIndex]
        });
        
        c('.modeloInfo-qt').innerHTML = modalQt;
        c('.modeloWindowarea').style.opacity = 0;
        c('.modeloWindowarea').style.display = 'flex';

        setTimeout(() =>{
            c('.modeloWindowarea').style.opacity = 1;
        }, 200);
    });

    c('.modelo-area').append(modeloItem);
});

//evento modal
function closeModal(){
    c('.modeloWindowarea').style.opacity = 0;
    setTimeout(()=>{
        c('.modeloWindowarea').style.display = 'none';
    }, 200);
};

cs('.modeloInfo-cancelButton, .modeloInfo-cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//botão quantidades de itens
c('.modeloInfo-qtmenos').addEventListener('click', () =>{
    if (modalQt > 1){
        modalQt--;
        c('.modeloInfo-qt').innerHTML = modalQt;
    }
});

c('.modeloInfo-qtmais').addEventListener('click', () =>{
    modalQt++;
    c('.modeloInfo-qt').innerHTML = modalQt;
});

//tamanhos
cs('.modeloInfo-size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', () =>{
        c('.modeloInfo-size.selected').classList.remove('selected');
        size.classList.add('selected'); 
    });
});

