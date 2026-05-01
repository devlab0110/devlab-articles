#  Command


Здравейте, днес ще се запознаем с Command патерн.

При този патерн методите на даден обект се изнасят като отделни класове с общ интерфейс и самият обект се контролира/достъпва именно през тези класове!

Сега някой от вас сигурно се питат:
"Защо пък ми е да правя подобни небивалици и усложнения!"

отговора се крие в думите:
"... като отделни класове с общ интерфейс"

Създаването на отделни класове/команди с еднакъв интерфейс създават ясен, еднотипен и ефективен начин на работа с тях...

Нека да разгледаме даден пример за да стане по-ясно и разбираемо: 


--------------------
```java
public interface Command {
    public void execute();
    public void unexecute();
}
```


--------------------
```java
public class SoundMaxCommand implements Command {

    SoundDevice sound;

    public SoundMaxCommand(SoundDevice sound){
        this.sound = sound;
    }

    @Override
    public void execute() {
        this.sound.volume(100);
    }

    @Override
    public void unexecute() {
        this.sound.volume(50);
    }
}
```


--------------------
```java
public class SoundMinCommand implements Command {

    SoundDevice sound;

    public SoundMinCommand(SoundDevice sound){
        this.sound = sound;
    }

    @Override
    public void execute() {
        this.sound.volume(10);
    }

    @Override
    public void unexecute() {
        this.sound.volume(50);
    }
}
```


--------------------
```java
public class SoundOffCommand implements Command {

    SoundDevice sound;

    public SoundOffCommand(SoundDevice sound){
        this.sound = sound;
    }

    @Override
    public void execute() {
        this.sound.off();
    }

    @Override
    public void unexecute() {
        this.sound.on();
    }
}
```


--------------------
```java
public class SoundOnCommand implements Command {

    SoundDevice sound;

    public SoundOnCommand(SoundDevice sound){
        this.sound = sound;
    }

    @Override
    public void execute() {
        this.sound.on();
    }

    @Override
    public void unexecute() {
        this.sound.off();
    }
}
```


--------------------
```java
public class LightDevice {

    public void on(){
        System.out.println("Light: on!");
    }
    public void off(){
        System.out.println("Light: off!");
    }
    public void color(String color){
        System.out.println("Light set color: "+color + "!");
    }

}
```


--------------------
```java
public class SoundDevice {

    public void on(){
        System.out.println("Sound: on!");
    }
    public void off(){
        System.out.println("Sound: off!");
    }
    public void volume(int percentage){
        System.out.println("Sound set volume to: " + percentage +"% !");
    }

}
```


--------------------
```java
public class LightBlueCommand implements Command {

    LightDevice light;

    public LightBlueCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.color("blue");
    }

    @Override
    public void unexecute() {
        this.light.color("white");
    }
}
```


--------------------
```java
public class LightGreenCommand implements Command {

    LightDevice light;

    public LightGreenCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.color("green");
    }

    @Override
    public void unexecute() {
        this.light.color("white");
    }
}
```


--------------------
```java
public class LightOffCommand implements Command {

    LightDevice light;

    public LightOffCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.off();
    }

    @Override
    public void unexecute() {
        this.light.on();
    }
}
```


--------------------
```java
public class LightOnCommand implements Command {

    LightDevice light;

    public LightOnCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.on();
    }

    @Override
    public void unexecute() {
        this.light.off();
    }
}
```


--------------------
```java
public class LightRedCommand implements Command {

    LightDevice light;

    public LightRedCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.color("red");
    }

    @Override
    public void unexecute() {
        this.light.color("white");
    }
}
```


--------------------
```java
public class LightWhiteCommand implements Command {

    LightDevice light;

    public LightWhiteCommand(LightDevice light){
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.color("white");
    }

    @Override
    public void unexecute() {
        this.light.color("white");
    }
}
```

--------------------
Въпреки че примерът стана доста обширен, мисля че описанието му си остава просто и ясно , защото имаме:
- един интерфейс Command
- един куп класове/команди следващи въпросният интерфейс
- две "устройства" LightDevice и SoundDevice които се контролират от различните Command и това е


Силата на този патерн се вижда най-ясно когато започнем да го ползваме: 

Manager.java
```java
public class Manager {

    private List<Command> commands;

    public Manager(List<Command> commands){
        this.commands = commands;
    }

    public void run(){
        for(Command command : commands){
            command.execute();
        }
    }

}

```


--------------------
Test.java
```java
public class Test {

    public static void main(String[] args) {

        System.out.println("------------------");
        System.out.println("Prepare commands:");
        System.out.println("- light on");
        System.out.println("- sound on");
        System.out.println("");
        System.out.println("- light blue");
        System.out.println("- light green");
        System.out.println("- light red");
        System.out.println("");
        System.out.println("- sound max");
        System.out.println("");
        System.out.println("- light off");
        System.out.println("- sound off");
        System.out.println("");

        LightDevice light = new LightDevice();
        SoundDevice sound = new SoundDevice();

        List<Command> commands = new ArrayList<>();

        // light on / sound on
        commands.add(new LightOnCommand(light));
        commands.add(new SoundOnCommand(sound));


        // light blue / light green / light red
        commands.add(new LightBlueCommand(light));
        commands.add(new LightGreenCommand(light));
        commands.add(new LightRedCommand(light));

        // sound max
        commands.add(new SoundMaxCommand(sound));

        // light off / sound off
        commands.add(new LightOffCommand(light));
        commands.add(new SoundOffCommand(sound));


        System.out.println("MANAGER ------------------");
        System.out.println("running:");
        Manager manager = new Manager(commands);
        manager.run();

    }

}
```

--------------------
Тук имаме един Manager който приема списък с команди и в последствие ги изпълнява без да се интересува, какво точно правят тези команди , и какво точно контролират/използват те ...

В тестовият клас просто подготвяме този списък с команди ...

Силата на Command патерна е че той унифицира използването на най-различни обекти чрез общ интерфейс и набор от класове, така че изпълнението на команди да може да се автоматизира и допълва с лекота (без да се променя старият код) 



--------------------
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...


