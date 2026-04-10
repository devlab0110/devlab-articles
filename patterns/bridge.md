#  Bridge


Здравейте, днес ще се занимаем с Bridge pattern.

Този патерн осъществява "мост" между различни групи от класове.

Ако искаме да осъществим унифицирана връзка на взаимодействие между една група класове и друга група класове и искаме да можем да комбинираме всеки клас от едната група със всеки клас от другата група, то тогава ни е нужен Bridge pattern.

В общи линии Bridge pattern-а прави мост между две групи от класове.

Този патерн изисква най-вече interface за класовете, които на практика ще играят ролята на мост между едната група и другата група

Нека да разгледаме този примерен код за да стане по-ясно: 


--------------------
View.java 
```java
public abstract class View {

    Resource resourse;

    public View(Resource resourse){
        this.resourse = resourse;
    }
    public abstract String getHtml();
  
}
```

--------------------
ViewDetails.java
```java
public class ViewDetails extends View {

    public ViewDetails(Resource resource) {
        super(resource);
    }

    @Override
    public String getHtml() {

        System.out.println("------------------");
        System.out.println("View Details Bridge: ");

        String html = "";
        html += "<section>";

            System.out.print("resource.title <> ");
            html += "<h2>"+resourse.getTitle()+"</h2>";

            System.out.print("\nresource.image <> ");
            html += "<img src="+resourse.getImage()+">";

            System.out.print("\nresource.text <> ");
            html += "<p>"+resourse.getText()+"</p>";

            System.out.print("\n\n");

        html += "</section>";
        return html;
    }
}
```

--------------------
ViewListItem.java
```java
public class ViewListItem extends View {

    public ViewListItem(Resource resource) {
        super(resource);
    }

    @Override
    public String getHtml() {

        System.out.println("------------------");
        System.out.println("View List Item Bridge: ");

        String html = "";
        html += "<div>";

            System.out.print("resource.image <> ");
            html += "<img src="+resourse.getImage()+">";

            System.out.print("\nresource.title <> ");
            html += "<h2>"+resourse.getTitle()+"</h2>";

            System.out.print("\n\n");

        html += "</div>";
        return html;
    }
}
```

--------------------
Resource.java
```java
public interface Resource {
    public String getTitle();
    public String getText();
    public String getImage();
}
```

--------------------
AlbumResource.java
```java
public class AlbumResource implements Resource {

    Album album;
    public AlbumResource(Album album){
        this.album = album;
    }

    @Override
    public String getTitle() {
        return album.getName();
    }

    @Override
    public String getText() {
        return album.getDesc();
    }

    @Override
    public String getImage() {
        return album.getCover();
    }
}
```

--------------------
ArtistResource.java
```java
public class ArtistResource implements Resource {

    Artist artist;
    public ArtistResource(Artist artist){
        this.artist = artist;
    }

    @Override
    public String getTitle() {
        return artist.getNames();
    }

    @Override
    public String getText() {
        return artist.getBio();
    }

    @Override
    public String getImage() {
        return artist.getPhoto();
    }
}
```

--------------------
BannerResource.java
```java
public class BannerResource implements Resource {

    Banner banner;
    public BannerResource(Banner banner){
        this.banner = banner;
    }

    @Override
    public String getTitle() {
        return banner.getTitle();
    }

    @Override
    public String getText() {
        return banner.getText();
    }

    @Override
    public String getImage() {
        return banner.getImage();
    }
}
```

--------------------
BookResource.java
```java
public class BookResource implements Resource {

    Book book;
    public BookResource(Book book){
        this.book = book;
    }

    @Override
    public String getTitle() {
        return book.getTitle();
    }

    @Override
    public String getText() {
        return book.getDesc();
    }

    @Override
    public String getImage() {
        return book.getCover();
    }
}
```

--------------------
Album.java
```java
public class Album {

    private String name;
    private String cover;
    private String desc;

    public Album(String name, String cover, String desc){
        this.name = name;
        this.cover = cover;
        this.desc   = desc;
    }

    public String getName() {
        System.out.print("album.name");
        return name;
    }

    public String getCover() {
        System.out.print("album.cover");
        return cover;
    }

    public String getDesc() {
        System.out.print("album.desc");
        return desc;
    }
}
```

