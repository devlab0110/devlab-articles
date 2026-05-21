# Proxy

Здравейте, сега ще се занимаем с Proxy Pattern.

Този патерн наподобява малко на Adapter патерна, но има съществена разлика която се изразява в това че Proxy класа има същите методи (има същият интерфейс) както на класа който "свързва".

На практика Proxy-то застава между "клиента" и целевият клас и просто препредава "заявките" към целевият клас.

На пръв поглед изглежда малко безсмислено начинание , но ако го разгледаме нещата в по-дълбок контекст , ще забележим, че така можем да добавим (динамично) допълнителна функционалност към целевия клас.

... представете си че имате клас чрез който достъпвате някакви данни , но искате да приложите различни методи и начини за удостоверяване на достъпа до тeзи данни
... вместо да променяте логиката и кода на класа за данните може "пред него" да поставяте (динамично) едно прокси което да реализира въпросният достъп и удостоверяване. 

---
Proxy Pattern-а изисква общ интерфейс между проксито и целевият клас: 
```java
public interface Internet {
    public void connectTo(String serverhost) throws Exception;
}
```

```java
public class ProxyInternet implements Internet
{
    private Internet internet = new RealInternet();
    private static List<String> bannedSites;

    static
    {
        bannedSites = new ArrayList<String>();
        bannedSites.add("efg.com");
        bannedSites.add("iop.com");
        bannedSites.add("ijk.com");
        bannedSites.add("lnm.com");
    }

    @Override
    public void connectTo(String serverhost) throws Exception
    {
        if(bannedSites.contains(serverhost.toLowerCase()))
        {
            throw new Exception("Access Denied");
        }

        internet.connectTo(serverhost);
    }

}
```

```java
public class RealInternet  implements Internet
{
    @Override
    public void connectTo(String serverhost)
    {
        System.out.println("Connecting to "+ serverhost);
    }
}
```

Имаме:
- interface-а Internet
- прокси ProxyInternet
- целиви клас RealInternet
... както сами виждате от примера ProxyInternet има рестриктивна роля за определен списък от домейни и реално ще стои пред целевият клас , който извършва основната дейност. 


---
Нека сега да разгледаме и пример за използването на горе посоченият код: 
```java
public class Test {

    public static void main(String[] args) {

        Internet internet = new ProxyInternet();
        try
        {
            internet.connectTo("google.org");
            internet.connectTo("efg.com");
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }

    }

}
```

... в показаният пример се използва директно проксито за да се достъпят някакви домейни и ако някой от подадените домейни е в bannedSites по-нататъшното изпълнение на кода се прекратява.
... добавили сме допълнителна логика към основният клас без да го променяме. 


---
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...