const obj =
{
    project: {

        name: "Project One",
        systemName: "project-one",
        author: "manifest.org",
        desc: "",
        roles: {
            manager: {},
            tester: {},
            designer: {},
            implemetator: {},
            builder: {},
            devops: {},
        }

    },

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

        }
    },


    teams: [

        {
            name: "Ivan Ivanov",
            email: "ivan.ivanov@manifest.org",
            credentials: "...",
            roles: [
                'manifest.project.roles.implemetator'
            ]
        }
    ],

    data: {

        types: {

            id: {
                type: 'int',
                autoincrement: 'auto',
            },

            title_1: {
                type: 'string',
                min: 0,
                max: 255,
            },

            email: {
                type: 'string',
                mode: 'email',
                min: 0,
                max: 255,
            },

            roles: {
                type: 'string',
                mode: 'enum',
                enum: {
                    admin: {},
                    user: {}
                }
            },
        },

        objects: {

            user: {
                id: 'manifest.project.types.id',
                email: 'manifest.data.types.email',
                role: 'manifest.data.types.roles',
            },

            news: {
                id: 'manifest.project.types.id',
                title: 'manifest.data.types.title_1',
            },
        }

    },

    beckend: {

        db: {
            name: 'manifest.project.systemName',
            migrations: {
                '1': {
                    type: 'table.create',
                    table: 'users',
                    columns: {
                        id: 'manifest.data.objects.user.id',
                        email: 'manifest.data.objects.user.email',
                        role: 'manifest.data.objects.user.role',
                    }
                },
                '2': {
                    type: 'table.create',
                    table: 'news',
                    columns: {
                        id: 'manifest.data.objects.news.id',
                        title: 'manifest.data.objects.news.title',
                    }
                },
            }
        },

        api: {

            newsAdd: {
                type: 'POST',
                route: 'news/add',
                validation: {
                    body: {
                        title: 'manifest.data.objects.news.title',
                    }
                },
                access: {
                    admin: 'manifest.data.objects.user.role.admin',
                }

            },

        },


    },

}