--------------------
Artist.java 
```java
public class Artist {

    private String names;
    private String photo;
    private String bio;

    public Artist(String names, String photo, String bio){
        this.names = names;
        this.photo = photo;
        this.bio   = bio;
    }

    public String getNames() {
        System.out.print("artist.names");
        return names;
    }

    public String getPhoto() {
        System.out.print("artist.photo");
        return photo;
    }

    public String getBio() {
        System.out.print("artist.bio");
        return bio;
    }
}
```

--------------------
Banner.java
```java
public class Banner {

    private String title;
    private String image;
    private String text;

    public Banner(String title, String image, String text){
        this.title = title;
        this.image = image;
        this.text  = text;
    }

    public String getTitle() {
        System.out.print("banner.title");
        return title;
    }

    public String getImage() {
        System.out.print("banner.image");
        return image;
    }

    public String getText() {
        System.out.print("banner.text");
        return text;
    }
}
```

--------------------
Book.java
```java
public class Book {

    private String title;
    private String cover;
    private String desc;

    public Book(String title, String cover, String desc){
        this.title = title;
        this.cover = cover;
        this.desc   = desc;
    }

    public String getTitle() {
        System.out.print("book.title");
        return title;
    }

    public String getCover() {
        System.out.print("book.cover");
        return cover;
    }

    public String getDesc() {
        System.out.print("book.desc");
        return desc;
    }
}
```

--------------------
Имаме:
- едната група: abstract View с ViewDetails и ViewListItem
- "мостът" който се състои в: interface Resource заедно с AlbumResource, ArtistResource, BannerResource, BookResource
- и другата група: Album, Artist, Banner и Book

Нека сега обърнем внимание на interface Resource
... благодарение на него имаме унифициран достъп до всякакви класове от другата група
... благодарение на него ViewDetails и ViewListItem не се интересуват какво стои от другата страна на моста защото те го до стъпват чрез interface Resource

Тук е хубаво да се обърне внимание и на abstract View ... този абстрактен клас не изглежда съвсем задължителен за патерна , но също е редно да присъства защото унифицира ViewDetails и ViewListItem като такива които ползват Resource. 


Нека сега да разгледаме и пример за ползване на патерна: 
```java
public class Test {

    public static void main(String[] args) {

        String html = "";


        // prepare entities ...
        Artist artist = new Artist("Eminnem", "1.jpg", "Eminnem is ...");
        Book   book   = new Book("A Little Life", "2.jpg", "The book is ...");
        Album  album  = new Album("HAPPIER THAN EVER", "43.jpg", "New Billie Eilish album is ...");
        Banner banner = new Banner("Coca Cola", "32.jpg", "");


        // prepare resources ...
        ArtistResource artistR = new ArtistResource(artist);
        BookResource   bookR   = new BookResource(book);
        AlbumResource  albumR  = new AlbumResource(album);
        BannerResource bannerR = new BannerResource(banner);


        // html ViewDetails ...
        View details = new ViewDetails(artistR);
        html += details.getHtml();



        // loop html ViewListItem ...
        List<Resource> resources = new ArrayList<>();
        resources.add(artistR);
        resources.add(bookR);
        resources.add(albumR);
        resources.add(bannerR);
        for(Resource resource : resources){
            View item = new ViewListItem(resource);
            html += item.getHtml();
        }



        // html ....
        System.out.println("------------------");
        System.out.println("html");
        System.out.println(html);
```

- създаваме няколко обекта от едната група: Artist, Book, Album, Banner
- създаване съответните Resource като им подаваме обектите от едната група
- създаваме съответните View и им подаваме Resource
В примера за ползване се вижда още по-ясно как Resource осъществява мостът между Artist, Book, Album, Banner И ViewDetails и ViewListItem 



--------------------
В това [repository](https://github.com/devlab0110/design-patterns-java-examples) може да откриете повече примери за използването на Design patterns ...

