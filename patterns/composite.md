#  Composite


Здравейте, сега ще се запознаем с патерна Composite.

Този патерн има съвсем ясно и еднозначно място за реализация и то е пряко свързано с "дървовидни" структури ...тоест там където имаме компоненти, които могат да държат в себе си други компоненти.

Проблема при работата с "дървовидни" структури се изразява в това че всяко дърво има крайни "точки" които НЕ държат в себе си други компоненти и за да обходим дървото трябва да правим на всяка точка както проверки дали има разклонения , така и да извикваме отново и отново рекурсивно функция/метод.

... тоест колкото и голямо да е едно "дърво" то винаги стига до точка в която НЯМА разклонение.
... тоест всяко дърво има два "вида" компоненти, такива които имат разклонения и такива които са крайна точка (листо)
... тук идва мястото на Composite патерна, защото с негова помощ унифициране работата с тези два "вида" компоненти и за ползващият дървото няма никакво значение в коя точка на дървото се намира.

Нека да разгледаме пример: 


--------------------
```java
public interface Todo {
    public String buildHtml();
}
```


--------------------
```java
public class TodoSingle implements Todo {

    protected String text;
    public TodoSingle(String text){
        this.text = text;
    }

    @Override
    public String buildHtml() {
        System.out.println("TodoSingle : getHtml");
        String html = "";
        html += "<ul>";
            html += "<li>" + text + "</li>";
        html += "</ul>";
        return html;
    }

}
```


--------------------
```java
public class TodoProject implements Todo {

    protected String text;
    protected List<Todo> todos;
    public TodoProject(String text, List<Todo> todos){
        this.text = text;
        this.todos = todos;
    }

    @Override
    public String buildHtml() {
        System.out.println("TodoProject : getHtml");
        String html = "";
        html += "<ul>";

            html += "<li>" + text + "</li>";

            if(todos.size() > 0){
                html += "<li>";
                    for(Todo todo : todos){
                        html += todo.buildHtml();
                    }
                html += "</li>";
            }

        html += "</ul>";
        return html;
    }



}
```


--------------------
Имаме:
- основен interface Todo
- TodoSingle който отговоря за крайните точки
- и TodoProject който отговоря за точките които имат разклонения...
... както сами забелязвате и двата типа точки/компоненти/класа имат еднакъв интерфейс и точно това е ключовото за този патерн.

Нека сега да разгледаме и пример за ползването на въпросните класове: 

```java
public class Test {

    public static void main(String[] args) {

        System.out.println("------------------");
        Todo todo1 = new TodoSingle("todo1");
        todo1.buildHtml();

        System.out.println("\n------------------");
        List<Todo> todos = new ArrayList<>();
        todos.add(new TodoSingle("todo2.1"));
        todos.add(new TodoSingle("todo2.2"));
        todos.add(new TodoSingle("todo2.3"));
        Todo todo2 = new TodoProject("todo2", todos);
        todo2.buildHtml();

    }

}
```

Примера е съвсем семпъл, но ако се вгледаме малко по-внимателно ще разберем, че този който получава и използва обект Todo на практика не се интересува дали в него се съдържа дърво или списък и няма нужда да прави каквото и да било проверки и рекурсивни обхождания за да вземе въпросният HTML ... нужно е само да извика метода buildHtml(). 


--------------------
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...



