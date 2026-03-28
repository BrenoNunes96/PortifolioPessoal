const about = document.querySelector("#about");
const swiperWrapper = document.querySelector(".swiper-wrapper")
const formulario = document.querySelector("#formulario")
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//https://formsubmit.co/ 




function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}




async function getAboutGithub(){

try{

    const res = await fetch("https://api.github.com/users/BrenoNunes96",{
'method':"GET",
'headers':{
    "Content-Type":"Application/json"

}

    })
    if(res.ok){
    const perfil= await res.json()
    console.log(perfil)
about.innerHTML =" "
about.innerHTML = `
 <figure class="about-image">
        <img src="${perfil.avatar_url}" 
             alt="${perfil.name}" 
             class="float-animation">
      </figure>

      <article class="about-content">
        <h2>Sobre mim</h2>
        <p>Olá, sou o Breno Nunes de Almeida! 👋
Sou Desenvolvedor Full-Stack e estudante de Sistemas de Computação na UFF. Sou apaixonado por construir aplicações completas, do back-end robusto à interface de usuário interativa.

Trabalho na criação de APIs e sistemas escaláveis utilizando TypeScript, Node.js, React e NestJS, além de ter experiência com integrações de IA e bancos de dados relacionais (MySQL e PostgreSQL). Explore meus projetos abaixo para ver como transformo lógica em soluções reais, como aplicativos de gestão com chatbots e sistemas de gerenciamento de produtos.

Vamos construir algo incrível juntos? 🚀</p>
     
<div class="about-buttons-data"> 
<div class="button-container">

<a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
<a href="https://drive.google.com/file/d/1h1bo-xrxMxARUHhSnT3bpBuGOQTZVtuX/view?usp=sharing" target="_blank" class="botao-outline">Currículo</a>
</div>

<div class="data-container">

    <div class="data-item">
        <span class="data-number">${perfil.followers}</span>
        <span class="data-label">Seguidores</span>
    </div>

    <div class="data-item">
        <span class="data-number">${perfil.public_repos}</span>
        <span class="data-label">Repositórios</span>
    </div>

</div>
</div>
 </article>
`



}}catch(error){
    console.error(error)
}


}


 // Requisição do tipo GET para a API do GitHub
  async function getProjectsGithub() {
    try 
    { const resposta = await fetch('https://api.github.com/users/BrenoNunes96/repos?sort=updated&per_page=6')

    // Converter a Resposta para JSON
    const repositorios = await resposta.json();
swiperWrapper.innerHTML = '';
// Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },    
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        };
        repositorios.forEach(repositorio => {
    const linguagem = repositorio.linguage|| 'GitHub';
    // seleciona o icone da linguagem padrao
    const config = linguagens[repositorio.linguagens] || {icone :'github'}
    //monta a url padrao que a ponta para o icone da linguagem padrao
    const  urlIcone = `./icons/languages/${config.icone}.svg`

    const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

const descricao = repositorio.description ? 
    (repositorio.description.length > 100 ? 
        repositorio.description.substring(0, 97) + '...' : 
        repositorio.description) : 
    'Projeto desenvolvido no GitHub';

const tags = repositorio.topics?.length > 0
    ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('') 
    : `<span class="tag">${linguagem}</span>`;

const botoesAcao = `
    <div class="project-buttons">
        <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
        </a>
        ${repositorio.homepage ? `
            <a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                Deploy
            </a>
        ` : ''}
    </div>
`;
 swiperWrapper.innerHTML +=  ` <div class="swiper-slide">

            <article class="project-card">
              <figure class="project-image">
                <img src="${urlIcone}" 
                     alt="Icone ${linguagem}">
              </figure>
              
              <div class="project-content">
                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>
                
                <div class="project-tags">
                  ${tags}
                  </div>
                ${botoesAcao}
                
              </div>
            </article>

          </div>`


})
iniciarSwiper()
}
catch(error){
    console.error('Erro ao buscar dados no GitHub', error);
}}


// Executar a função getAboutGitHub
getAboutGithub();
getProjectsGithub();


formulario.addEventListener("submit", function(event){
event.preventDefault();
document.querySelectorAll("form-span").forEach(x=>x.innerHTML='');

let isValid =true;

const nome =  document.querySelector('#nome')
const errorNome = document.querySelector("#erro-nome");


if(nome.value.trim().length < 3 ){
errorNome.innerHTML ="o nome deve conter pelo menos tres caracteres"
 if(isValid)nome.focus();
   isValid =false  

}


const email = document.querySelector('#email')
const erroemail = document.querySelector('#erro-email')
if(!email.value.trim().match(emailRegex)){
erroemail.innerHTML = 'digite um email valido'
if(isValid)email.focus()
isValid = false
}
   
const assunto = document.querySelector("#assunto")
const errorAssunto = document.querySelector("#erro-assunto")

if(assunto.value.trim().length < 5){
errorAssunto.innerHTML ="assunto deve conter no minimo 5 caracteres"

if(isValid)assunto.focus()
  isValid = false


}


const mensagem = document.querySelector("#mensagem")
const errorMensangem = document.querySelector("#erro-mensagem")

if(mensagem.value.trim().length === 0 ){
errorMensangem.innerHTML ="mensagem nao deve ser vazia"

if(isValid) mensagem.focus()
  isValid = false
}




if(isValid){
const submitbutton = formulario.querySelector("button[type=submit");
submitbutton.ariaDisabled = true
submitbutton.textContent = 'Enviando...'

formulario.submit()
}










})
