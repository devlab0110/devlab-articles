# Facade

Здравейте, днес ще се занимаем с Facade Pattern.

Тук отново, както при Adapter Pattern името говори само за себе си.

Този патерн се ползва когато имаме сложна и комплексна работа с набор от класове
... за да скрием тази сложност от по-нататъшно ползване в други части на кода.
... за да улесним ползването
... за да поставим ясна граница "зад" която ще можем свободно да правим промени без това да се отрази на ползването им

---
Facade Pattern не изисква интерфейси и абстрактни класове , нужен е просто един клас който ще играе ролята на фасадата: 
```java
public class Facade {

    public void method1(){

        System.out.println(":::::::::::::");
        System.out.println("Facade : method1");

        ToolA toolA = new ToolA();
        toolA.tht();
        toolA.foo();
        toolA.bar();

        ToolD toolD = new ToolD();
        toolD.gkl();
    }

    public void method2(){

        System.out.println(":::::::::::::");
        System.out.println("Facade : method2");

        ToolE toolE = new ToolE();
        toolE.dft();
        toolE.mtk();

        ToolC toolC = new ToolC();
        toolC.klm();

    }

    public void method3(){

        System.out.println(":::::::::::::");
        System.out.println("Facade : method3");

        ToolB toolB = new ToolB();
        toolB.jan();

    }
}
```

```java
public class ToolA {

    public void bar(){
        System.out.println("ToolA : bar");
    }

    public void foo(){
        System.out.println("ToolA : foo");
    }

    public void tht(){
        System.out.println("ToolA : tht");

    }

}
```

```java
public class ToolB {

    public void wow(){
        System.out.println("ToolB : wow");
    }

    public void sht(){
        System.out.println("ToolB : sht");
    }

    public void jan(){
        System.out.println("ToolB : jan");
    }

}
```


```java
public class ToolC {

    public void hlk(){
        System.out.println("ToolC : hlk");
    }

    public void sdf(){
        System.out.println("ToolC : sdf");
    }

    public void klm(){
        System.out.println("ToolC : klm");
    }

}
```

```java
public class ToolD {

    public void plo(){
        System.out.println("ToolD : plo");
    }

    public void itn(){
        System.out.println("ToolD : itn");
    }

    public void gkl(){
        System.out.println("ToolD : gkl");
    }

}
```

```java
public class ToolE {

    public void jot(){
        System.out.println("ToolE : jot");
    }

    public void dft(){
        System.out.println("ToolE : dft");
    }

    public void mtk(){
        System.out.println("ToolE : mtk");
    }

}
```

Въпреки странният набор от класове, ясно се вижда ролята на фасадата , която работи "задкулисно" с целият набор от tools.

Нека все пак да разгледаме и пример за ползването на този патерн ,
... въпреки че няма особен смисъл в това , е редно да сме последователни и методични: 


```java
public class Test {

    public static void main(String[] args) {
        Facade f = new Facade();
        f.method1();
        f.method2();
        f.method3();
    }

}
```


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...
