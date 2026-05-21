# State


Здравейте , днес ще се занимаем с State pattern.

Очевидно тук става въпрос за състояния, но как точно тези имагинерни състояния са навързани в този патерн?

Отговора на въпроса започва да се прокрадва в далечината когато комбинираме думите състояния и действия!

Когато трябва да опишем и КОМБИНИРАМЕ набор от състояния и набор от действия за всяко едно от състоянията на помощ идва точно този патерн! 


---
Нека направо да преминем към примерен код: 
```java
public class Package {

    private PackageState state = new OrderedState();

    public void previousState() {
        state.prev(this);
    }

    public void nextState() {
        state.next(this);
    }

    public void printStatus() {
        state.status();
    }

    public void setState(PackageState state){
        this.state = state;
    }
}
```

```java
public interface PackageState {

    void next(Package pkg);
    void prev(Package pkg);
    void status();

}
```

```java
public class OrderedState implements PackageState {

    @Override
    public void next(Package pkg) {
        pkg.setState(new DeliveredState());
    }

    @Override
    public void prev(Package pkg) {
        System.out.println("OrderedState : Not supported prev!");
    }

    @Override
    public void status() {
        System.out.println("OrderedState : Package is ordered");
    }
}
```

```java
public class DeliveredState implements PackageState {

    @Override
    public void next(Package pkg) {
        pkg.setState(new ReceivedState());
    }

    @Override
    public void prev(Package pkg) {
        pkg.setState(new OrderedState());
    }

    @Override
    public void status() {
        System.out.println("DeliveredState : Package delivered to postman");
    }
}
```

```java
public class ReceivedState implements PackageState {

    @Override
    public void next(Package pkg) {
        System.out.println("ReceivedState : not supported next!");
    }

    @Override
    public void prev(Package pkg) {
        pkg.setState(new DeliveredState());
    }

    @Override
    public void status() {
        System.out.println("ReceivedState : Package is delivered");
    }
}
```

Имаме:
- базов клас Package който държи в себе си PackageState , и предоставя набор от действия спрямо своето текущо състояние.
- общ interface PackageState - и реализация на няколко стейта: OrderedState, DeliveredState и ReceivedState

... забележете че класа Package държи в себе си инстанция на само един State
... забележете че въпросният стейт на Package (евентуално) се подменя от кода в конкретен стейт

... тоест Package винаги държи само един конкретен стейт в себе си и извиква методите на конкретният стейт и конкретният стейт "решава" дали да се само поднови с нов стейт или да остане същият...

... тоест Package винаги изпълнява действията си спрямо конкретният стейт във който се намира и преминава от стейт във стейт в зависимост от кода (в зависимост от решението) на конкретно извиквания стейт. 


---
Нека сега да разгледаме и тестов пример: 
```java
public class Test {

    public static void main(String[] args) {

        System.out.println(":::::::::::::::::::");
        Package pkg = new Package();
        pkg.printStatus();

        pkg.nextState();
        pkg.printStatus();

        pkg.nextState();
        pkg.printStatus();

        pkg.nextState();
        pkg.printStatus();

    }

}
```

Както се вижда в примера Package преминава от стейт в стейт като се извиква няколко пъти последователно метода nextState. 



---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...

