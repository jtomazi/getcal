const form = document.getElementById("form"); //Isso faz com que encontremos o form pelo ID, ID que está na tag html.

form.addEventListener("submit", handleSubmit);
//"Ouvindo" quando ocorrer o evento do tipo submit no form.
//segundo parâmetro é uma function, que será disparada quando o evento de submit ocorrer.

function handleSubmit(event) {
  //function para pegar os valores dos campos numéricos.
  event.preventDefault(); //Essa linha diz para o JavaScript prevenir o evento padrão de submit, fazendo com que não recarregue a página.

  //criando variáveis e puxando os valores pelas functions.
  const gender = getSelectedValue("gender");

  const age = getInputNumberValue("age");

  const weight = getInputNumberValue("weight");

  const height = getInputNumberValue("height");

  const activity_level = getSelectedValue("activity_level");

  //Calculando valor para a taxa de metabolismo basal.

  const tmb = Math.round(
    //condicional ternária. Criando uma variável tmb, semelhante ao if.
    gender === "female" //se o sexo selecionado for female, faz X coisa.
      ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age // Fórmula para mulher. (IF)
      : 66 + 13.7 * weight + 5 * height - 6.8 * age //Fórmula para homem. Se não for 'female', faz X coisa. (ELSE)
  );

  // Calculando valor de calorias necessárias para manter o peso.
  const maintenance = Math.round(tmb * Number(activity_level));
  //criando variável para preencher o valor de quantidade de calorias necessárias para manter o peso. Puxando a variável tmb (taxa metabólica basal) * activity_level (que tem um valor numérico em value).
  //Math.round serve para arredondar o número para o número inteiro mais próximo.

  //Calculando valor necessário para perder peso.
  const loseWeight = maintenance - 450;

  //Calculando valor necessário para ganhar peso.
  const gainWeight = maintenance + 450;

  //Criando variável para inserir o layout html. Utilizando template strings. Para interpolar variáveis, utiliza-se "${variavel}"
  const layout = `
    <h2>Aqui está o resultado:</h2>

          <div class="result-content">
            <ul>
              <li>
                Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
              </li>
              <li>
                Para manter o seu peso você precisa consumir em média
                <strong>${maintenance} calorias</strong>.
              </li>
              <li>
                Para perder peso você precisa consumir em média
                <strong>${loseWeight} calorias</strong>.
              </li>
              <li>
                Para ganhar peso você precisa consumir em média
                <strong>${gainWeight} calorias</strong>.
              </li>
            </ul>
          </div>
  `;

  //Criando a variável result, que é a variável com id da div de resultado, onde mostra o log com o html acima.
  const result = document.getElementById("result");

  result.innerHTML = layout; //atribuindo os valores da variável layout para o result.
}

function getSelectedValue(id) {
  const select = document.getElementById(id);

  return select.options[select.selectedIndex].value; //acessando as opções do select, pedindo que retorne o valor da posição.
  /*
  select.options; = select option seriam as opções do select. Por exemplo no select "gender" há duas opções: masculino e feminino. 
  select.selectedIndex; = selectedIndex seria a posição da opção, começando em 0, igual a array's.
  */
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value); //Number é uma função nativa do JS que transforma String em Number. E o ".value" é para pegar o valor do campo.
}
