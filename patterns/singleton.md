# Singleton


Здравейте, днес ще се запознаем с Singleton патерн.

Това е може би един от най-лесните за разбиране патерни ...

Singleton е предназначен за създаване и предоставяне на една единствена инстанция на даден обект в рамките на "живота" на дадено приложение.

Обикновено се прилага за обекти, които създават и държат в себе си "конекция" към даден външен ресурс.

Като класове за бази с данни, външни api-та и други чието достъпване и инициализиране изисква повече време

---
Ето пример за Singleton: 
```java
public class Singleton {

    private static Singleton instance = null;

    private Singleton(){
        System.out.println("Im Singleton contructor!");
    }

    public static Singleton getInstance(){
        if (instance == null){
            instance = new Singleton();
        }
        return instance;
    }

}
```

Имаме:
- private конструктор Singleton който спира стандартна инициализация на обекта
- private статична променлива "instance" която ще държи инстанцията на самият обект
- и public static getInstance който връща инстанцията на обекта , като преди това проверява дали е създадена инстанция и ако не е създава такава 

---
Нека сега да разгледаме и тестови пример: 
```java
public class Test {

    public static void main(String[] args) {

        Singleton objA = Singleton.getInstance();

        Singleton objB = Singleton.getInstance();

        Singleton objC = Singleton.getInstance();

    }
}
```

... ако изпълните този тест в конзолата ще се изпише само веднъж "Im Singleton contructor!" въпреки че извикваме getInstance няколко пъти!!! 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...
