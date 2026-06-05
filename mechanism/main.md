# Механизми

Здравейте, днес ще се запознаем с една нова концепция 
за създаване на код.

Представете си че можете да опишете основния 
flow и действия на кода по-генерализиран начин така че
той да се преизползва.

Говоря за подход при който кодът изпълняващ стъпките
и действията е написан отделно, а самата имплементация и конкретика
се подават като набор от параметри и callback функции.

**Механизмът** е този който изпълнява действието и "сценария",
а **имплементацията** са неговите индивидуални и конкретни параметри и callback функции.

Механизмът може да се преизползва многократно, а имплементацията 
е ясно дефинирана и добре структурирана.

---
## Нека разгледаме първо опростен пример:

**Механизъм за листване на данни:**
```
class ListMechanism {

    private implementaion = {

        query : () => {},

        attrs: {},

        relations: {},

        filters: {},
        orders: {},
        page: () => {},
        limit: () => {},

        list : () => {},
        total: () => {},

    }

    private input = {
        attrs: {},
        filters: {},
        orders: {},
        relations: {},
        page: 1,
        limit: 10,
    }

    private output = {
        list: [],
        total: 0,
    }


    public construct(implementaion, input){
        this.implementaion = implementaion;
        this.input = input;
    }

    public execute(){

        const query = implementaion.query();

        // loop run implementaion.attrs
        // pass query for every attr callback

        // loop input.filters and run current implementaion.filters.xxxxx
        // pass query and filter value for every filter callback

        // run ....
        // ....
        // ...

        // run implementaion.list callback and fill output.list

        
        this.output.list = this.implementaion.list(query)
        this.output.total = this.implementaion.total(query)

        return this.output;
    }

}
```

**Имплементация за листване на данни:**
```
const implementaion = {

    query : () => {
        const query = new DbQuery();
        query.table('users');
        return query;
    },

    attrs: {
        id: (query) => {
            query.select('id');
        },
        name: (query) => {
            query.select('name');
        },
    },

    filters: {
        byName: (query, name) => {
            if(name){
                query.where('name', name);
            }
        },
    },
    orders: {},
    page: () => {},
    limit: () => {},

    list : (query) => {
        return query.execute();
    },
    total: (query) => {
        return query.count();
    },

}

```

**Употреба**
```
const listMechanism = new ListMechanism(implementation, input);
const users = listMechanism.execute();

print(users.list);
print(users.total);
```


Имаме **клас** който е **механизмът** и **конкретната имплементация** 
с ясня структора от параметри и callback функции:
- **Механизмът** може да се преизползва многократно — веднъж написан, той знае как да листва данни, без да го интересува дали листваме потребители, продукти или поръчки.
- **Имплементацията** е с ясно дефинирана структура — точно определен набор от функции и параметри. **Тя описва какво се листва, не как се листва**.

Всяко следващо листване ще бъде дефинирано по **същия начин** — същата структура, същите ключове, същите типове callback функции. Разликата ще бъде само в имената на параметрит и кода вътре в самите callbacks.


**Ето листване на продукти със същата структура:**
```
const productsImplementation = {

    query: () => {
        const query = new DbQuery();
        query.table('products');
        return query;
    },

    attrs: {
        id: (query) => { query.select('id'); },
        title: (query) => { query.select('title'); },
        price: (query) => { query.select('price'); },
    },

    filters: {
        byTitle: (query, title) => {
            if (title) {
                query.where('title', title);
            }
        },
        byMaxPrice: (query, maxPrice) => {
            if (maxPrice) {
                query.where('price', '<=', maxPrice);
            }
        },
    },

    orders: {},
    page: () => {},
    limit: () => {},

    list: (query) => query.execute(),
    total: (query) => query.count(),

}
```


---

## Нека сега разгледаме пример с патерн

