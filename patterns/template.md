# Template

Здравейте днес ще разгледаме патерна: Template Method.

Този патерн изисква абстрактен клас при който едната част от методите са имплементирани и в тях се извикват другите методи които НЕ са имплементирани и са задължителни за наследяващите класове. 


---
Тъй като този патерн е сравнително семпъл можем директно да преминем към примерен код: 
```java
public abstract class Entity {

    protected String tableName;
    public boolean save(){

        beforeSave();

        boolean status = true;
        // do
        // ....
        // ...
        // ..
        // .

        if(status){
            successSave();
        }
        else{
            failedSave();
        }

        return status;
    }

    public abstract void beforeSave();
    public abstract void successSave();
    public abstract void failedSave();

}
```

```java
public class UserEntity extends Entity{

    public UserEntity(){
        this.tableName = "user";
    }

    @Override
    public void beforeSave() {
        System.out.println("UserEntity : beforeSave");
    }

    @Override
    public void successSave() {
        System.out.println("UserEntity : successSave");
    }

    @Override
    public void failedSave() {
        System.out.println("UserEntity : failedSave");
    }
}
```

```java
ublic class PostEntity extends Entity{

    public PostEntity(){
        this.tableName = "user";
    }

    @Override
    public void beforeSave() {
        System.out.println("PostEntity : beforeSave");
    }

    @Override
    public void successSave() {
        System.out.println("PostEntity : successSave");
    }

    @Override
    public void failedSave() {
        System.out.println("PostEntity : failedSave");
    }
}
```

Както се вижда от кода имаме:
- един основен абстрактен клас Entity с имплементиран метод save() в който се извикват другите не имплементирани методи beforeSave() , successSave() или failedSave()
- имаме и два наследяващи класа PostEntity и UserEntity които трябва да се "грижат" само за ситуациите beforeSave, successSave или failedSave 


---
Нека сега да разгледаме и пример за ползването им: 
```java
public class Test {

    public static void main(String[] args) {

        System.out.println("------------------");
        System.out.println("UserEntity:");
        Entity user = new UserEntity();
        user.save();

        System.out.println("------------------");
        System.out.println("PostEntity:");
        Entity post = new PostEntity();
        post.save();

    }

}
```

Мисля че примера е съвсем ясен и няма нужда разяснения.

Общо взето този патерн разпределя отговорностите, като тези които могат да се обединят се поставят в основният клас, а другите остават за наследниците ...

---
Използването на този патерн прилича много по същност и предназначение на използването на callback функции ... в наследяващите класове се описват функции/методи който се извикват и използват на точно определено място в кода и така дават възможност да се персонализира основната функционалност. 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...
