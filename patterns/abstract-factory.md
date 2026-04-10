# Abstract Factory


Здравейте, днес отново продължаваме с фабрики.

Този патерн се различава и определя с това че е създаден за да може да използваме групи от фабрики за обекти от един и същ тип.

Abstract Factory изисква абстрактен клас с методи за създаване на набор от обекти който абстрактен клас може да се имплементира от множество класове/фабрики.

Идеята е да можем да създаваме еднакъв набор обекти с еднакво предназначение, но с различна имплементация.

Представете си че трябва да създадете GUI приложение, което да може да работи под windows, linux и mac ... тук идва мястото за Abstract Factory:


--------------------
Factory.java
```java
public abstract class Factory {

    public abstract UIElement createWindow();
    public abstract UIElement createButton();
    public abstract UIElement createAlert();
    public abstract UIElement createConfirm();
    public abstract UIElement createPopup();

}
```


--------------------
WindowsFactory.java
```java
import com.devlab.abstract_factory.example_ui.windows.*;

public class WindowsFactory extends Factory {


    @Override
    public UIElement createWindow() {
        System.out.println("Windows Window!");
        return new Window();
    }

    @Override
    public UIElement createButton() {
        System.out.println("Windows Button!");
        return new Button();
    }

    @Override
    public UIElement createAlert() {
        System.out.println("Windows Alert!");
        return new Alert();
    }

    @Override
    public UIElement createConfirm() {
        System.out.println("Windows Confirm!");
        return new Confirm();
    }

    @Override
    public UIElement createPopup() {
        System.out.println("Windows Popup!");
        return new Popup();
    }
}
```


--------------------
LinuxFactory.java 
```java
import com.devlab.abstract_factory.example_ui.linux.*;

public class LinuxFactory extends Factory {


    @Override
    public UIElement createWindow() {
        System.out.println("Linux Window!");
        return new Window();
    }

    @Override
    public UIElement createButton() {
        System.out.println("Linux Button!");
        return new Button();
    }

    @Override
    public UIElement createAlert() {
        System.out.println("Linux Alert!");
        return new Alert();
    }

    @Override
    public UIElement createConfirm() {
        System.out.println("Linux Confirm!");
        return new Confirm();
    }

    @Override
    public UIElement createPopup() {
        System.out.println("Linux Popup!");
        return new Popup();
    }
}
```

--------------------
MacFactory.java 
```java
import com.devlab.abstract_factory.example_ui.mac.*;

public class MacFactory extends Factory {


    @Override
    public UIElement createWindow() {
        System.out.println("Mac Window!");
        return new Window();
    }

    @Override
    public UIElement createButton() {
        System.out.println("Mac Button!");
        return new Button();
    }

    @Override
    public UIElement createAlert() {
        System.out.println("Mac Alert!");
        return new Alert();
    }

    @Override
    public UIElement createConfirm() {
        System.out.println("Mac Confirm!");
        return new Confirm();
    }

    @Override
    public UIElement createPopup() {
        System.out.println("Mac Popup!");
        return new Popup();
    }
}
```

--------------------
Имаме:
- абстрактен клас Factory
- и три фабрики наследяващи Factory: WindowsFactory, LinuxFactory и MacFactory
... забележете че всяка една от трите фабрики създава еднакъв тип UIElement-и , но те са от РАЗЛИЧЕН package, тоест имат различна имплементация.

Нека сега да разгледаме и опростен пример за използване им:
```java
public class Test {

    public static void main(String[] args) {

        Factory factory = null;
        String os = "linux";

        if(os.equals("windows")){
            factory = new WindowsFactory();
        }
        else if(os.equals("linux")){
            factory = new LinuxFactory();
        }
        else if(os.equals("mac")){
            factory = new MacFactory();
        }

        if(factory != null){
            UIElement window  = factory.createWindow();
            UIElement button  = factory.createButton();
            UIElement alert   = factory.createAlert();
            UIElement confirm = factory.createConfirm();
            UIElement popup   = factory.createPopup();
        }
        else{
            System.out.println("Not supported os!");
        }

    }

}
```


Abstract Factory ни позволя с лекота да превключваме към друга група от обекти , също така функционалността може да се разширява без да се променя вече написаният код


При Factory Method имаме отделни фабрики за отделните обекти.

При Abstract Factory имаме отделни фабрики за отделни групи от обекти който споделят еднакво предназначение, но имат различна имплементация.


--------------------
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...