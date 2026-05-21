# Observer

Здравейте отново, сега ще се занимаем с един патерн предназначен за известяване а именно Observer Pattern.

Тук при този патерн от едната страна имаме "разпространител", а от другата "слушатели" които биват известявани при някаква промяна.

Този патерн е един от най-лесно разбираемите защото е много близък по смисъл и предназначение със действителни ситуации.

Представете се че казвате на свой познат да ви се обади когато се случи нещо конкретно и когато, то се случи той ви звънни и ви информира.В случая вашият познат е "разпространителя" а вие сте "слушателя".


---
Observer Pattern изисква основен клас който ще играе ролята на "разпространител" и интерфейс чрез който ще се имплементират и известяват слушателите: 
```java
public class Feed {
    private News news;
    private List<Channel> channels = new ArrayList();

    public Feed() {
    }

    public void addObserver(Channel channel) {
        this.channels.add(channel);
    }

    public void removeObserver(Channel channel) {
        this.channels.remove(channel);
    }

    public void setNews(News news) {
        this.news = news;
        Iterator var2 = this.channels.iterator();

        while(var2.hasNext()) {
            Channel channel = (Channel)var2.next();
            channel.update(this.news);
        }

    }
}
```

```java
public interface Channel {
    void update(News var1);
}
```

```java
public class ChannelFoo implements Channel {
    public ChannelFoo() {
    }

    public void update(News news) {
        System.out.println("FooChannel received news: " + news.getTitle());
    }
}
```

```java
public class ChannelBar implements Channel {
    public ChannelBar() {
    }

    public void update(News news) {
        System.out.println("BarChannel received news: " + news.getTitle());
    }
}
```


... както се вижда от примера имаме клас Feed който държи в себе си списък с channels , съответно можем да добавяме channel и да премахваме channel и най същественото можем да обхождаме и известяваме всички channels

... "от другата страна" имаме общ интерфейс Channel и няколко реализации ChannelFoo, ChannelBar който се закачат към Feed-а и в последствие когато има промяна биват нотифицирани

... тук ключовите неща са метода Feed.setNews и метода Channel.update който е част от интерфейс!

---
Нека да покажем и пример с използването на този патерн: 
```java
public class Test {
    public Test() {
    }

    public static void main(String[] args) {
        Feed feed = new Feed();
        Channel channel1 = new ChannelFoo();
        feed.addObserver(channel1);
        Channel channel2 = new ChannelBar();
        feed.addObserver(channel2);
        News news1 = new News("News title 1", "News text 1");
        feed.setNews(news1);
        News news2 = new News("News title 2", "News text 2");
        feed.setNews(news2);
    }
}
```

- създаваме Feed
- създаваме ChannelFoo и ChannelBar и ги добавяме/закачаме към Feed
- създаваме примерни news1 и news2 и задействаме известяването през метода Feed.setNews();

---
Спектъра на използване на този патерн е доста голям и общо взето трябва да запомните че там където имаме събитие/събития той може да бъде приложен! 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...