**Механизъм за Singleton:**
```
class SingletonMechanism {

    private implementation = {
        key: () => '',
        create: () => null,
    }

    private instances = {};

    public construct(implementation) {
        this.implementation = implementation;
    }

    public get() {
        const key = this.implementation.key();
        if (!this.instances[key]) {
            this.instances[key] = this.implementation.create();
        }
        return this.instances[key];
    }

}
```

**Имплементация за Singleton**
```
const implementation = {

    key: () => 'db-connection',

    create: () => {
        const connection = new DbConnection();
        connection.host('localhost');
        connection.port(5432);
        connection.database('myapp');
        return connection;
    },

}
```

**Употреба**
```
const singleton = new SingletonMechanism(implementation);
const db = singleton.get(); 
```

Почти всеки патерн може да бъде реализиран като механизъм 😄. Така няма да има нужда кодът да следва определен набор от файлове и структура за всяка нова реализация — самият механизъм се пише еднократно и само се преизползва.

---

## Нещо малко по-интересно — този път механизъм за процесинг

**Механизъм**
```
class ProcessingMechanism {

    private implementation = {
        context: () => ({}),
        steps: [],
    }

    private input = {}

    private output = {}

    public construct(implementation, input) {
        this.implementation = implementation;
        this.input = input;
    }

    public execute() {
        const context = this.implementation.context();

        for (const step of this.implementation.steps) {
            step(context, this.input, this.output);
        }

        return this.output;
    }

}
```

**Имплементация** (за поръчка)
```
const implementation = {

    context: () => ({
        order: null,
        user: null,
    }),

    steps: [

        (ctx, input, output) => {
            ctx.order = OrderRepository.find(input.orderId);
        },

        (ctx, input, output) => {
            ctx.user = UserRepository.find(ctx.order.userId);
        },

        (ctx, input, output) => {
            PaymentService.charge(ctx.user, ctx.order.total);
        },

        (ctx, input, output) => {
            EmailService.sendConfirmation(ctx.user, ctx.order);
        },

        (ctx, input, output) => {
            output.success = true;
            output.orderId = ctx.order.id;
        },

    ],

}
```

**Употреба**
```
const processing = new ProcessingMechanism(implementation, input);
const output = processing.execute();
```

Този механизъм позволява набор от стъпки — кодът остава семантично разделен, лесно могат да се вмъкнат или допълнят нови стъпки, и може да се преизползва за много различни сценарии.

Не забравяйте — това е само опростен пример. 
Може да се разработи доста по-мощен механизъм, при който:

- да се дефинира и типизира контекстът
- да се валидира input и output
- да се дефинира коя стъпка какво може да чете и записва в контекста, input и output 
- да се валидира дали конкретна стъпка действително е прочела или записала това което се очаква от нея
- всяка стъпка да има два метода — `execute` и `unexecute` — така че ако пропадне някоя стъпка, механизмът да обходи всички вече изпълнени стъпки и да извика `unexecute` върху тях
- да се генерира автоматизиран лог за всяка стъпка
- може да се направи доста удобен дебъгер и визуализатор — тъй като механизмът знае всички стъпки, може да показва тяхното състояние, входните и изходните данни на всяка от тях
- и куп други полезни функционалности — **които веднъж закачени към механизма, веднага започват да работят за всяка една имплементация**

---

## Тук идва мястото на Pipeline

**Комбиниране на механизми в логически структури**

Представете си три основни градивни блока:

- **Processing** — набор от последователни стъпки в общ контекст
- **Switching** — механизъм за разклонения (if/else) който избира следващият блок 
- **Adapting** — свързващ механизъм, който взима output от един блок и го трансформира в input за следващия

```
[ Processing ] --> [ Adapting ] --> [ Switching ] --> [ Processing A ]
                                                  \-> [ Processing B ]
```

Всеки блок е отделна имплементация на съответния механизъм. Така ще могат да се разкачат, разместват и заместват независимо един от друг — без да се пипа кодът на останалите.




