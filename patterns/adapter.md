# Adapter


Здравейте, днес ще се запознаем с Adapter Pattern.

Както името предполага, този патерн адаптира даден код към друг код, но тук по-важното е посоката и предназначението на самото адаптиране.
Няма никакъв смисъл да се правят безразборни адаптори на всяко място в кода където нещата не пасват.

Адаптора трябва да унифицира работата с конкретен тип класове/компоненти.

Ако вземем за пример работата с различни бази от данни , то тук спокойно можем да говорим за адаптиране , защото чрез този патерн "работата" с различните бази ще бъде една и съща и ще се използват едни и същи методи както за mysql , mssql , postgresql , sqllite или други ...

Тук е важно да се отбележи, че трябва да се прави адаптиране само върху сходни и еднотипни класове/компоненти
... ако те се различават коренно в начина си на работа тогава не са подходящи за адаптиране
... няма никакъв смисъл да се прави общо адаптиране за база от данни и примерно файлова система
... най-общо казано това което се адаптира трябва да е бъде профилирано в една обща група.

Adapter Pattern изисква общ interface към който да се придържат самите адаптори:

--------------------
Adapter.java
```java
public interface Adapter {

    public void methodA();
    public void methodB();
    public void methodC();

}
```

--------------------
FooAdapter.java
```java
public class FooAdapter implements Adapter{

    private Foo foo;
    public FooAdapter(Foo foo){
        this.foo = foo;
    }

    @Override
    public void methodA() {
        System.out.println("FooAdapter : methodA : Foo : some");
        this.foo.some();
    }

    @Override
    public void methodB() {
        System.out.println("FooAdapter : methodB : Foo : tar");
        this.foo.tar();
    }

    @Override
    public void methodC() {
        System.out.println("FooAdapter : methodC : Foo : zen");
        this.foo.zen();
    }
}
```


--------------------
BarAdapter.java 
```java
public class BarAdapter implements Adapter{

    private Bar bar;
    public BarAdapter(Bar bar){
        this.bar = bar;
    }

    @Override
    public void methodA() {
        System.out.println("BarAdapter : methodC : Bar : tft");
        this.bar.tft();
    }

    @Override
    public void methodB() {
        System.out.println("BarAdapter : methodC : Bar : rar");
        this.bar.rar();
    }

    @Override
    public void methodC() {
        System.out.println("BarAdapter : methodC : Bar : saas");
        this.bar.saas();
    }
}
```

--------------------
Foo.java
```java
public class Foo {

    public void some(){

    }

    public void tar(){

    }

    public void zen(){

    }

}
```


--------------------
Bar.java
```java
public class Bar {

    public void tft(){

    }

    public void rar(){

    }

    public void saas(){

    }

}
```

--------------------
Въпреки че примера изглежда доста скалъпен и непрактичен, все пак показва съвсем ясно и еднозначно идеята на този патерн:
- имаме общ интерфейс Adapter
- два адаптора FooAdapter и BarAdapter
- и два класа Foo и Bar които благодарение на Adapter Pattern-а могат да се използват по-един и същ начин!

Нека да разгледаме и пример за използването на този патерн:
```java
public class Test {

    public static void main(String[] args) {

        String use = "foo";
        Adapter adapter = null;

        if(use.equals("foo")){
            adapter = new FooAdapter(new Foo());
        }
        else if(use.equals("bar")){
            adapter = new BarAdapter(new Bar());
        }


        if(adapter == null){
            System.out.println("Not supported library");
            return;
        }

        System.out.println("------------------");
        adapter.methodA();
        adapter.methodB();
        adapter.methodC();

    }

}
```

--------------------
Както се вижда в тестовия код , няма никакво значение какво стои зад адаптора защото, то ще бъде използвано индиректно по-един и начин (тоест ще бъде използвано индиректно през едни и същи методи)


--------------------
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...