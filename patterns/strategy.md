# Strategy

Здравейте в тази статия ще се занимаем с Strategy Pattern.

Това е патерн който решава "проблеми" свързани с изпълнението на конкретна "дейност" която има различни начини на реализиране.

Тоест, ако имате дадена "дейност" която може да се реализира по различни начини то тогава Strategy Pattern е вашето решение!

Strategy Pattern изисква "общ интерфейс" който се имплементира за всяка от различните реализации на конкретната дейност.Също така самата "реализация" обикновено се "инжектира" като параметър там където ще бъде използвана! 



---
Представете си че трябва да реализирате функционалност с която да се плащат поръчките в онлайн магазин ...
... вероятно тази функционалност ще трябва да се справя с плащането през карта , през paypal , през revolut и т.н.
В тази ситуация може да създадете общ интерфейс който се споделя от различните реализации ... и след това да имплементирате различните начини за плащане: 
```java
public interface PaymentStrategy {
    public void pay(int amount);
}
```

```java
public class CreditCardStrategy implements PaymentStrategy{

    private String names;
    private String cardNumber;
    private String cvv;
    private String dateOfExpire;

    public CreditCardStrategy(
            String names,
            String cardNumber,
            String cvv,
            String dateOfExpire
    ){
        this.names        = names;
        this.cardNumber   = cardNumber;
        this.cvv          = cvv;
        this.dateOfExpire = dateOfExpire;

    }

    @Override
    public void pay(int amount) {
        System.out.println(" CreditCardStrategy pay: " + amount);
    }
}
```

```java
public class PaypalStrategy implements PaymentStrategy{

    private String email;
    private String pass;


    public PaypalStrategy(
            String email,
            String pass
    ){
        this.email  = email;
        this.pass   = pass;
    }

    @Override
    public void pay(int amount) {
        System.out.println(" PaypalStrategy pay: " + amount);
    }
}
```

```java
public class RevolutStrategy  implements PaymentStrategy{

    private String email;
    private String pass;


    public RevolutStrategy(
            String email,
            String pass
    ){
        this.email  = email;
        this.pass   = pass;
    }

    @Override
    public void pay(int amount) {
        System.out.println(" RevolutStrategy pay: " + amount);
    }
}
```
Както се вижда от кода PaymentStrategy е интерфейса ,а CreditCardStrategy, PaypalStrategy, RevolutStrategy са различните начини на плащане ... 



---
Сега нека да разгледаме и някакъв пример за внедряването им: 
```java
public class Cart {

    //List of items
    List<Item> items;

    public Cart(){
        this.items=new ArrayList<Item>();
    }

    public void addItem(Item item){
        this.items.add(item);
    }

    public void removeItem(Item item){
        this.items.remove(item);
    }

    public int calculateTotal(){
        int sum = 0;
        for(Item item : items){
            sum += item.getPrice();
        }
        return sum;
    }

    public void pay(PaymentStrategy paymentMethod){
        int amount = calculateTotal();
        paymentMethod.pay(amount);
    }
}
```

```java
public class Item {

    private String upcCode;
    private int price;

    public Item(String upcCode, int price){
        this.upcCode = upcCode;
        this.price = price;
    }

    public String getUpcCode() {
        return upcCode;
    }

    public int getPrice() {
        return price;
    }
}
```
... тук имаме два класа Cart (количка за пазаруване) и Item-и (с които се пълни количката) ... по интересното тук обаче е метода pay на класа Cart който получава като параметър PaymentStrategy и на практика може да реализира самото плащане без да се "интересува" от начина на плащане! 


---
Сега можем да пристъпим и към самото ползване на патерна, което е съвсем ясно и нагледно , но все пак, ако трябва да бъдем последователни и изчерпателни би следвало да покажем и него: 
```java
public class Test {

    public static void main(String[] args) {
      
        Cart cart = new Cart();

        Item item1 = new Item("1234",11);
        Item item2 = new Item("5678",33);

        cart.addItem(item1);
        cart.addItem(item2);

        //pay by credit card
        cart.pay(new CreditCardStrategy(
                "Ivan Ivanov",
                "3322167890123456",
                "455",
                "12/21"
        ));

        //pay by paypal
        cart.pay(new PaypalStrategy(
                "my@example.com",
                "123"
        ));

        //pay by revolut
        cart.pay(new RevolutStrategy(
                "my@example.com",
                "123"
        ));
    }

}
```

Както се вижда от кода:
- създаваме нова количка
- добавяме два Item-а
- и извършваме три различни плащания
... които просто принтират своето "име" в конзолата

Имайте в предвид че показаният код е ПРИМЕРЕН и доста опростен с цел по-голяма нагледност и яснота!!! 


---
Въпреки че статията стана твърде голяма ще си позволя да ви споделя и още един пример за използването на Strategy Pattern:
... представете си че в една игра трябва да се реализират множество различни видове NPC-та със различни по сила и тип възможности
... тук отново се виджа МЯСТОТО на Strategy Pattern-а
... тук отново можете да класифицирате възможностите по групи (примерно: moving, jumping, shooting и т.н.) и да създадете следните интерфейси: MoveStrategy, JumpStrategy, ShootStrategy
... след това за всеки един от тези интерфейси да създадете различни реализации толкова колкото са необходими
... и накрая да инжектирате всякакви вариации и комбинации на въпросните MoveStrategy, JumpStrategy, ShootStrategy към един конкретен клас class Npc
... тоест този патерн ще ви даде възможността да създавате с лекота N на брой вариации на Npc-а като просто "инжектирате" различни начини за реализация на дейностите


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...























