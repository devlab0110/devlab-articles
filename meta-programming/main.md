# manifest-programming

Здравейте днес ще се запознаем с един нов начин/ подход
за проектиране и разрабатване на софтуер. 

Основната идея се състои в
това всичко свързано с даден проект , дори и самият код на праекта да се описват изначално във манифеста на праекта.
Тоест при манифестното проектиране източника на информация е един
всичко започва там и всичко менава през него.

Манифеста на праекта е просто едно огромно "дърво" с данни 
във което се описват и свързвят различните аспекти на проекта
като типа на данните , структорите от данни , тяхната свързаност , логиката и процесите които со извършва с тези данни , общо взето всичко
което трябва да се знае за проекта.


Потенциала на манифестното програмиране и описването
на нещата във машинен/семантичет формат СЕ състои в това
че така голяма част от работните процеси могат да се автоматизират и всички свързаности могат да се  проследяват с лекота.

За целта ще трябва да се изработят набор от инстроменти / tools:

- manifest api
- manifest ui
- manifest builders
- manifest testers
- manifest ci-cd

**manifest api**: сървър който редактира и чете от manifest.json 

**manifest ui**:  уеб базиран интерефейс през който могат 
да се разглеждат и редактират различните данни от manifest.json  през 
manifest api

**manifest builders**: набор от скриптове който ще иблдват кода на проекта като използват данните от manifest.json  през 
manifest api

**manifest testers** набор от скриптове който ще могат да тестват
билднатият код ато използват данните от manifest.json  през 
manifest api

**manifest ci-cd** набор от скриптове който ще могат деплойват
билднатият код там където трябва



## Примери:

Нека да започнем със прости примери за да стане по ясно

Имаме един manifest.json файл във който ще описваме всичко 
*(за да е по опросетон ще показвам по отделно различни части от този примерен файл)*


***
**manifest.json >>  "project"**
```
project: {

	name: "Project One",
	author: "manifest.org",
	desc: "",

},
```

***
**manifest.json >>  "manager"**
```
manager: {
    name: "Ivan Ivanov",
    email: "ivan.ivanov@manifest.org",
    credentials: {
        for_manifest_ui: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_MANIFEST_UI_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_MANIFEST_UI_PASS",
        },
        for_github: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_GITHUB_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_GITHUB_PASS",
        },

        for_test_server: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_TEST_SERVER_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_TEST_SERVER_PASS",
        },
        for_test_website: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_TEST_WEBSITE_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_TEST_WEBSITE_PASS",
        },

        for_live_server: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_LIVE_SERVER_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_LIVE_SERVER_PASS",
        },
        for_live_website: {
            user: "EVN.MANAGER_CREDENTIALS_FOR_LIVE_WEBSITE_USER",
            pass: "EVN.MANAGER_CREDENTIALS_FOR_LIVE_WEBSITE_PASS",
        },

    }
},
```

***
**manifest.json >>  "teams"**
```
teams: [

    {
        name: "Ivan Ivanov",
        email: "ivan.ivanov@manifest.org",
        credentials: "...",
        roles: [

        ]
    }
],
```




