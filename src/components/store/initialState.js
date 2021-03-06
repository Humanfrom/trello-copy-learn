const initialState = {
  boards: [
    {
      "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
      "title": "Дела",
      "lists": [{
        "id": "7775d1f0-a8c6-41bf-8d99-df5734d81029",
        "title": "На сегодня",
        "tasks": [{"id": "0001", "checked": false, "text": "Сходить за хлебом"},
                  {"id": "0002", "checked": false, "text": "Почитать книгу"},
                  {"id": "0003", "checked": true, "text": "Выпить чай"}]
      },{
        "id": "0195d1f0-0011-3322-7788-df5734445999",
        "title": "На завтра",
        "tasks": [{"id": "0004","checked": false, "text": "Почесать кошку"},
                  {"id": "0005","checked": false, "text": "Написать стих"},
                  {"id": "0006","checked": false, "text": "Поймать рыбу"}]
      }]
    },
    {
      "id": "0235d1f0-a8c6-41bf-8d02-123555xxxqqq",
      "title": "Прочее",
      "lists": [{
        "id": "0133d1f0-a8c6-41bf-8d99-df5734d81555",
        "title": "Покупки",
        "tasks": [{"id": "0007","checked": false, "text": "Купить новый торшер"},
                  {"id": "0008","checked": false, "text": "Купить хлеба"},
                  {"id": "0009","checked": true, "text": "Что-нибудь к чаю"}]
      },{
        "id": "0144d1f0-0011-3322-7788-df5734445666",
        "title": "Кулинария",
        "tasks": [{"id": "0010","checked": false, "text": "Приготовить рыбу в кляре"},
                  {"id": "0011","checked": false, "text": "Сделать салат из овощей"},
                  {"id": "0012","checked": false, "text": "Пожарить картошку"}]
      }]
    }
  ]
}

export default initialState;
