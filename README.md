# Object Calisthenics

[Diretrizes](#diretrizes) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;1. [Apenas um nível de indentação por método](#1-apenas-um-nível-de-indentação-por-método) <br/> 
&nbsp;&nbsp;&nbsp;&nbsp;2. [Evite usar else](#2-evite-usar-else) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;3. [Encapsule tipos primitivos](#3-encapsule-tipos-primitivos) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;4. [Não use abreviações](#4-não-use-abreviações) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;5. [Classes não devem ter mais do que duas variáveis](#5-classes-não-devem-ter-mais-do-que-duas-variáveis) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;6. [Coleções de primeira classe](#6-coleções-de-primeira-classe) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;7. [Um ponto por linha](#7-um-ponto-por-linha) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;8. [Não use getter e setter](#8-não-use-getter-e-setter) <br/>
&nbsp;&nbsp;&nbsp;&nbsp;9. [Mantenha todas as entidades pequenas](#9-mantenha-todas-as-entidades-pequenas) <br/>
[Devemos usá-las sempre?](#devemos-usá-las-sempre) <br/>
[Fontes](#fontes) <br/>
[Exemplos](#exemplos)

São 9 diretrizes criadas por Jeff Bay no livro The ThoughtWorks Anthology. 

A principal motivação para o Object Calisthenics é aplicar alguns princípios do SOLID. Basicamente são um conjunto de boas práticas e regras de programação para aumentar a qualidade do seu código.

Essas regras são focadas em manutenibilidade, legibilidade, testabilidade e compreensão de seu código.

Existe uma forte correlação entre os princípios SOLID e a prática do Object Calisthenics. Os princípios SOLID focam no gerenciamento de dependências, e o Object Calisthenics se procura ser uma solução que fornece etapas para atingir esse objetivo.

7 dessas 9 regras são simplesmente maneiras de visualizar e implementar o Santo Graal da programação orientada a objetos – encapsulamento de dados. Uma outra regra busca reforçar o uso apropriado de polimorfismo e outra regra é mais uma estratégia de nomenclatura parecida com o que encontramos no Clean Code.

## Diretrizes

### 1. Apenas um nível de indentação por método

Ter muitos níveis de indentação no código geralmente é ruim para a legibilidade e manutenção. Martin Fowler, em seu livro Refactoring, apresenta o padrão Extract Method, que é exatamente o que devemos aplicar. 

Aplicar essa regra também está diretamente ligado ao Princípio da Responsabilidade Única.

> Princípio da Responsabilidade Única - Se o seu método tiver vários níveis de indentação, talvez não esteja fazendo apenas uma coisa.

O número de linhas no código não irá diminuir, mas a legibilidade irá melhorar de forma significativa, além de ser mais fácil identificar oportunidades de reúso de código.

À medida que cada unidade da aplicação se torna menor, o nível de reutilização começará a aumentar. Pode ser difícil identificar oportunidades de reutilização num método que tem cinco responsabilidades e é implementado em 100 linhas. Um método de três linhas que gerencia o estado de um único objeto em um determinado contexto pode ser usado em muitos contextos diferentes.

### 2. Evite usar else

O else está presente em quase todas as linguagens de programação e uma lógica condicional fácil de entender. A motivação por trás dessa regra é que com o uso de else, é muito normal que métodos inicialmente simples se tornem ilegíveis, grandes e complexos, além de ser uma oportunidade para duplicação de código. 

Com o else mais fácil adicionar mais uma condição do que refatorar o método para obter uma solução melhor.

Existem algumas estratégias pra substituir o _else_:
* Early return
* Polimorfismo

### 3. Encapsule tipos primitivos

Aqui basta encapsular os primitivos dentro de objetos para evitar o antipadrão Primitive Obsession.

> O antipadrão Primitive Obsession se refere a uma situação em que os tipos primitivos (como inteiros, strings, booleans, etc.) são usados para representar conceitos que merecem sua própria classe ou objeto.

Se a variável do seu tipo primitivo tiver um comportamento, DEVEMOS encapsulá-la. E isso é especialmente importante nos Objetos de Valor do Domain Driven Design.

Pequenos objetos como Hora ou Dinheiro também nos dão um lugar óbvio para colocar comportamentos que de outra forma estariam espalhados por outras classes.

### 4. Não use abreviações

Não abrevie, ponto final.

Quer abreviar por ter que repetir a mesma chamada de método várias vezes? Parece duplicação de código.

O nome do método é muito longo? Talvez ele tenha múltiplas responsabilidades, o que é ruim, pois viola o Princípio da Responsabilidade Única.

> Existem apenas duas coisas difíceis na Ciência da Computação: invalidação de cache e nomeação de coisas. <br/>
> – Phil Karlton

Se está difícil encontrar um nome decente para uma classe ou método, provavelmente algo está errado. Tente manter os nomes de classes e métodos com uma ou duas palavras e evite nomes que dupliquem o contexto. 

### 5. Classes não devem ter mais do que duas variáveis

Essa regra é baseada fortemente na anterior.

Dois é um número arbitrário, mas, de modo geral, devemos nos questionar se a classe está fazendo o que ela foi projetada para fazer e se tem mais responsabilidades do que ela deveria ter.

### 6. Coleções de primeira classe

Similar a regra anterior, aqui é reforçado que qualquer classe que contenha uma coleção não deve conter outras variáveis. 

Se você tiver um conjunto de elementos e quiser manipulá-los, crie uma classe dedicada para essa coleção. Assim comportamentos relacionados à coleção serão implementados por sua própria classe para esclarecer seu uso e tornar a intenção evidente.

### 7. Um ponto por linha

Às vezes é difícil saber qual objeto deve assumir a responsabilidade por uma atividade. Quando vemos linhas de código com vários pontos, começamos a encontrar muitas responsabilidades perdidas. 

Talvez o objeto esteja lidando com dois outros objetos ao mesmo tempo. Se todos esses pontos estiverem conectados, seu objeto está se aprofundando em outro objeto. Esses vários pontos indicam que você está violando o encapsulamento.

A Lei de Deméter (“fale apenas com seus amigos imediatos”) é um bom ponto de partida. Nunca devemos chamar um objeto obtido de outro e nem um objeto global.

### 8. Não use getter e setter

Não há problema em usar getters para obter o estado de um objeto, desde que não se use o resultado para tomar decisões fora do objeto. Quaisquer decisões baseadas inteiramente no estado de um objeto devem ser tomadas dentro do próprio objeto.

É por isso que getters/setters são frequentemente considerados maus. Eles violam o Princípio Aberto/Fechado.

> O Princípio de Aberto/Fechado propõe que entidades (classes, funções, módulos, etc.) devem ser abertas para extensão, mas fechadas para modificação.

O princípio de **diga, não pergunte** (_tell, don't ask_) explica que as classes não devem ter métodos getter/setter que simplesmente retornem ou definam valores, em vez disso, devem ter métodos que representam comportamentos.

### 9. Mantenha todas as entidades pequenas

Essa regra fala para não termos classes com mais de 50 linhas. A ideia por trás dela é que arquivos longos são mais difíceis de ler, entender e manter.

O que é desafiador na criação de classes tão pequenas é que muitas vezes há grupos de comportamentos que juntos fazem sentido lógico em conjunto. É aqui que precisamos aproveitar os pacotes.

Os pacotes, assim como as classes, devem ser coesos e ter um propósito. Manter esses pacotes pequenos obriga-os a ter uma identidade real.

## Devemos usá-las sempre?

❌ **NÃO**

Essas regras são diretrizes úteis para melhorar a qualidade do código orientado a objetos, tornando-o mais limpo, mais legível e mais fácil de manter. 

No entanto, elas não são rígidas e podem ser flexíveis em alguns contextos, mas servem como um bom ponto de partida para escrever código de qualidade.

## Fontes

1. https://williamdurand.fr/2013/06/03/object-calisthenics/ 
2. https://developerhandbook.stakater.com/content/architecture/object-calisthenics.html 
3. https://medium.com/@rafaelcruz_48213/desenvolva-um-c%C3%B3digo-melhor-com-object-calisthenics-d5364767a9ba 

## Exemplos

### `src/exemplo_1`
* Original: código inicial para ser refatorado de acordo com as regras descritas acima
* Refactor 1: aplicação da regra 1
* Refactor 2: aplicação da regra 2
* Refactor 2 (polimorfismo): aplicação da regra 2 com polimorfismo
* Refactor 3: aplicação da regra 3 em cima do polimorfismo

### `src/exemplo_2`
* Original: código inicial para ser refatorado de acordo com as regras descritas acima
* Refactor 1: aplicação da regra 4
* Refactor 2: aplicação da regra 5 e 6
* Refactor 3: aplicação da regra 7
* Refactor 4: aplicação da regra 8