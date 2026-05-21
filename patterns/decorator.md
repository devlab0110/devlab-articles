#  Decorator


Здравейте, сега ще се занимаваме с декориране :)

Decorator Pattern е предназначен за допълване, промяна и оформление на конкретен "компонент".

Можем да разглеждаме ситуацията като наличие на някаква "заготовка" която може да се оформя допълва и т.н. в различни комбинации.

Представете си че имате продукт който се продава с различни добавки примерно кафе , кафе със сметана , кафе със мляко и т.н. ... в случая кафето е основният продукт, а сметаната или млякото са добавките

Decorator Pattern изисква създаването на общ интерфейс както за основният продукт така и за тези които играят ролята на добавки/оформление ... добавките/оформлението от своя страна разполагат с абстрактен клас който приема като параметър "нещото" което ще декорира.

Общо взето имаме общ интерфейс , "от едната страна" основен компонент , а "от другата страна" отново компонентни които обаче приемат други компоненти и ги декорират...

---
Нека да разгледаме този примерен код: 
```java
public interface iProduct {
    public String getName();
    public String getDesc();
    public int getPrice();
}
```


```java
public class Product implements iProduct {

    private String name;
    private String desc;
    private int price;

    public Product(
            String name,
            String desc,
            int price
    ){
        this.name = name;
        this.desc = desc;
        this.price = price;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDesc() {
        return desc;
    }

    @Override
    public int getPrice() {
        return price;
    }
}
```

```java
public abstract class Decorator implements iProduct {

    protected iProduct product;

    protected String name;
    protected String desc;
    protected int price;

    public Decorator(iProduct product) {
        this.product = product;
    }

    @Override
    public String getName() {
        return product.getName() + ", "+ name;
    }

    @Override
    public String getDesc() {
        return product.getDesc() + ", "+ desc;
    }

    @Override
    public int getPrice() {
        return product.getPrice() + price;
    }

}
```

```java
public class DecoratorBar extends Decorator{

    public DecoratorBar(iProduct product) {
        super(product);
        this.name = "bar";
        this.desc = "bar desc";
        this.price = 2;
    }

}
```

```java
public class DecoratorFoo extends Decorator{

    public DecoratorFoo(iProduct product) {
        super(product);
        this.name = "foo";
        this.desc = "foo desc";
        this.price = 1;
    }

}
```

```java
public class DecoratorRaa extends Decorator {

    public DecoratorRaa(iProduct product) {
        super(product);
        this.name = "raa";
        this.desc = "raa desc";
        this.price = 5;
    }

}
```

В примера имаме:
- общ интерфейс iProduct
- основен компонент Product
- абстрактен Decorator
- DecoratorFoo, DecoratorBar и DecoratorRaa който играят ролята на самите декоратори.

---
Нека сега да разгледаме и премерен код с използването на този патерн:
```java
public class Test {

    public static void main(String[] args) {

        System.out.println("::::::::::::");
        System.out.println("productCafe:");
        iProduct productCafe = new Product(
                "Cafe" ,
                "Cafe desc" ,
                10
        );
        System.out.println("name: "+productCafe.getName());
        System.out.println("desc: "+productCafe.getDesc());
        System.out.println("price: "+productCafe.getPrice());
        System.out.println("");

        System.out.println("::::::::::::");
        System.out.println("productDecoratedA:");
        System.out.println("- productCafe");
        System.out.println("- DecoratorFoo");
        System.out.println("- DecoratorRaa");
        iProduct productDecoratedA = new DecoratorRaa(
                new DecoratorFoo(
                        productCafe
                )
        );
        System.out.println("name: "+productDecoratedA.getName());
        System.out.println("desc: "+productDecoratedA.getDesc());
        System.out.println("price: "+productDecoratedA.getPrice());
        System.out.println("");


        System.out.println("::::::::::::");
        System.out.println("productDecoratedB:");
        System.out.println("- productCafe");
        System.out.println("- DecoratorRaa");
        System.out.println("- DecoratorBar");
        System.out.println("- DecoratorFoo");
        iProduct productDecoratedB = new DecoratorFoo(
                new DecoratorBar(
                        new DecoratorRaa(
                                productCafe
                        )
                )
        );
        System.out.println("name: "+productDecoratedB.getName());
        System.out.println("desc: "+productDecoratedB.getDesc());
        System.out.println("price: "+productDecoratedB.getPrice());
        System.out.println("");


    }

}
```

... във тестовият код имаме три различни варианта:

**1-ви вариант:** използваме просто Product и това е

**2-ри вариант:** използваме DecoratorRaa , DecoratorFoo и Product в случая DecoratorRaa "декорира" DecoratorFoo , а DecoratorFoo от своя страна декорира Product
... забележете начина на създаване на обектите и тяхното предаване като параметри
... едното обвива другото , другото обвива третото и т.н. докато не се стигне до основният компонент тоест докато не се стигне до "заготовката".

**3-ти вариант:** имаме РАЗНОВИДНОСТ на вторият, но с повече компоненти и в различна подредба! 


---
Нека сега да се опитаме да обобщим предимствата и начина на използване: - можете да правите всякакви вариации на декориране и оформление - можете да добавяте нови декоратори без да се налага да променяте останалият код - всеки декоратор може да "обвива" други декоратори или основният компонент - основният компонент може само да бъде обвиван, тоест той е основата - декорирането като инициализация и като употреба става рекурсивно , тоест единият декоратор извиква същият метод на този който обвива , другият от своя страна също извиква същият метод на този който обвива и т.н. ... докато не се стигне до основата. 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...

