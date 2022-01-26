# simpleapi
simple nodejs API
lfnn.site/API/products

start: "nodemon index.js"

GET queries: 
id
page&count&filter&type
page&count&filter
page&count&type
page&count&name
page&count

В зависимости от count query сервер фильтрует данные по условным страницам, возвращая общее количество страниц с count айтемов на странице в totalPages
page query обязателен к count query, влияет на номер условной страницы, которую должен веннуть сервер в [entities]

ответ в формате [[entities], totalPages]
