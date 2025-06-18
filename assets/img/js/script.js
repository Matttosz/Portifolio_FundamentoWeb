const sobre = document.querySelector('#about')
const formulario = document.querySelector('#formulario')
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Busca dados do GitHub
async function getApiGithub() {
	try {
		const dadosPerfil = await fetch(`https://api.github.com/users/matttosz`)
		const perfil = await dadosPerfil.json()

		let conteudo = `
            <img src="${perfil.avatar_url}" alt="Foto do perfil do Github - ${perfil.name}" />
            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>I'm a tech enthusiast with cybersecurity knowledge and software development.
Always learning, always building, and damn sure creating something right now!</p>
                <div id="about_github" class="flex sobre_github">
                    <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                    <p>${perfil.followers} seguidores</p>
                    <p>${perfil.public_repos} repositórios</p>
                </div>
            </article>
        `
		sobre.innerHTML += conteudo
	} catch (error) {
		console.error(error)
	}
}

// Validação do formulário
formulario.addEventListener('submit', function (event) {
	event.preventDefault()

	const campoNome = document.querySelector('#nome')
	const txtNome = document.querySelector('#txtNome')
	if (campoNome.value.length < 3) {
		txtNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres'
		campoNome.focus()
		return
	} else {
		txtNome.innerHTML = ''
	}

	const campoEmail = document.querySelector('#email')
	const txtEmail = document.querySelector('#txtEmail')
	if (!campoEmail.value.match(emailRegex)) {
		txtEmail.innerHTML = 'Digite um e-mail válido'
		campoEmail.focus()
		return
	} else {
		txtEmail.innerHTML = ''
	}

	const campoAssunto = document.querySelector('#assunto')
	const txtAssunto = document.querySelector('#txtAssunto')
	if (campoAssunto.value.length < 5) {
		txtAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres'
		campoAssunto.focus()
		return
	} else {
		txtAssunto.innerHTML = ''
	}

	formulario.submit()
})

// Executar funções ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
	getApiGithub()
})
