# Null Object

Здравейте , днес ще се занимаем с Null Object pattern.

Нека за започнем с очевидното:
... Null се ползва за да декларираме на "нищо" като стойност към дадена променлива.
... Null Object се ползва за да декларираме клас който не прави "нищо".

Първо сигналната реакция предполага, че няма да намерим особен смисъл в този патерн, но ако се замислим малко повечко върху темата ще установим че ползването на Null Object може да ни спести доста if-ве и можем да унифицираме изцяло работата с даден набор от класове.

---
Нека да разгледаме примера: 
```java
public interface Inventory {
   public Iterathor getIterator();
}
```

```java
public interface Iterator {
    public Item next();
}
```

```java
public class MainInventory implements Inventory {

    public List<Item> items;
    private boolean locked = false;
    public MainInventory(List<Item> items){
        this.items = items;
    }

    @Override
    public Iterathor getIterathor() {
        if(locked){
            System.out.println("MainInventory : getIterathor <<< NullIterator");
            return new NullIterator();
        }
        else{
            System.out.println("MainInventory : getIterathor <<< MainInventoryIterator");
            return new MainInventoryIterator(this);
        }

    }

    public void lock(){
        locked = true;
    }

    public void unlock(){
        locked = true;
    }
}
```

```java
public class MainInventoryIterator implements Iterator {

    private MainInventory mainInventory;
    private int max = 0;
    private int index = 0;
    public MainInventoryIterator(MainInventory mainInventory){
        this.mainInventory = mainInventory;
        this.max = mainInventory.items.size()-1;
    }


    @Override
    public Item next() {
        if(index > max){
            return null;
        }
        Item item = mainInventory.items.get(index);
        index++;
        return item;
    }
}
```

```java
public class NullIterator implements Iterator {
    @Override
    public Item next() {
        return null;
    }
}
```

Имайте в предвид че този примерен код е за друг патерн и е малко претрупан.

Обърнете внимание на класа MainInventory и по-конкретно на метода му getIterathor , където се връщат различни итератори в зависимост от стейта "locked"
... ако MainInventory е заключен се връща NullIterator който "не прави нищо"
... ако MainInventory е отключен се връща стандартният MainInventoryIterator
... така си подсигуряваме унифицираната работа с MainInventory
... в "нормална" ситуация въпросният метод getIterathor щеше да връща стойност null и трябваше всеки който използва MainInventory да проверява дали върнатата стойност е null или е Iterator! 


---
Нека да разгледаме и още един пример чийто фокус (този път) е насочен основно върху Null Object: 
```java
public interface Shape {
    void draw();
}
```

```java
public class Factory {

    public static Shape create(String type){
        Shape shape = null;
        if ("Circle".equals(type)) {
            shape = new Circle();
        }
        else if ("Rectangle".equals(type)) {
            shape = new Rectangle();
        }
        else if ("Triangle".equals(type)) {
            shape = new Triangle();
        }
        else {
            shape = new NullShape();
        }
        return shape;
    }

}
```

```java
public class NullShape implements Shape {

    @Override
    public void draw() {
        System.out.println("NullShape : not impleneted draw!!!");
    }
}
```

```java
public class Circle implements Shape {

    @Override
    public void draw() {
        System.out.println("Circle : draw");
    }
}
```

```java
public class Rectangle implements Shape {

    @Override
    public void draw() {
        System.out.println("Rectangle : draw");
    }
}
```

```java
public class Triangle implements Shape {

    @Override
    public void draw() {
        System.out.println("Triangle : draw");
    }
}
```
Имаме:
- interface Shape
- фабрика Factory която създава Shapes спрямо ключова дума
- NullShape клас който не би трябвало да чертае нищо
- и няколко стандартни фигури: Circle, Rectangle и Triangle
... ако фабриката не може да създаде поисканата фигура ще бъде връщан обект който не чертае нищо, вместо да се връща стойност null. 


---
Нека сега да разгледаме и пример за ползването на горепосоченият код: 
```java
public class Test {

    public static void main(String[] args) {

        String[] types = new String[] {
            "Circle",
            "Triangle",
            "Rectangle",
            "Pentagon",
            null
        };
        for (String type : types) {
            Shape shape = Factory.create(type);
            shape.draw();
        }

    }

}
```

Тестовият код е доста семпъл, но и доста показателен:
Ако Factory.create() връщаше null вместо NullShape (когато не може да създаде дадена фигура) то тогава в тестовият код щеше да настъпва фатална грешка и трябваше да се проверява дали текущата shape е наистина обект от тип Shape , а не стойност от тип null! 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...

