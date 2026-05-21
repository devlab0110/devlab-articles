# Iterator

Здравейте, днес ще се занимаем с Iterator Pattern.

Този патерн е предназначен за итериране на обекти.
... повечето езици предлагат такъв итератор по-подразбиране, но това не пречи да използваме този патерн и за по-специфични нужди и ситуации.

Iterator Pattern изисква два интерфейса:
- единият е предназначен за обекта който ще се итерира
- а другият за самият етератор

Общо взето при ползването на този патерн се процедира така:
- от даденият обект се извиква метода който връща итератора
- и след това с итератора се обхожда самият обект 


---
Нека да разгледаме примерен код: 

```java
public interface Inventory {
   public Iterator getIterathor();
}
```

```java
public interface Iterator {
    public Item next();
}
```

```java
public class HandsInventory implements Inventory {

    public Item left;
    public Item right;

    public HandsInventory(Item left, Item right){
        this.left = left;
        this.right = right;
    }

    @Override
    public Iterator getIterathor() {
        return new HandsInventoryIterator(this);
    }
}
```

```java
public class HandsInventoryIterator implements Iterator {

    private HandsInventory handsInventory;
    private int index = 0;
    public HandsInventoryIterator(HandsInventory handsInventory){
        this.handsInventory = handsInventory;
    }


    @Override
    public Item next() {
        if(index == 0){
            index++;
            return handsInventory.left;
        }
        else if(index == 1){
            index++;
            return handsInventory.right;
        }
        else{
            return null;
        }
    }
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
    public Iterator getIterathor() {
        if(locked){
            return new NullIterator();
        }
        else{
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

```java
public interface Item {

}
```

```java
public interface Item {

}
```

Имаме:
- общ интерфейс Inventory за класовете които ще бъдат итерирани (при това съвсем семпъл интерфейс , състоящ се от един метод , който връща итератора)
- общ интерфейс Iterator за класовете които ще итерират въпросните обекти
- след това имаме HandsInventory и неговият итератор HandsInventoryIterator и MainInventory и неговият итератор MainInventoryIterator
- в примера ще забележите и NullIterator който е малко странен и излишен на фона на този пример и на фона на тази тема, но все пак го запомнете, защото в следващата статия ще го засегнем отново защото той е пряко свързан с друг интересен патерн.
- и най-накрая имаме interface Item и различните примерни имплементации ItemA, ItemB, ItemC, ItemD, ItemE които не смятам за необходимо да се описват като код. 

---
Тъй като описанието на това какво имаме в примера стана малко обемисто и размито , ще го разгледаме и под друг ъгъл: - интерфейса Inventory е предназначен за обектите което ще се итерират - интерфейса Iterator е предназначен за итерирането на обектите ... забележете че всеки един от обектите който се итерира създава инстанция на СВОЯ итератор и подава себе си като параметър на конструктора на итератора си. 

---
Нека най-накрая да разгледаме и пример за ползването на кода: 
```java
public class Test {

    public static void main(String[] args) {

        //....................
        Item item1 = new ItemA();
        Item item2 = new ItemB();
        Item item3 = new ItemC();
        Item item4 = new ItemD();
        Item item5 = new ItemE();

        //....................
        System.out.println(":::::::::::::");
        System.out.println("HandsInventory iterate:");
        Inventory hands = new HandsInventory(item1, item2);
        Iterator iterathor = hands.getIterathor();
        while (true){
            Item item = iterathor.next();
            if(item == null){
                break;
            }
            System.out.println("Item : "+item.getClass().getSimpleName());
        }


        //....................
        System.out.println(":::::::::::::");
        System.out.println("MainInventory iterate:");
        List<Item> items = new ArrayList<>();
        items.add(item1);
        items.add(item2);
        items.add(item3);
        items.add(item4);
        items.add(item5);

        MainInventory main = new MainInventory(items);
        Iterator iterathor2 = main.getIterathor();
        while (true){
            Item item = iterathor2.next();
            if(item == null){
                break;
            }
            System.out.println("Item : "+item.getClass().getSimpleName());
        }


        //....................
        System.out.println(":::::::::::::");
        System.out.println("MainInventory iterate LOCKED!!!:");
        main.lock();
        Iterator iterathor3 = main.getIterathor();
        while (true){
            Item item = iterathor3.next();
            if(item == null){
                break;
            }
            System.out.println("Item : "+item.getClass().getSimpleName());
        }

    }

}
```

В примера за ползване:

- създаваме няколко примерни Item-а

- създаваме HandsInventory и му подаваме Item left и Item right
- взимаме итератора на HandsInventory и го итерираме

- създаваме MainInventory и му подаваме списък с Item-и
- вземаме итератора на MainInventory и го итерираме

- заключваме MainInventory и отново пробваме да го итерираме 



... както се вижда от примерният код сме внедрили Iterator Pattern за обекти които нямат тривиална и подходяща за обхождане "структура", ако обърнете внимание на HandsInventory ще забележите ,че той се итерира като обикновен ArrayList въпреки че има само тези два атрибута: Item left и Item right


... в заключение можем да потвърдим че използването на този патерн съвсем не е излишно , въпреки че го имате вграден в повечето езици. 



---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...
