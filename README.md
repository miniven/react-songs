## API

0. Получение списка песен
1. Добавление песни
2. Изменение песни
3. Удаление песни + Удаление песни из листов
⋅⋅⋅Бэк: Удаляется песня и удаляется из листов
⋅⋅⋅Фронт: приходит массив листов, откуда её удалить, проходим по листам, удаляем из них эту песню и потом саму песню
4. Получение списка листов
5. Добавление листа + Изменение даты последнего исполнения этих песен
⋅⋅⋅Бэк: добавляется лист, у песен из листа меняется дата песен
⋅⋅⋅Фронт: при успехе на бэке добавляется лист и меняется дата песен
6. Изменение листа + Изменение даты последнего исполнения песни
⋅⋅⋅Бэк: меняется лист, если были удалены песни, то меняем их дату
⋅⋅⋅Фронт: при успехе приходит объект: { [ID песни]: дата исполнения }. Меняем лист и песни из полученного списка
7. Удаление листа + Изменение даты последнего исполнения этих песен
⋅⋅⋅Бэк: удаляется лист, меняется дата песен
⋅⋅⋅Фронт: при успехе приходит объект: { [ID песни]: дата исполнения }. Удаляем лист и меняем дату у песен из полученного списка
8. Добавление авторов
9. Получение списка авторов
10. Добавление жанров
11. Получение списка жанров 